import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
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
    phoneCode: string;
    professionalsRange: string;
    country: string;
    state: string;
    city: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: string;
    hidePassword: string;
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
  countries: string[];
};

const statesByCountry: Record<string, string[]> = {
  Brasil: [
    "Acre (AC)",
    "Alagoas (AL)",
    "Amapá (AP)",
    "Amazonas (AM)",
    "Bahia (BA)",
    "Ceará (CE)",
    "Distrito Federal (DF)",
    "Espírito Santo (ES)",
    "Goiás (GO)",
    "Maranhão (MA)",
    "Mato Grosso (MT)",
    "Mato Grosso do Sul (MS)",
    "Minas Gerais (MG)",
    "Pará (PA)",
    "Paraíba (PB)",
    "Paraná (PR)",
    "Pernambuco (PE)",
    "Piauí (PI)",
    "Rio de Janeiro (RJ)",
    "Rio Grande do Norte (RN)",
    "Rio Grande do Sul (RS)",
    "Rondônia (RO)",
    "Roraima (RR)",
    "Santa Catarina (SC)",
    "São Paulo (SP)",
    "Sergipe (SE)",
    "Tocantins (TO)",
  ],
  Brazil: [
    "Acre (AC)",
    "Alagoas (AL)",
    "Amapá (AP)",
    "Amazonas (AM)",
    "Bahia (BA)",
    "Ceará (CE)",
    "Distrito Federal (DF)",
    "Espírito Santo (ES)",
    "Goiás (GO)",
    "Maranhão (MA)",
    "Mato Grosso (MT)",
    "Mato Grosso do Sul (MS)",
    "Minas Gerais (MG)",
    "Pará (PA)",
    "Paraíba (PB)",
    "Paraná (PR)",
    "Pernambuco (PE)",
    "Piauí (PI)",
    "Rio de Janeiro (RJ)",
    "Rio Grande do Norte (RN)",
    "Rio Grande do Sul (RS)",
    "Rondônia (RO)",
    "Roraima (RR)",
    "Santa Catarina (SC)",
    "São Paulo (SP)",
    "Sergipe (SE)",
    "Tocantins (TO)",
  ],
  "Estados Unidos": [
    "California",
    "Florida",
    "New York",
    "Texas",
    "Washington",
  ],
  "United States": [
    "California",
    "Florida",
    "New York",
    "Texas",
    "Washington",
  ],
  México: ["Ciudad de México", "Jalisco", "Nuevo León", "Puebla", "Yucatán"],
  Mexico: ["Ciudad de México", "Jalisco", "Nuevo León", "Puebla", "Yucatán"],
  Argentina: ["Buenos Aires", "Córdoba", "Mendoza", "Santa Fe", "Tucumán"],
  Chile: ["Antofagasta", "Biobío", "Metropolitana", "Valparaíso", "Los Lagos"],
  Colômbia: ["Antioquia", "Bogotá D.C.", "Cundinamarca", "Santander", "Valle del Cauca"],
  Colombia: ["Antioquia", "Bogotá D.C.", "Cundinamarca", "Santander", "Valle del Cauca"],
  Espanha: ["Andalucía", "Cataluña", "Comunidad de Madrid", "Galicia", "Valencia"],
  Spain: ["Andalucía", "Cataluña", "Comunidad de Madrid", "Galicia", "Valencia"],
  Portugal: ["Aveiro", "Braga", "Coimbra", "Lisboa", "Porto"],
  Canadá: ["Alberta", "British Columbia", "Ontario", "Quebec", "Manitoba"],
  Canada: ["Alberta", "British Columbia", "Ontario", "Quebec", "Manitoba"],
};

