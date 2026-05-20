import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WHATSAPP_URL } from "../lib/content";
import { getSupabaseClient } from "../lib/supabase";

type TestePageLanguage = "pt" | "en" | "es";

type Copy = {
  title: string;
  subtitle: string;
  backToSite: string;
  formTitle: string;
  success: string;
  talkNow: string;
  labels: {
    fullName: string;
    phone: string;
    professionalsRange: string;
    country: string;
    state: string;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: string;
    termsLink: string;
    button: string;
    required: string;
    invalidEmail: string;
    passwordMin: string;
    passwordMismatch: string;
    select: string;
  };
  options: string[];
  cards: Array<{ title: string; text: string }>;
  sideTitle: string;
  sideItems: Array<{ title: string; text: string }>;
  sideMore: string;
  sideFinal: string;
};

const copyByLang: Record<TestePageLanguage, Copy> = {
  pt: {
    title: "Otimize o gerenciamento da sua clínica",
    subtitle: "Experimente gratuitamente os recursos que o melhor sistema para clínicas de estética pode oferecer.",
    backToSite: "Voltar para o site",
    formTitle: "Experimente o Belle Software gratuitamente!",
    success: "Obrigado! Seus dados foram enviados com sucesso.",
    talkNow: "Prefere falar agora? Chame no WhatsApp",
    labels: {
      fullName: "Nome",
      phone: "Celular",
      professionalsRange: "Quantos profissionais atendem na sua clínica?",
      country: "País",
      state: "Estado",
      city: "Cidade",
      email: "E-mail",
      password: "Crie uma senha",
      confirmPassword: "Confirme a sua senha",
      terms: "Li e aceito os",
      termsLink: "Termos e Condições",
      button: "Começar o meu teste gratuito",
      required: "Campo obrigatório",
      invalidEmail: "E-mail inválido",
      passwordMin: "A senha deve ter ao menos 8 caracteres",
      passwordMismatch: "As senhas digitadas não correspondem.",
      select: "Selecione",
    },
    options: ["1 pessoa (apenas eu)", "2 pessoas", "3 a 4 pessoas", "5 a 8 pessoas", "9 a 11 pessoas", "12 a 15 pessoas", "Mais de 15 pessoas"],
    cards: [
      { title: "14 dias de acesso grátis", text: "Use o sistema sem compromisso e conte com nosso time durante o período de testes." },
      { title: "Sem instalação", text: "Acesse de qualquer lugar, inclusive pelo celular, sem precisar instalar nada." },
      { title: "Sem cartão de crédito", text: "Você não precisa cadastrar cartão para testar o Belle Software." },
    ],
    sideTitle: "Gerenciar sua clínica fica mais fácil com o Belle Software",
    sideItems: [
      { title: "Soluções sob medida para sua clínica", text: "Gerencie agendamentos, controle estoque e fidelize clientes com facilidade." },
      { title: "Eficiência e qualidade em um só lugar", text: "Reduza o tempo gasto em tarefas administrativas e foque nos seus clientes." },
      { title: "Aumente sua receita com o Belle Software", text: "Identifique oportunidades de crescimento e aumente a satisfação dos seus clientes." },
      { title: "Automatização total", text: "Menos tempo com papelada, mais tempo com seus clientes." },
      { title: "Integração fácil e suporte especializado", text: "Implementação rápida e suporte dedicado para garantir seu sucesso." },
    ],
    sideMore: "E muito mais!",
    sideFinal: "Transforme sua gestão com o melhor sistema para clínicas de estética!",
  },
  en: {
    title: "Optimize your clinic management",
    subtitle: "Try for free the features that the best software for aesthetic clinics can offer.",
    backToSite: "Back to website",
    formTitle: "Try Belle Software for free!",
    success: "Thank you! Your information has been sent successfully.",
    talkNow: "Prefer to talk now? Message us on WhatsApp",
    labels: {
      fullName: "Name",
      phone: "Cell phone",
      professionalsRange: "How many professionals work at your clinic?",
      country: "Country",
      state: "State",
      city: "City",
      email: "Email",
      password: "Create a password",
      confirmPassword: "Confirm your password",
      terms: "I have read and accept the",
      termsLink: "Terms and Conditions",
      button: "Start my free trial",
      required: "Required field",
      invalidEmail: "Invalid email",
      passwordMin: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match.",
      select: "Select",
    },
    options: ["1 professional", "2 professionals", "3 to 4 professionals", "5 to 8 professionals", "9 to 11 professionals", "12 to 15 professionals", "More than 15 professionals"],
    cards: [
      { title: "14 days of free access", text: "Use the system with no commitment and get support from our team during your trial period." },
      { title: "No installation required", text: "Access from anywhere, including mobile, with no installation needed." },
      { title: "No credit card required", text: "You do not need to provide a credit card to try Belle Software." },
    ],
    sideTitle: "Managing your clinic is easier with Belle Software",
    sideItems: [
      { title: "Tailored solutions for your clinic", text: "Manage appointments, inventory, and customer loyalty with ease." },
      { title: "Efficiency and quality in one place", text: "Reduce administrative workload and focus on your clients." },
      { title: "Increase your revenue with Belle Software", text: "Identify growth opportunities and improve customer satisfaction." },
      { title: "Full automation", text: "Less paperwork, more time with your clients." },
      { title: "Easy integration and expert support", text: "Fast implementation and dedicated support to ensure your success." },
    ],
    sideMore: "And much more!",
    sideFinal: "Transform your management with the best software for aesthetic clinics!",
  },
  es: {
    title: "Optimiza la gestión de tu clínica",
    subtitle: "Prueba gratis los recursos que el mejor sistema para clínicas estéticas puede ofrecer.",
    backToSite: "Volver al sitio",
    formTitle: "¡Prueba Belle Software gratis!",
    success: "¡Gracias! Tus datos fueron enviados correctamente.",
    talkNow: "¿Prefieres hablar ahora? Escríbenos por WhatsApp",
    labels: {
      fullName: "Nombre",
      phone: "Celular",
      professionalsRange: "¿Cuántos profesionales trabajan en tu clínica?",
      country: "País",
      state: "Estado",
      city: "Ciudad",
      email: "Correo electrónico",
      password: "Crea una contraseña",
      confirmPassword: "Confirma tu contraseña",
      terms: "He leído y acepto los",
      termsLink: "Términos y Condiciones",
      button: "Comenzar mi prueba gratis",
      required: "Campo obligatorio",
      invalidEmail: "Correo electrónico inválido",
      passwordMin: "La contraseña debe tener al menos 8 caracteres",
      passwordMismatch: "Las contraseñas no coinciden.",
      select: "Selecciona",
    },
    options: ["1 profesional", "2 profesionales", "3 a 4 profesionales", "5 a 8 profesionales", "9 a 11 profesionales", "12 a 15 profesionales", "Más de 15 profesionales"],
    cards: [
      { title: "14 días de acceso gratis", text: "Usa el sistema sin compromiso y con el apoyo de nuestro equipo durante el período de prueba." },
      { title: "Sin instalación", text: "Accede desde cualquier lugar, incluso desde el celular, sin instalar nada." },
      { title: "Sin tarjeta de crédito", text: "No necesitas registrar una tarjeta para probar Belle Software." },
    ],
    sideTitle: "Gestionar tu clínica es más fácil con Belle Software",
    sideItems: [
      { title: "Soluciones a medida para tu clínica", text: "Gestiona citas, controla inventario y fideliza clientes con facilidad." },
      { title: "Eficiencia y calidad en un solo lugar", text: "Reduce el tiempo en tareas administrativas y enfócate en tus clientes." },
      { title: "Aumenta tus ingresos con Belle Software", text: "Identifica oportunidades de crecimiento y mejora la satisfacción de tus clientes." },
      { title: "Automatización total", text: "Menos tiempo en papeleo, más tiempo con tus clientes." },
      { title: "Integración fácil y soporte especializado", text: "Implementación rápida y soporte dedicado para garantizar tu éxito." },
    ],
    sideMore: "¡Y mucho más!",
    sideFinal: "¡Transforma tu gestión con el mejor sistema para clínicas estéticas!",
  },
};

