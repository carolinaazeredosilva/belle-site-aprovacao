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
    "AmapÃ¡ (AP)",
    "Amazonas (AM)",
    "Bahia (BA)",
    "CearÃ¡ (CE)",
    "Distrito Federal (DF)",
    "EspÃ­rito Santo (ES)",
    "GoiÃ¡s (GO)",
    "MaranhÃ£o (MA)",
    "Mato Grosso (MT)",
    "Mato Grosso do Sul (MS)",
    "Minas Gerais (MG)",
    "ParÃ¡ (PA)",
    "ParaÃ­ba (PB)",
    "ParanÃ¡ (PR)",
    "Pernambuco (PE)",
    "PiauÃ­ (PI)",
    "Rio de Janeiro (RJ)",
    "Rio Grande do Norte (RN)",
    "Rio Grande do Sul (RS)",
    "RondÃ´nia (RO)",
    "Roraima (RR)",
    "Santa Catarina (SC)",
    "SÃ£o Paulo (SP)",
    "Sergipe (SE)",
    "Tocantins (TO)",
  ],
  Brazil: [
    "Acre (AC)",
    "Alagoas (AL)",
    "AmapÃ¡ (AP)",
    "Amazonas (AM)",
    "Bahia (BA)",
    "CearÃ¡ (CE)",
    "Distrito Federal (DF)",
    "EspÃ­rito Santo (ES)",
    "GoiÃ¡s (GO)",
    "MaranhÃ£o (MA)",
    "Mato Grosso (MT)",
    "Mato Grosso do Sul (MS)",
    "Minas Gerais (MG)",
    "ParÃ¡ (PA)",
    "ParaÃ­ba (PB)",
    "ParanÃ¡ (PR)",
    "Pernambuco (PE)",
    "PiauÃ­ (PI)",
    "Rio de Janeiro (RJ)",
    "Rio Grande do Norte (RN)",
    "Rio Grande do Sul (RS)",
    "RondÃ´nia (RO)",
    "Roraima (RR)",
    "Santa Catarina (SC)",
    "SÃ£o Paulo (SP)",
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
  "MÃ©xico": ["Ciudad de MÃ©xico", "Jalisco", "Nuevo LeÃ³n", "Puebla", "YucatÃ¡n"],
  Mexico: ["Ciudad de MÃ©xico", "Jalisco", "Nuevo LeÃ³n", "Puebla", "YucatÃ¡n"],
  Argentina: ["Buenos Aires", "CÃ³rdoba", "Mendoza", "Santa Fe", "TucumÃ¡n"],
  Chile: ["Antofagasta", "BiobÃ­o", "Metropolitana", "ValparaÃ­so", "Los Lagos"],
  "ColÃ´mbia": ["Antioquia", "BogotÃ¡ D.C.", "Cundinamarca", "Santander", "Valle del Cauca"],
  Colombia: ["Antioquia", "BogotÃ¡ D.C.", "Cundinamarca", "Santander", "Valle del Cauca"],
  Espanha: ["AndalucÃ­a", "CataluÃ±a", "Comunidad de Madrid", "Galicia", "Valencia"],
  Spain: ["AndalucÃ­a", "CataluÃ±a", "Comunidad de Madrid", "Galicia", "Valencia"],
  Portugal: ["Aveiro", "Braga", "Coimbra", "Lisboa", "Porto"],
  "CanadÃ¡": ["Alberta", "British Columbia", "Ontario", "Quebec", "Manitoba"],
  Canada: ["Alberta", "British Columbia", "Ontario", "Quebec", "Manitoba"],
};

