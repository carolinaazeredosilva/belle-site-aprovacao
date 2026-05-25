import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type LeadPayload = {
  fullName: string;
  email: string;
  city: string;
  state?: string;
  country: string;
  phone: string;
  professionalsRange: string;
  lang: "pt" | "en" | "es";
  sourcePath: string;
  sourceQuery?: string;
};

async function sendLeadNotificationEmail(lead: LeadPayload) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const toEmailRaw = Deno.env.get("LEAD_NOTIFICATION_TO") ?? "vendas@geinfo.com.br";
  const toEmails = toEmailRaw
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const fromEmail = Deno.env.get("LEAD_NOTIFICATION_FROM") ?? "Belle Leads <onboarding@resend.dev>";

  if (!resendApiKey) {
    return { ok: false, code: "EMAIL_CONFIG_MISSING", details: "Missing RESEND_API_KEY" as string | null };
  }

  if (toEmails.length === 0) {
    return { ok: false, code: "EMAIL_CONFIG_MISSING", details: "Missing LEAD_NOTIFICATION_TO" as string | null };
  }

  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const langLabel = lead.lang === "pt" ? "Português" : lead.lang === "es" ? "Español" : "English";
  const subject = `Novo lead: ${lead.fullName} (${langLabel})`;

  const html = `
    <h2>Novo lead recebido pelo formulário</h2>
    <p><strong>Nome:</strong> ${escapeHtml(lead.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>País:</strong> ${escapeHtml(lead.country)}</p>
    <p><strong>Estado:</strong> ${escapeHtml(lead.state || "-")}</p>
    <p><strong>Cidade:</strong> ${escapeHtml(lead.city)}</p>
    <p><strong>Faixa de profissionais:</strong> ${escapeHtml(lead.professionalsRange)}</p>
    <p><strong>Idioma:</strong> ${langLabel}</p>
    <p><strong>Origem:</strong> ${escapeHtml(lead.sourcePath || "Não informado")}</p>
    ${lead.sourceQuery ? `<p><strong>Parâmetros da origem:</strong> ${escapeHtml(lead.sourceQuery)}</p>` : ""}
  `;

  const text = [
    "Novo lead recebido pelo formulário",
    `Nome: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Telefone: ${lead.phone}`,
    `País: ${lead.country}`,
    `Estado: ${lead.state || "-"}`,
    `Cidade: ${lead.city}`,
    `Faixa de profissionais: ${lead.professionalsRange}`,
    `Idioma: ${langLabel}`,
    `Origem: ${lead.sourcePath || "Não informado"}`,
    ...(lead.sourceQuery ? [`Parâmetros da origem: ${lead.sourceQuery}`] : []),
  ].join("\n");

  const failures: Array<{ email: string; error: string }> = [];
  let successCount = 0;

  for (const recipient of toEmails) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      failures.push({ email: recipient, error: errorText });
      continue;
    }

    successCount += 1;
  }

  if (successCount === 0) {
    console.error("Failed to send lead notification email to all recipients:", failures);
    return { ok: false, code: "EMAIL_DELIVERY_FAILED", details: JSON.stringify(failures) };
  }

  if (failures.length > 0) {
    console.warn("Lead email sent partially. Failed recipients:", failures);
    return { ok: false, code: "EMAIL_PARTIAL_DELIVERY", details: JSON.stringify(failures) };
  }

  return { ok: true, code: "EMAIL_SENT", details: null as string | null };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body: LeadPayload = await req.json();
    const required = ["fullName", "email", "city", "country", "phone", "professionalsRange", "lang", "sourcePath"];

    for (const key of required) {
      if (!body[key as keyof LeadPayload]) {
        return Response.json(
          { ok: false, code: "VALIDATION_ERROR", fieldErrors: { [key]: "required" } },
          { status: 400, headers: corsHeaders },
        );
      }
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data, error } = await supabase
      .from("pricing_leads")
      .insert({
        full_name: body.fullName,
        email: body.email,
        city: body.city,
        country: body.country,
        phone: body.phone,
        professionals_range: body.professionalsRange,
        lang: body.lang,
        source_path: body.sourcePath,
        source_query: body.sourceQuery,
        user_agent: req.headers.get("user-agent"),
      })
      .select("id")
      .single();

    if (error) {
      return Response.json({ ok: false, code: "INTERNAL_ERROR" }, { status: 500, headers: corsHeaders });
    }

    const emailStatus = await sendLeadNotificationEmail(body);

    if (!emailStatus.ok) {
      console.error("Lead saved, but email delivery failed", {
        leadId: data.id,
        emailStatus,
      });

      return Response.json(
        {
          ok: false,
          code: "EMAIL_DELIVERY_FAILED",
          leadId: data.id,
          emailStatus,
        },
        { status: 502, headers: corsHeaders },
      );
    }

    return Response.json({ ok: true, leadId: data.id, emailStatus }, { headers: corsHeaders });
  } catch {
    return Response.json({ ok: false, code: "INTERNAL_ERROR" }, { status: 500, headers: corsHeaders });
  }
});