const termsPathByLang: Record<TestePageLanguage, string> = {
  pt: "/termos-e-condicoes",
  en: "/terms-and-conditions",
  es: "/terminos-y-condiciones",
};

function schema(labels: Copy["labels"]) {
  return z
    .object({
      fullName: z.string().min(2, labels.required),
      phone: z.string().min(8, labels.required),
      professionalsRange: z.string().min(1, labels.required),
      country: z.string().min(2, labels.required),
      state: z.string().min(2, labels.required),
      city: z.string().min(2, labels.required),
      email: z.string().email(labels.invalidEmail),
      password: z.string().min(8, labels.passwordMin),
      confirmPassword: z.string().min(8, labels.passwordMin),
      termsAccepted: z.boolean().refine((value) => value, labels.required),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: labels.passwordMismatch,
      path: ["confirmPassword"],
    });
}

type FormValues = {
  fullName: string;
  phone: string;
  professionalsRange: string;
  country: string;
  state: string;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export function TestePage({ lang = "pt" }: { lang?: TestePageLanguage }) {
  const copy = copyByLang[lang];
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formSchema = useMemo(() => schema(copy.labels), [copy.labels]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { termsAccepted: false },
  });

  const homePath = lang === "en" ? "/en" : lang === "es" ? "/es" : "/";

  const onSubmit = async (values: FormValues) => {
    setSubmitError("");
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.functions.invoke("create-pricing-lead", {
        body: {
          fullName: values.fullName,
          email: values.email,
          city: values.city,
          state: values.state,
          country: values.country,
          phone: values.phone,
          professionalsRange: values.professionalsRange,
          lang,
          sourcePath: lang === "pt" ? "/form/pt" : `/form/${lang}`,
          sourceQuery: window.location.search,
        },
      });

      if (error) {
        setSubmitError("Não foi possível enviar agora. Tente novamente.");
        return;
      }

      setSent(true);
    } catch {
      setSubmitError("Não foi possível enviar agora. Tente novamente.");
    }
  };

  return (
    <main className="min-h-screen bg-[#e8edf6]">
      <section className="bg-gradient-to-r from-[#fff8fd] via-[#ffeff9] to-[#FFE7F8]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-2 md:px-8">
          <div>
            <a href={homePath}>
              <img
                src="/logo-belle.png"
                alt="Belle Software"
                className="h-[56px] w-auto"
              />
            </a>
            <h1 className="mt-5 text-4xl font-bold text-[#243f67]">{copy.title}</h1>
            <p className="mt-3 text-xl text-[#334f73]">{copy.subtitle}</p>
            <a
              href={homePath}
              className="mt-5 inline-flex rounded-full bg-gradient-to-b from-[#A11176] to-[#F2295B] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-300 transition hover:scale-105"
            >
              {copy.backToSite}
            </a>
          </div>
          <div className="flex items-end justify-center md:justify-end">
            <img
              src="https://www.bellesoftware.com.br/wp-content/uploads/2026/04/Sistema-para-clinicas-de-estetica.gif"
              alt="Sistema Belle Software"
              className="max-h-[320px] w-auto"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-2 max-w-6xl px-4 pb-10 md:px-8">
        <div className="rounded-xl bg-white p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {copy.cards.map((card) => (
              <article key={card.title} className="text-center">
                <h2 className="text-2xl font-bold text-[#A11176]">{card.title}</h2>
                <p className="mt-3 text-lg text-[#4b5563]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 md:grid-cols-2 md:px-8">
        <div className="rounded-xl bg-white p-6 shadow-md">
          {sent ? (
            <div>
              <p className="text-lg font-semibold text-[#111827]">{copy.success}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-[#a11176]">
                {copy.talkNow}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <h3 className="text-3xl font-bold text-[#111827]">{copy.formTitle}</h3>

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.fullName}</label>
              <input {...register("fullName")} placeholder={copy.labels.fullName} className="w-full rounded border p-2" />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.phone}</label>
              <input {...register("phone")} placeholder={copy.labels.phone} className="w-full rounded border p-2" />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.professionalsRange}</label>
              <select {...register("professionalsRange")} className="w-full rounded border p-2">
                <option value="">{copy.labels.select}</option>
                {copy.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.professionalsRange && <p className="text-sm text-red-600">{errors.professionalsRange.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.country}</label>
              <input {...register("country")} placeholder={copy.labels.country} className="w-full rounded border p-2" />
              {errors.country && <p className="text-sm text-red-600">{errors.country.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.state}</label>
              <input {...register("state")} placeholder={copy.labels.state} className="w-full rounded border p-2" />
              {errors.state && <p className="text-sm text-red-600">{errors.state.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.city}</label>
              <input {...register("city")} placeholder={copy.labels.city} className="w-full rounded border p-2" />
              {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.email}</label>
              <input {...register("email")} placeholder={copy.labels.email} className="w-full rounded border p-2" />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.password}</label>
              <input type="password" {...register("password")} placeholder={copy.labels.password} className="w-full rounded border p-2" />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.confirmPassword}</label>
              <input type="password" {...register("confirmPassword")} placeholder={copy.labels.confirmPassword} className="w-full rounded border p-2" />
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}

              <label className="flex items-center gap-2 text-sm text-[#374151]">
                <input type="checkbox" {...register("termsAccepted")} />
                <span>
                  {copy.labels.terms}{" "}
                  <a href={termsPathByLang[lang]} className="font-semibold text-[#a11176]">
                    {copy.labels.termsLink}
                  </a>
                </span>
              </label>
              {errors.termsAccepted && <p className="text-sm text-red-600">{errors.termsAccepted.message}</p>}

              {submitError && <p className="text-sm text-red-600">{submitError}</p>}

              <button disabled={isSubmitting} className="rounded-full bg-[#a11176] px-6 py-3 font-semibold text-white">
                {copy.labels.button}
              </button>
            </form>
          )}
        </div>

        <div className="p-3 text-[#1f2937]">
          <section className="m-3">
            <h3 className="text-2xl font-bold">{copy.sideTitle}</h3>
            <div className="mt-4">
              {copy.sideItems.map((item) => (
                <article key={item.title} className="mb-4 flex rounded-[10px]">
                  <div className="mr-4 flex items-center justify-center text-2xl font-bold">
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#f1ffeb] text-[#287338]">
                      <span className="text-base leading-none">✓</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="m-0 text-[16px] font-medium leading-[1.2]">{item.title}</h4>
                    <p className="mt-2 text-[15px] leading-6 text-[#666]">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <h4 className="text-[16px] font-medium">{copy.sideMore}</h4>
            <h4 className="mt-2 text-[16px] font-medium">{copy.sideFinal}</h4>
          </section>
        </div>
      </section>
    </main>
  );
}
