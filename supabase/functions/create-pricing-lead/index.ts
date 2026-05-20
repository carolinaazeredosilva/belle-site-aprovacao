import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json();
    const required = ["fullName", "email", "city", "state", "country", "phone", "professionalsRange", "lang", "sourcePath", "sourceQuery"];
    for (const key of required) if (!body[key]) return Response.json({ ok: false, code: "VALIDATION_ERROR", fieldErrors: { [key]: "required" } }, { status: 400, headers: corsHeaders });
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data, error } = await supabase.from("pricing_leads").insert({
      full_name: body.fullName, email: body.email, city: body.city, state: body.state, country: body.country, phone: body.phone,
      professionals_range: body.professionalsRange, lang: body.lang, source_path: body.sourcePath, source_query: body.sourceQuery,
      user_agent: req.headers.get("user-agent")
    }).select("id").single();
    if (error) return Response.json({ ok: false, code: "INTERNAL_ERROR" }, { status: 500, headers: corsHeaders });
    return Response.json({ ok: true, leadId: data.id }, { headers: corsHeaders });
  } catch {
    return Response.json({ ok: false, code: "INTERNAL_ERROR" }, { status: 500, headers: corsHeaders });
  }
});