const citiesByState: Record<string, string[]> = {
  "Acre (AC)": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
  "Alagoas (AL)": ["Maceió", "Arapiraca", "Palmeira dos Índios"],
  "Amapá (AP)": ["Macapá", "Santana", "Laranjal do Jari"],
  "Amazonas (AM)": ["Manaus", "Parintins", "Itacoatiara"],
  "Bahia (BA)": ["Salvador", "Feira de Santana", "Vitória da Conquista"],
  "Ceará (CE)": ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
  "Distrito Federal (DF)": ["Brasília", "Taguatinga", "Ceilândia"],
  "Espírito Santo (ES)": ["Vitória", "Vila Velha", "Serra"],
  "Goiás (GO)": ["Goiânia", "Aparecida de Goiânia", "Anápolis"],
  "Maranhão (MA)": ["São Luís", "Imperatriz", "Caxias"],
  "Mato Grosso (MT)": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
  "Mato Grosso do Sul (MS)": ["Campo Grande", "Dourados", "Três Lagoas"],
  "Minas Gerais (MG)": ["Belo Horizonte", "Uberlândia", "Contagem"],
  "Pará (PA)": ["Belém", "Ananindeua", "Santarém"],
  "Paraíba (PB)": ["João Pessoa", "Campina Grande", "Santa Rita"],
  "Paraná (PR)": ["Curitiba", "Londrina", "Maringá"],
  "Pernambuco (PE)": ["Recife", "Jaboatão dos Guararapes", "Olinda"],
  "Piauí (PI)": ["Teresina", "Parnaíba", "Picos"],
  "Rio de Janeiro (RJ)": ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
  "Rio Grande do Norte (RN)": ["Natal", "Mossoró", "Parnamirim"],
  "Rio Grande do Sul (RS)": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
  "Rondônia (RO)": ["Porto Velho", "Ji-Paraná", "Ariquemes"],
  "Roraima (RR)": ["Boa Vista", "Rorainópolis", "Caracaraí"],
  "Santa Catarina (SC)": ["Florianópolis", "Joinville", "Blumenau"],
  "São Paulo (SP)": ["São Paulo", "Campinas", "Santos"],
  "Sergipe (SE)": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
  "Tocantins (TO)": ["Palmas", "Araguaína", "Gurupi"],
};

const countryApiNameMap: Record<string, string> = {
  "Estados Unidos": "United States",
  "España": "Spain",
  "México": "Mexico",
  "Canadá": "Canada",
  "Japón": "Japan",
  "Perú": "Peru",
  "Reino Unido": "United Kingdom",
  "Espanha": "Spain",
  "Alemanha": "Germany",
  "França": "France",
  "Itália": "Italy",
  "Japão": "Japan",
  "Colômbia": "Colombia",
  "Peru": "Peru",
  "Paraguai": "Paraguay",
  "Uruguai": "Uruguay",
  "Brasil": "Brazil",
};

const phoneFlagByCode: Record<string, string> = {
  "+55": "https://flagcdn.com/w20/br.png",
  "+1": "https://flagcdn.com/w20/us.png",
  "+34": "https://flagcdn.com/w20/es.png",
  "+52": "https://flagcdn.com/w20/mx.png",
  "+54": "https://flagcdn.com/w20/ar.png",
  "+56": "https://flagcdn.com/w20/cl.png",
  "+57": "https://flagcdn.com/w20/co.png",
  "+351": "https://flagcdn.com/w20/pt.png",
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
      phoneCode: "DDI",
      professionalsRange: "Quantos profissionais atendem na sua clínica?",
      country: "País",
      state: "Estado",
      city: "Cidade",
      email: "E-mail",
      password: "Crie uma senha",
      confirmPassword: "Confirme a sua senha",
      showPassword: "Mostrar senha",
      hidePassword: "Ocultar senha",
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
    countries: [
      "Brasil",
      "Argentina",
      "Chile",
      "Colômbia",
      "México",
      "Paraguai",
      "Peru",
      "Portugal",
      "Uruguai",
      "Estados Unidos",
      "Canadá",
      "Espanha",
      "França",
      "Itália",
      "Alemanha",
      "Reino Unido",
      "Japão",
      "China",
      "Austrália",
    ],
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
      phoneCode: "Code",
      professionalsRange: "How many professionals work at your clinic?",
      country: "Country",
      state: "State",
      city: "City",
      email: "Email",
      password: "Create a password",
      confirmPassword: "Confirm your password",
      showPassword: "Show password",
      hidePassword: "Hide password",
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
    countries: [
      "Brazil",
      "Argentina",
      "Chile",
      "Colombia",
      "Mexico",
      "Paraguay",
      "Peru",
      "Portugal",
      "Uruguay",
      "United States",
      "Canada",
      "Spain",
      "France",
      "Italy",
      "Germany",
      "United Kingdom",
      "Japan",
      "China",
      "Australia",
    ],
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
      phoneCode: "Código",
      professionalsRange: "¿Cuántos profesionales trabajan en tu clínica?",
      country: "País",
      state: "Estado",
      city: "Ciudad",
      email: "Correo electrónico",
      password: "Crea una contraseña",
      confirmPassword: "Confirma tu contraseña",
      showPassword: "Mostrar contraseña",
      hidePassword: "Ocultar contraseña",
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
    countries: [
      "Brasil",
      "Argentina",
      "Chile",
      "Colombia",
      "México",
      "Paraguay",
      "Perú",
      "Portugal",
      "Uruguay",
      "Estados Unidos",
      "Canadá",
      "España",
      "Francia",
      "Italia",
      "Alemania",
      "Reino Unido",
      "Japón",
      "China",
      "Australia",
    ],
  },
};