const citiesByState: Record<string, string[]> = {
  "Acre (AC)": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
  "Alagoas (AL)": ["MaceiÃ³", "Arapiraca", "Palmeira dos Ãndios"],
  "AmapÃ¡ (AP)": ["MacapÃ¡", "Santana", "Laranjal do Jari"],
  "Amazonas (AM)": ["Manaus", "Parintins", "Itacoatiara"],
  "Bahia (BA)": ["Salvador", "Feira de Santana", "VitÃ³ria da Conquista"],
  "CearÃ¡ (CE)": ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
  "Distrito Federal (DF)": ["BrasÃ­lia", "Taguatinga", "CeilÃ¢ndia"],
  "EspÃ­rito Santo (ES)": ["VitÃ³ria", "Vila Velha", "Serra"],
  "GoiÃ¡s (GO)": ["GoiÃ¢nia", "Aparecida de GoiÃ¢nia", "AnÃ¡polis"],
  "MaranhÃ£o (MA)": ["SÃ£o LuÃ­s", "Imperatriz", "Caxias"],
  "Mato Grosso (MT)": ["CuiabÃ¡", "VÃ¡rzea Grande", "RondonÃ³polis"],
  "Mato Grosso do Sul (MS)": ["Campo Grande", "Dourados", "TrÃªs Lagoas"],
  "Minas Gerais (MG)": ["Belo Horizonte", "UberlÃ¢ndia", "Contagem"],
  "ParÃ¡ (PA)": ["BelÃ©m", "Ananindeua", "SantarÃ©m"],
  "ParaÃ­ba (PB)": ["JoÃ£o Pessoa", "Campina Grande", "Santa Rita"],
  "ParanÃ¡ (PR)": ["Curitiba", "Londrina", "MaringÃ¡"],
  "Pernambuco (PE)": ["Recife", "JaboatÃ£o dos Guararapes", "Olinda"],
  "PiauÃ­ (PI)": ["Teresina", "ParnaÃ­ba", "Picos"],
  "Rio de Janeiro (RJ)": ["Rio de Janeiro", "NiterÃ³i", "Duque de Caxias"],
  "Rio Grande do Norte (RN)": ["Natal", "MossorÃ³", "Parnamirim"],
  "Rio Grande do Sul (RS)": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
  "RondÃ´nia (RO)": ["Porto Velho", "Ji-ParanÃ¡", "Ariquemes"],
  "Roraima (RR)": ["Boa Vista", "RorainÃ³polis", "CaracaraÃ­"],
  "Santa Catarina (SC)": ["FlorianÃ³polis", "Joinville", "Blumenau"],
  "SÃ£o Paulo (SP)": ["SÃ£o Paulo", "Campinas", "Santos"],
  "Sergipe (SE)": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
  "Tocantins (TO)": ["Palmas", "AraguaÃ­na", "Gurupi"],
};