const termsPathByLang: Record<TestePageLanguage, string> = {
  pt: "/termos-e-condicoes",
  en: "/terms-and-conditions",
  es: "/terminos-y-condiciones",
};

const sourceLabelByLang: Record<TestePageLanguage, string> = {
  pt: "Site em português",
  en: "Site em inglês",
  es: "Site em espanhol",
};

function schema(lang: TestePageLanguage, labels: Copy["labels"]) {
  const stateRule = lang === "pt" ? z.string().min(2, labels.required) : z.string().optional().default("");

  return z
    .object({
      fullName: z.string().min(2, labels.required),
      phoneCode: z.string().min(1, labels.required),
      phone: z.string().min(8, labels.required),
      professionalsRange: z.string().min(1, labels.required),
      country: z.string().min(2, labels.required),
      state: stateRule,
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
  phoneCode: string;
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formSchema = useMemo(() => schema(lang, copy.labels), [copy.labels, lang]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { termsAccepted: false, phoneCode: "+55" },
  });
  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const selectedPhoneCode = watch("phoneCode");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const previousCountryRef = useRef<string>("");
  const previousStateRef = useRef<string>("");
  const stateOptions = statesByCountry[selectedCountry] ?? [];

  useEffect(() => {
    const previousCountry = previousCountryRef.current;
    if (previousCountry && previousCountry !== selectedCountry) {
      setValue("state", "");
      setValue("city", "");
      setCityOptions([]);
    }
    previousCountryRef.current = selectedCountry || "";
  }, [selectedCountry, setValue]);

  useEffect(() => {
    const previousState = previousStateRef.current;
    if (previousState && previousState !== selectedState) {
      setValue("city", "");
    }
    previousStateRef.current = selectedState || "";
  }, [selectedState, setValue]);

  useEffect(() => {
    let active = true;

    const loadCities = async () => {
      const fallbackCities = citiesByState[selectedState] ?? [];
      const ufMatch = selectedState?.match(/\(([A-Z]{2})\)/);
      const uf = ufMatch?.[1];

      if (!uf) {
        setCityOptions(fallbackCities);
        return;
      }

      try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        if (!response.ok) {
          setCityOptions(fallbackCities);
          return;
        }

        const data: Array<{ nome: string }> = await response.json();
        const cities = data.map((item) => item.nome).sort((a, b) => a.localeCompare(b, "pt-BR"));
        if (active) setCityOptions(cities);
      } catch {
        if (active) setCityOptions(fallbackCities);
      }
    };

    void loadCities();
    return () => {
      active = false;
    };
  }, [selectedState]);

  useEffect(() => {
    let active = true;

    const loadCitiesByCountry = async () => {
      if (lang === "pt" || !selectedCountry) return;

      try {
        const apiCountryName = countryApiNameMap[selectedCountry] ?? selectedCountry;
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: apiCountryName }),
        });

        if (!response.ok) return;
        const data: { data?: string[] } = await response.json();
        const cities = (data.data ?? []).sort((a, b) => a.localeCompare(b));
        if (active && cities.length > 0) setCityOptions(cities);
      } catch {
        // Keep current fallback behavior
      }
    };

    void loadCitiesByCountry();
    return () => {
      active = false;
    };
  }, [lang, selectedCountry]);

  const homePath = lang === "en" ? "/en" : lang === "es" ? "/es" : "/";
  const fieldClass =
    "w-full rounded-xl border border-[#d8dce6] bg-white px-3 py-2.5 text-[15px] text-[#1f2937] outline-none transition focus:border-[#A11176] focus:ring-2 focus:ring-[#f4c3e4]";

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
          phone: `${values.phoneCode} ${values.phone}`.trim(),
          professionalsRange: values.professionalsRange,
          lang,
          sourcePath: sourceLabelByLang[lang],
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
              <input {...register("fullName")} placeholder={copy.labels.fullName} className={fieldClass} />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.phone}</label>
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <div className="relative">
                  <div className="pointer-events-none absolute left-2 top-1/2 z-10 -translate-y-1/2">
                    <img
                      src={phoneFlagByCode[selectedPhoneCode] ?? phoneFlagByCode["+55"]}
                      alt="Bandeira do código"
                      className="h-4 w-6 rounded-[2px] object-cover"
                    />
                  </div>
                  <select {...register("phoneCode")} className={`${fieldClass} appearance-none pl-10 pr-8`}>
                    <option value="+55">+55 BR</option>
                    <option value="+1">+1 US/CA</option>
                    <option value="+34">+34 ES</option>
                    <option value="+52">+52 MX</option>
                    <option value="+54">+54 AR</option>
                    <option value="+56">+56 CL</option>
                    <option value="+57">+57 CO</option>
                    <option value="+351">+351 PT</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#7a4965]"
                  />
                </div>
                <input {...register("phone")} placeholder={copy.labels.phone} className={fieldClass} />
              </div>
              {errors.phoneCode && <p className="text-sm text-red-600">{errors.phoneCode.message}</p>}
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.professionalsRange}</label>
              <div className="relative">
                <select
                  {...register("professionalsRange")}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  <option value="">{copy.labels.select}</option>
                  {copy.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a4965]"
                />
              </div>
              {errors.professionalsRange && <p className="text-sm text-red-600">{errors.professionalsRange.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.country}</label>
              <div className="relative">
                <select
                  {...register("country")}
                  className={`${fieldClass} appearance-none pr-10`}
                >
                  <option value="">{copy.labels.select}</option>
                  {copy.countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a4965]"
                />
              </div>
              {errors.country && <p className="text-sm text-red-600">{errors.country.message}</p>}

              {lang === "pt" && (
                <>
                  <label className="block text-sm font-medium text-[#111827]">{copy.labels.state}</label>
                  <div className="relative">
                    <select
                      {...register("state")}
                      className={`${fieldClass} appearance-none pr-10`}
                    >
                      <option value="">{copy.labels.select}</option>
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a4965]"
                    />
                  </div>
                  {errors.state && <p className="text-sm text-red-600">{errors.state.message}</p>}
                </>
              )}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.city}</label>
              {cityOptions.length > 0 ? (
                <div className="relative">
                  <select
                    {...register("city")}
                    className={`${fieldClass} appearance-none pr-10`}
                  >
                    <option value="">{copy.labels.select}</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a4965]"
                  />
                </div>
              ) : (
                <input
                  {...register("city")}
                  placeholder={copy.labels.city}
                  className={fieldClass}
                />
              )}
              {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.email}</label>
              <input {...register("email")} placeholder={copy.labels.email} className={fieldClass} />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.password}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder={copy.labels.password}
                  className={`${fieldClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? copy.labels.hidePassword : copy.labels.showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#111827]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

              <label className="block text-sm font-medium text-[#111827]">{copy.labels.confirmPassword}</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder={copy.labels.confirmPassword}
                  className={`${fieldClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  aria-label={showConfirmPassword ? copy.labels.hidePassword : copy.labels.showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#111827]"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