const countryApiNameMap: Record<string, string> = {
  "Estados Unidos": "United States",
  "EspaÃ±a": "Spain",
  "MÃ©xico": "Mexico",
  "CanadÃ¡": "Canada",
  "JapÃ³n": "Japan",
  "PerÃº": "Peru",
  "Reino Unido": "United Kingdom",
  "Espanha": "Spain",
  "Alemanha": "Germany",
  "FranÃ§a": "France",
  "ItÃ¡lia": "Italy",
  "JapÃ£o": "Japan",
  "ColÃ´mbia": "Colombia",
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
    title: "Otimize o gerenciamento da sua clÃ­nica",
    subtitle: "Experimente gratuitamente os recursos que o melhor sistema para clÃ­nicas de estÃ©tica pode oferecer.",
    backToSite: "Voltar para o site",
    formTitle: "Experimente o Belle Software gratuitamente!",
    success: "Obrigado! Seus dados foram enviados com sucesso.",
    talkNow: "Prefere falar agora? Chame no WhatsApp",
    labels: {
      fullName: "Nome",
      phone: "Celular",
      phoneCode: "DDI",
      professionalsRange: "Quantos profissionais atendem na sua clÃ­nica?",
      country: "PaÃ­s",
      state: "Estado",
      city: "Cidade",
      email: "E-mail",
      password: "Crie uma senha",
      confirmPassword: "Confirme a sua senha",
      showPassword: "Mostrar senha",
      hidePassword: "Ocultar senha",
      terms: "Li e aceito os",
      termsLink: "Termos e CondiÃ§Ãµes",
      button: "ComeÃ§ar o meu teste gratuito",
      required: "Campo obrigatÃ³rio",
      invalidEmail: "E-mail invÃ¡lido",
      passwordMin: "A senha deve ter ao menos 8 caracteres",
      passwordMismatch: "As senhas digitadas nÃ£o correspondem.",
      select: "Selecione",
    },
    options: ["1 pessoa (apenas eu)", "2 pessoas", "3 a 4 pessoas", "5 a 8 pessoas", "9 a 11 pessoas", "12 a 15 pessoas", "Mais de 15 pessoas"],
    cards: [
      { title: "14 dias de acesso grÃ¡tis", text: "Use o sistema sem compromisso e conte com nosso time durante o perÃ­odo de testes." },
      { title: "Sem instalaÃ§Ã£o", text: "Acesse de qualquer lugar, inclusive pelo celular, sem precisar instalar nada." },
      { title: "Sem cartÃ£o de crÃ©dito", text: "VocÃª nÃ£o precisa cadastrar cartÃ£o para testar o Belle Software." },
    ],
    sideTitle: "Gerenciar sua clÃ­nica fica mais fÃ¡cil com o Belle Software",
    sideItems: [
      { title: "SoluÃ§Ãµes sob medida para sua clÃ­nica", text: "Gerencie agendamentos, controle estoque e fidelize clientes com facilidade." },
      { title: "EficiÃªncia e qualidade em um sÃ³ lugar", text: "Reduza o tempo gasto em tarefas administrativas e foque nos seus clientes." },
      { title: "Aumente sua receita com o Belle Software", text: "Identifique oportunidades de crescimento e aumente a satisfaÃ§Ã£o dos seus clientes." },
      { title: "AutomatizaÃ§Ã£o total", text: "Menos tempo com papelada, mais tempo com seus clientes." },
      { title: "IntegraÃ§Ã£o fÃ¡cil e suporte especializado", text: "ImplementaÃ§Ã£o rÃ¡pida e suporte dedicado para garantir seu sucesso." },
    ],
    sideMore: "E muito mais!",
    sideFinal: "Transforme sua gestÃ£o com o melhor sistema para clÃ­nicas de estÃ©tica!",
    countries: [
      "Brasil",
      "Argentina",
      "Chile",
      "ColÃ´mbia",
      "MÃ©xico",
      "Paraguai",
      "Peru",
      "Portugal",
      "Uruguai",
      "Estados Unidos",
      "CanadÃ¡",
      "Espanha",
      "FranÃ§a",
      "ItÃ¡lia",
      "Alemanha",
      "Reino Unido",
      "JapÃ£o",
      "China",
      "AustrÃ¡lia",
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
    title: "Optimiza la gestiÃ³n de tu clÃ­nica",
    subtitle: "Prueba gratis los recursos que el mejor sistema para clÃ­nicas estÃ©ticas puede ofrecer.",
    backToSite: "Volver al sitio",
    formTitle: "Â¡Prueba Belle Software gratis!",
    success: "Â¡Gracias! Tus datos fueron enviados correctamente.",
    talkNow: "Â¿Prefieres hablar ahora? EscrÃ­benos por WhatsApp",
    labels: {
      fullName: "Nombre",
      phone: "Celular",
      phoneCode: "CÃ³digo",
      professionalsRange: "Â¿CuÃ¡ntos profesionales trabajan en tu clÃ­nica?",
      country: "PaÃ­s",
      state: "Estado",
      city: "Ciudad",
      email: "Correo electrÃ³nico",
      password: "Crea una contraseÃ±a",
      confirmPassword: "Confirma tu contraseÃ±a",
      showPassword: "Mostrar contraseÃ±a",
      hidePassword: "Ocultar contraseÃ±a",
      terms: "He leÃ­do y acepto los",
      termsLink: "TÃ©rminos y Condiciones",
      button: "Comenzar mi prueba gratis",
      required: "Campo obligatorio",
      invalidEmail: "Correo electrÃ³nico invÃ¡lido",
      passwordMin: "La contraseÃ±a debe tener al menos 8 caracteres",
      passwordMismatch: "Las contraseÃ±as no coinciden.",
      select: "Selecciona",
    },
    options: ["1 profesional", "2 profesionales", "3 a 4 profesionales", "5 a 8 profesionales", "9 a 11 profesionales", "12 a 15 profesionales", "MÃ¡s de 15 profesionales"],
    cards: [
      { title: "14 dÃ­as de acceso gratis", text: "Usa el sistema sin compromiso y con el apoyo de nuestro equipo durante el perÃ­odo de prueba." },
      { title: "Sin instalaciÃ³n", text: "Accede desde cualquier lugar, incluso desde el celular, sin instalar nada." },
      { title: "Sin tarjeta de crÃ©dito", text: "No necesitas registrar una tarjeta para probar Belle Software." },
    ],
    sideTitle: "Gestionar tu clÃ­nica es mÃ¡s fÃ¡cil con Belle Software",
    sideItems: [
      { title: "Soluciones a medida para tu clÃ­nica", text: "Gestiona citas, controla inventario y fideliza clientes con facilidad." },
      { title: "Eficiencia y calidad en un solo lugar", text: "Reduce el tiempo en tareas administrativas y enfÃ³cate en tus clientes." },
      { title: "Aumenta tus ingresos con Belle Software", text: "Identifica oportunidades de crecimiento y mejora la satisfacciÃ³n de tus clientes." },
      { title: "AutomatizaciÃ³n total", text: "Menos tiempo en papeleo, mÃ¡s tiempo con tus clientes." },
      { title: "IntegraciÃ³n fÃ¡cil y soporte especializado", text: "ImplementaciÃ³n rÃ¡pida y soporte dedicado para garantizar tu Ã©xito." },
    ],
    sideMore: "Â¡Y mucho mÃ¡s!",
    sideFinal: "Â¡Transforma tu gestiÃ³n con el mejor sistema para clÃ­nicas estÃ©ticas!",
    countries: [
      "Brasil",
      "Argentina",
      "Chile",
      "Colombia",
      "MÃ©xico",
      "Paraguay",
      "PerÃº",
      "Portugal",
      "Uruguay",
      "Estados Unidos",
      "CanadÃ¡",
      "EspaÃ±a",
      "Francia",
      "Italia",
      "Alemania",
      "Reino Unido",
      "JapÃ³n",
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
  pt: "Site em portuguÃªs",
  en: "Site em inglÃªs",
  es: "Site em espanhol",
};

const submitErrorByLang: Record<TestePageLanguage, { generic: string; config: string; network: string; validation: string }> = {
  pt: {
    generic: "NÃ£o foi possÃ­vel enviar agora. Tente novamente.",
    config: "ConfiguraÃ§Ã£o de envio indisponÃ­vel no ambiente online. Contate o suporte.",
    network: "Falha de conexÃ£o no envio. Verifique sua internet e tente novamente.",
    validation: "Revise os campos obrigatÃ³rios e tente novamente.",
  },
  en: {
    generic: "Unable to send right now. Please try again.",
    config: "Submission settings are unavailable in this online environment. Please contact support.",
    network: "Connection failed while sending. Check your internet and try again.",
    validation: "Please review required fields and try again.",
  },
  es: {
    generic: "No fue posible enviar ahora. IntÃ©ntalo de nuevo.",
    config: "La configuraciÃ³n de envÃ­o no estÃ¡ disponible en este entorno online. Contacta al soporte.",
    network: "FallÃ³ la conexiÃ³n durante el envÃ­o. Revisa tu internet e intÃ©ntalo de nuevo.",
    validation: "Revisa los campos obligatorios e intÃ©ntalo de nuevo.",
  },
};

function schema(lang: TestePageLanguage, labels: Copy["labels"]) {
  return z
    .object({
      fullName: z.string().min(2, labels.required),
      phoneCode: z.string().min(1, labels.required),
      phone: z.string().min(8, labels.required),
      professionalsRange: z.string().min(1, labels.required),
      country: z.string().min(2, labels.required),
      state: z.string().optional().default(""),
      city: z.string().min(2, labels.required),
      email: z.string().email(labels.invalidEmail),
      password: z.string().min(8, labels.passwordMin),
      confirmPassword: z.string().min(8, labels.passwordMin),
      termsAccepted: z.boolean().refine((value) => value, labels.required),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: labels.passwordMismatch,
      path: ["confirmPassword"],
    })
    .superRefine((data, ctx) => {
      const requiresState =
        lang === "pt" && (data.country === "Brasil" || data.country === "Brazil");

      if (requiresState && (!data.state || data.state.trim().length < 2)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: labels.required,
          path: ["state"],
        });
      }
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
    const errorText = submitErrorByLang[lang];
    const payload = {
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
    };

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.functions.invoke("create-pricing-lead", {
        body: payload,
      });

      if (error) {
        console.error("Lead submit error via invoke, trying direct function call:", error);

        const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
        const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

        if (!supabaseUrl || !supabaseAnonKey) {
          setSubmitError(errorText.config);
          return;
        }

        const directResponse = await fetch(`${supabaseUrl}/functions/v1/create-pricing-lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify(payload),
        });

        const directData = (await directResponse.json().catch(() => null)) as
          | {
              ok?: boolean;
              code?: string;
              fieldErrors?: Record<string, string | string[]>;
            }
          | null;

        if (directResponse.ok && directData?.ok) {
          setSent(true);
          return;
        }

        if (directData?.code === "VALIDATION_ERROR" && directData.fieldErrors) {
          const firstFieldError = Object.values(directData.fieldErrors)
            .flatMap((message) => (Array.isArray(message) ? message : [message]))
            .find((message) => typeof message === "string" && message.trim().length > 0);
          setSubmitError(firstFieldError ?? errorText.validation);
          return;
        }

        setSubmitError(errorText.network);
        return;
      }

      const response = data as
        | {
            ok?: boolean;
            code?: string;
            fieldErrors?: Record<string, string | string[]>;
          }
        | null;

      if (!response?.ok) {
        if (response?.code === "VALIDATION_ERROR" && response.fieldErrors) {
          const firstFieldError = Object.values(response.fieldErrors)
            .flatMap((message) => (Array.isArray(message) ? message : [message]))
            .find((message) => typeof message === "string" && message.trim().length > 0);

          setSubmitError(firstFieldError ?? errorText.validation);
          return;
        }

        setSubmitError(errorText.generic);
        return;
      }

      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message.toLowerCase() : "";
      console.error("Lead submit exception:", err);

      if (message.includes("supabase env vars missing")) {
        setSubmitError(errorText.config);
        return;
      }

      if (message.includes("failed to fetch") || message.includes("network")) {
        setSubmitError(errorText.network);
        return;
      }

      setSubmitError(errorText.generic);
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
                      alt="Bandeira do cÃ³digo"
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
                      <span className="text-base leading-none">âœ“</span>
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


