import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock3,
  Coins,
  CreditCard,
  FileCheck2,
  Gauge,
  Globe,
  ListFilter,
  Lock,
  Megaphone,
  MessageCircleMore,
  Package,
  Settings,
  ShieldCheck,
  UserCog,
  Sparkles,
  Target,
  Ticket,
  TrendingUp,
  UserPlus,
  Users
} from "lucide-react";
import { Layout } from "../components/Layout";
import { CONTACT_EMAIL, WHATSAPP_URL, type Lang } from "../lib/content";

type Feature = { icon: React.ComponentType<{ size?: number | string; className?: string }>; title: string; subtitle: string; text: string };
type Solution = { title: string; text: string; image: string };
type Copy = {
  heroTitle: string;
  heroText: string;
  trial: string;
  trustTitle: string;
  demoTitle: string;
  demoSubtitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  solutionsTitle: string;
  solutionsSubtitle: string;
  aiEyebrow: string;
  aiTitle: string;
  aiText: string;
  whatsappTitle: string;
  whatsappSubtitle: string;
  appTitle: string;
  appText: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  supportTitle: string;
  supportSubtitle: string;
  ctaTitle: string;
  ctaText: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  features: Feature[];
  aiCards: Array<{ title: string; text: string }>;
  whatsappBullets: string[];
  appClinicBullets: string[];
  appClientBullets: string[];
  supportCards: Array<{ title: string; text: string }>;
};

const logoUrls = [
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-priscilapalazzoP.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Odara-logo.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Majo-logo.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Lavih-logo.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-fio-laser.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Emagrelogo.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-buddhaP.jpg",
  "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-adclinicP.jpg"
];

const solutionsPt: Solution[] = [
  {
    title: "Agenda inteligente para clínicas de estética",
    text: "Organize sua rotina, profissionais, salas e equipamentos sem conflitos de horário.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Agenda.png"
  },
  {
    title: "Gestão completa de atendimentos",
    text: "Registre evoluções, acesse históricos e tenha controle total dos procedimentos.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Painel-atendimentos.png"
  },
  {
    title: "Controle financeiro para clínicas",
    text: "Centralize pagamentos, despesas e comissões com visão clara do caixa.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Vendas-de-planos.png"
  },
  {
    title: "Automação de marketing",
    text: "Dispare campanhas via WhatsApp, SMS, push e e-mail para aumentar retorno.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Automacao-de-Marketing.png"
  },
  {
    title: "CRM para clínicas de estética",
    text: "Gerencie funil, histórico e relacionamento para aumentar conversão e fidelização.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/CRM.png"
  }
];

const solutionsEn: Solution[] = [
  {
    title: "Smart scheduling for aesthetic clinics",
    text: "Organize your routine, professionals, rooms and equipment without conflicts.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Agenda.png"
  },
  {
    title: "Complete service management",
    text: "Register progress, access history and keep full control of procedures.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Painel-atendimentos.png"
  },
  {
    title: "Financial control for clinics",
    text: "Centralize payments, expenses and commissions with a clear cash-flow view.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Vendas-de-planos.png"
  },
  {
    title: "Marketing automation",
    text: "Launch WhatsApp, SMS, push and email campaigns to increase return.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Automacao-de-Marketing.png"
  },
  {
    title: "CRM for aesthetic clinics",
    text: "Manage funnel, history and relationships to improve conversion and loyalty.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/CRM.png"
  }
];

const solutionsEs: Solution[] = [
  {
    title: "Agenda inteligente para clínicas estéticas",
    text: "Organiza tu rutina, profesionales, salas y equipos sin conflictos.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Agenda.png"
  },
  {
    title: "Gestión completa de atenciones",
    text: "Registra evoluciones, accede al historial y controla todos los procedimientos.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Painel-atendimentos.png"
  },
  {
    title: "Control financiero para clínicas",
    text: "Centraliza pagos, gastos y comisiones con una visión clara del flujo de caja.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Vendas-de-planos.png"
  },
  {
    title: "Automatización de marketing",
    text: "Lanza campañas por WhatsApp, SMS, push y correo para aumentar resultados.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Automacao-de-Marketing.png"
  },
  {
    title: "CRM para clínicas estéticas",
    text: "Gestiona embudo, historial y relación con clientes para fidelizar más.",
    image: "https://www.bellesoftware.com.br/wp-content/uploads/2025/11/CRM.png"
  }
];

const sharedFeatures: Feature[] = [
  { icon: Clock3, title: "Agenda inteligente", subtitle: "Organize atendimentos sem conflitos", text: "Gerencie horários, profissionais, salas e equipamentos sem conflitos." },
  { icon: FileCheck2, title: "Ficha de anamnese", subtitle: "Padronize e acompanhe evoluções", text: "Crie fichas personalizadas e acompanhe o histórico de cada cliente." },
  { icon: CreditCard, title: "Venda de planos", subtitle: "Aumente o faturamento da clínica", text: "Crie planos e pacotes com controle dos atendimentos." },
  { icon: Coins, title: "Gestão financeira", subtitle: "Tenha controle total do caixa da clínica", text: "Gerencie contas, caixa, DRE, fechamento e inadimplência em um só lugar." },
  { icon: BarChart3, title: "Conciliação bancária", subtitle: "Organize lançamentos com precisão", text: "Simplifique a conciliação financeira e mantenha o controle das movimentações da clínica." },
  { icon: UserPlus, title: "Captação de clientes", subtitle: "Atraia mais pacientes para sua clínica", text: "Crie formulários personalizados para captar novos leads pelo seu site." },
  { icon: Users, title: "CRM para clínicas", subtitle: "Centralize vendas e relacionamento", text: "Gerencie funis, renovações e pós-venda em um único lugar." },
  { icon: ListFilter, title: "Lista de segmentação", subtitle: "Crie campanhas mais assertivas", text: "Organize clientes em grupos estratégicos para melhorar suas ações de venda." },
  { icon: Megaphone, title: "Marketing integrado", subtitle: "Envie campanhas com mais eficiência", text: "Dispare campanhas por WhatsApp, SMS, Push e E-mail para sua base de clientes." },
  { icon: Ticket, title: "Voucher personalizado", subtitle: "Fidelize clientes com mais praticidade", text: "Crie vouchers personalizados para campanhas e ações da clínica." },
  { icon: TrendingUp, title: "Pesquisa NPS", subtitle: "Meça a satisfação dos seus clientes", text: "Acompanhe o nível de satisfação e fidelização das clientes da clínica." },
  { icon: BarChart3, title: "BI e dashboards", subtitle: "Visualize dados estratégicos da clínica", text: "Acesse relatórios, gráficos e indicadores em tempo real." },
  { icon: Gauge, title: "Indicadores de gestão", subtitle: "Tome decisões com mais inteligência", text: "Monitore resultados e acompanhe o desempenho da clínica com clareza." },
  { icon: Target, title: "Gestão de metas", subtitle: "Acompanhe resultados e projeções", text: "Monitore metas da clínica e tome decisões baseadas em desempenho." },
  { icon: Package, title: "Controle de estoque", subtitle: "Gerencie produtos com mais eficiência", text: "Controle entradas, saídas, compras e inventário em um só lugar." },
  { icon: CheckCircle2, title: "Comissão automatizada", subtitle: "Automatize cálculos e comissões", text: "Gerencie comissões de profissionais, vendas, planos e produtos automaticamente." },
  { icon: ShieldCheck, title: "Auditoria do sistema", subtitle: "Tenha mais controle e transparência", text: "Acompanhe registros e alterações realizadas no sistema da clínica." },
  { icon: Lock, title: "Controle de acesso", subtitle: "Segurança para a operação da clínica", text: "Defina permissões e controle o acesso dos profissionais ao sistema." }
];

const sharedFeaturesEn: Feature[] = [
  { icon: Clock3, title: "Smart scheduling", subtitle: "Organize appointments without conflicts", text: "Manage schedules, professionals, rooms and equipment with no overlap." },
  { icon: FileCheck2, title: "Anamnesis form", subtitle: "Standardize and track progress", text: "Create custom forms and keep each client history organized." },
  { icon: CreditCard, title: "Plan sales", subtitle: "Increase clinic revenue", text: "Create plans and packages with full appointment control." },
  { icon: Coins, title: "Financial management", subtitle: "Total control over cash flow", text: "Manage accounts, cash flow, P&L, closing and delinquency in one place." },
  { icon: BarChart3, title: "Bank reconciliation", subtitle: "Organize entries precisely", text: "Simplify reconciliation and keep full control of financial movements." },
  { icon: UserPlus, title: "Lead capture", subtitle: "Attract more patients", text: "Create custom forms to capture new leads from your website." },
  { icon: Users, title: "CRM for clinics", subtitle: "Centralize sales and relationships", text: "Manage funnels, renewals and follow-up in one place." },
  { icon: ListFilter, title: "Segmentation lists", subtitle: "Create more assertive campaigns", text: "Group clients strategically to improve your sales actions." },
  { icon: Megaphone, title: "Integrated marketing", subtitle: "Launch campaigns efficiently", text: "Send campaigns via WhatsApp, SMS, push and email to your base." },
  { icon: Ticket, title: "Custom vouchers", subtitle: "Build loyalty with ease", text: "Create custom vouchers for promotions and clinic campaigns." },
  { icon: TrendingUp, title: "NPS survey", subtitle: "Measure client satisfaction", text: "Track satisfaction and loyalty level from your clients." },
  { icon: BarChart3, title: "BI and dashboards", subtitle: "View strategic clinic data", text: "Access reports, charts and indicators in real time." },
  { icon: Gauge, title: "Management indicators", subtitle: "Make smarter decisions", text: "Monitor outcomes and clinic performance clearly." },
  { icon: Target, title: "Goals management", subtitle: "Track results and projections", text: "Monitor clinic goals and decide based on performance." },
  { icon: Package, title: "Inventory control", subtitle: "Manage products efficiently", text: "Control inputs, outputs, purchases and stock in one place." },
  { icon: CheckCircle2, title: "Automated commissions", subtitle: "Automate calculations and payouts", text: "Manage commissions from services, plans and products automatically." },
  { icon: ShieldCheck, title: "System audit", subtitle: "More control and transparency", text: "Track records and all changes performed in the system." },
  { icon: Lock, title: "Access control", subtitle: "Security for clinic operations", text: "Define permissions and control professional access to the system." }
];

const sharedFeaturesEs: Feature[] = [
  { icon: Clock3, title: "Agenda inteligente", subtitle: "Organiza citas sin conflictos", text: "Gestiona horarios, profesionales, salas y equipos sin superposiciones." },
  { icon: FileCheck2, title: "Ficha de anamnesis", subtitle: "Estandariza y acompaña evoluciones", text: "Crea fichas personalizadas y sigue el historial de cada cliente." },
  { icon: CreditCard, title: "Venta de planes", subtitle: "Aumenta los ingresos de la clínica", text: "Crea planes y paquetes con control total de atenciones." },
  { icon: Coins, title: "Gestión financiera", subtitle: "Control total del flujo de caja", text: "Gestiona cuentas, caja, cierre e impagos en un solo lugar." },
  { icon: BarChart3, title: "Conciliación bancaria", subtitle: "Organiza movimientos con precisión", text: "Simplifica la conciliación financiera y mantén el control de los movimientos." },
  { icon: UserPlus, title: "Captación de clientes", subtitle: "Atrae más pacientes", text: "Crea formularios personalizados para captar nuevos leads desde tu sitio web." },
  { icon: Users, title: "CRM para clínicas", subtitle: "Centraliza ventas y relación", text: "Gestiona embudos, renovaciones y postventa en un solo lugar." },
  { icon: ListFilter, title: "Lista de segmentación", subtitle: "Crea campañas más efectivas", text: "Organiza clientes en grupos estratégicos para mejorar tus acciones comerciales." },
  { icon: Megaphone, title: "Marketing integrado", subtitle: "Envía campañas con eficiencia", text: "Lanza campañas por WhatsApp, SMS, push y correo para tu base de clientes." },
  { icon: Ticket, title: "Voucher personalizado", subtitle: "Fideliza con practicidad", text: "Crea vouchers personalizados para promociones y acciones de la clínica." },
  { icon: TrendingUp, title: "Encuesta NPS", subtitle: "Mide la satisfacción de tus clientes", text: "Acompaña el nivel de satisfacción y fidelización de tus pacientes." },
  { icon: BarChart3, title: "BI y dashboards", subtitle: "Visualiza datos estratégicos", text: "Accede a informes, gráficos e indicadores en tiempo real." },
  { icon: Gauge, title: "Indicadores de gestión", subtitle: "Toma decisiones inteligentes", text: "Monitorea resultados y desempeño de la clínica con claridad." },
  { icon: Target, title: "Gestión de metas", subtitle: "Acompaña resultados y proyecciones", text: "Monitorea metas de la clínica y decide con base en rendimiento." },
  { icon: Package, title: "Control de stock", subtitle: "Gestiona productos con eficiencia", text: "Controla entradas, salidas, compras e inventario en un solo lugar." },
  { icon: CheckCircle2, title: "Comisiones automatizadas", subtitle: "Automatiza cálculos y comisiones", text: "Gestiona comisiones por servicios, planes y productos de forma automática." },
  { icon: ShieldCheck, title: "Auditoría del sistema", subtitle: "Más control y transparencia", text: "Sigue registros y cambios realizados dentro del sistema." },
  { icon: Lock, title: "Control de acceso", subtitle: "Seguridad para la operación", text: "Define permisos y controla el acceso de profesionales al sistema." }
];

const copyByLang: Record<Lang, Copy> = {
  pt: {
    heroTitle: "O Melhor Sistema para Clínica de Estética",
    heroText:
      "Agenda, CRM, financeiro, automações, WhatsApp, anamnese, marketing e inteligência artificial em um único software para clínicas de estética.",
    trial: "Testar grátis por 14 dias",
    trustTitle: "Mais de 30 mil profissionais confiam no Belle Software",
    demoTitle: "Conheça o sistema para clínicas de estética Belle Software",
    demoSubtitle: "Veja na prática como funciona e descubra como organizar sua clínica, aumentar faturamento e fidelizar clientes.",
    featuresTitle: "Gestão completa para clínicas de estética",
    featuresSubtitle: "Conheça as funcionalidades que tornam a gestão da sua clínica mais inteligente.",
    solutionsTitle: "Tudo que você precisa em um único sistema para clínicas de estética",
    solutionsSubtitle: "Ferramentas completas para gestão, atendimento, marketing e crescimento da sua clínica.",
    aiEyebrow: "Inteligência Artificial no Belle Software",
    aiTitle: "Inteligência Artificial integrada à rotina da sua clínica de estética",
    aiText: "Um sistema com IA que automatiza processos, organiza informações e melhora a tomada de decisão.",
    whatsappTitle: "Transforme o WhatsApp no maior aliado da sua clínica",
    whatsappSubtitle: "Reduza faltas, aumente a ocupação da agenda e automatize sua comunicação.",
    appTitle: "Sua clínica de estética na palma da mão",
    appText: "Um app completo, integrado ao sistema, para acompanhar sua operação em tempo real onde você estiver.",
    testimonialsTitle: "Clínicas de estética de todo o Brasil crescem com o Belle Software",
    testimonialsSubtitle: "Veja como clínicas estão transformando sua gestão e aumentando resultados.",
    supportTitle: "Suporte que acompanha sua clínica em cada etapa",
    supportSubtitle: "Do primeiro acesso ao crescimento da sua clínica, você conta com nosso time ao seu lado.",
    ctaTitle: "Experimente o Belle Software grátis",
    ctaText: "Teste sem compromisso e descubra como o Belle Software pode transformar sua gestão.",
    faqTitle: "Dúvidas frequentes sobre o Belle Software",
    faq: [
      {
        q: "O Belle Software serve para qualquer clínica de estética?",
        a: "Sim. O Belle Software é um sistema para clínica de estética completo, desenvolvido para atender desde clínicas menores até grandes operações. Ele se adapta ao seu modelo de atendimento, oferecendo recursos para gestão, agenda, financeiro e relacionamento com clientes."
      },
      {
        q: "O Belle Software oferece treinamento para clínicas de estética?",
        a: "Sim. Ao contratar o software para clínica de estética Belle Software, você recebe suporte completo com treinamentos, materiais educativos e acompanhamento da nossa equipe para garantir que sua clínica utilize todo o potencial do sistema desde o início."
      },
      {
        q: "Como funciona o teste grátis do Belle Software?",
        a: "O teste grátis permite que você utilize as principais funcionalidades do sistema para clínica de estética sem compromisso. Você pode explorar a agenda, financeiro e CRM para entender na prática como o Belle Software pode ajudar na gestão da sua clínica."
      },
      {
        q: "O software de estética Belle Software é seguro?",
        a: "Sim. O Belle Software utiliza tecnologias avançadas de segurança para proteger os dados da sua clínica e dos seus clientes. Nosso sistema de estética conta com controle de acesso, backups automáticos e protocolos de segurança para garantir total confiabilidade."
      },
      {
        q: "Posso acessar o Belle Software pelo celular e computador?",
        a: "Sim. O sistema de clínicas de estética Belle Software é totalmente online, permitindo acesso pelo computador, celular ou tablet. Além disso, contamos com app para clínica de estética que facilita o acompanhamento da sua operação em qualquer lugar."
      },
      {
        q: "É possível importar dados de outro sistema para o Belle Software?",
        a: "Sim. Nossa equipe auxilia na migração de dados de outros sistemas para o Belle Software, garantindo uma transição segura e organizada para o seu novo sistema para clínica de estética."
      },
      {
        q: "Preciso instalar o Belle Software ou ele é online?",
        a: "Não é necessário instalar. O Belle Software é um software clínica de estética 100% online, acessado diretamente pelo navegador. Isso facilita o uso, reduz custos e permite acesso de qualquer lugar."
      },
      {
        q: "Vale a pena usar um sistema para clínica de estética?",
        a: "Sim. Um sistema para clínica de estética ajuda a organizar processos, reduzir erros, aumentar a produtividade e melhorar o atendimento ao cliente. Com o Belle Software, você centraliza toda a gestão da sua clínica em uma única plataforma, ganhando mais controle e eficiência."
      }
    ],
    features: sharedFeatures,
    aiCards: [
      { title: "BelleChat IA", text: "Atenda com IA ou humano em uma plataforma centralizada, rápida e eficiente." },
      { title: "Gestor IA", text: "Faça perguntas e receba respostas rápidas sem abrir relatórios." },
      { title: "IA Básica", text: "Fale com o sistema e organize anamnese, registros e informações no CRM." },
      { title: "IA Avançada", text: "Análises inteligentes e lançamento de despesas para decisões mais seguras." }
    ],
    whatsappBullets: [
      "Confirmações automáticas",
      "Lembretes inteligentes",
      "Cobranças automatizadas",
      "Reativação de clientes",
      "Campanhas que geram faturamento"
    ],
    appClinicBullets: ["Financeiro", "Agendamento", "Cadastros", "Painel de atendimentos", "Venda de planos", "Indicadores (BSC)"],
    appClientBullets: ["Agendamento", "Compra de serviços", "Compra de planos", "Compra de produtos", "Promoções", "Notificações"],
    supportCards: [
      { title: "Suporte Técnico", text: "Seg. a sex.: 8h às 22h.\nSábados: 9h às 16h30." },
      { title: "Central de Ajuda Completa", text: "Base de conhecimento com tutoriais e vídeos dentro do sistema." },
      { title: "Treinamentos", text: "Nossa equipe ensina tudo sobre o sistema." },
      { title: "Dicas de Gestão", text: "Você faz parte de um ecossistema de gestão para crescer com previsibilidade." }
    ]
  },
  en: {
    heroTitle: "The Best Software for Aesthetic Clinics",
    heroText: "Scheduling, CRM, finance, automations, WhatsApp, forms, marketing and AI in one platform.",
    trial: "Start free trial",
    trustTitle: "More than 30,000 professionals trust Belle Software",
    demoTitle: "Discover Belle Software in practice",
    demoSubtitle: "See how to organize your clinic, increase revenue and improve loyalty.",
    featuresTitle: "Complete management for aesthetic clinics",
    featuresSubtitle: "Explore the core features for smarter clinic management.",
    solutionsTitle: "Everything you need in one system",
    solutionsSubtitle: "Management, service, marketing and growth in one platform.",
    aiEyebrow: "Artificial Intelligence at Belle Software",
    aiTitle: "AI integrated into your clinic routine",
    aiText: "AI that automates processes, organizes information and improves decision-making.",
    whatsappTitle: "Turn WhatsApp into your clinic's best ally",
    whatsappSubtitle: "Reduce no-shows, increase occupancy and automate communication.",
    appTitle: "Your clinic in the palm of your hand",
    appText: "A complete app integrated with your system for real-time operation tracking.",
    testimonialsTitle: "Clinics across Brazil grow with Belle Software",
    testimonialsSubtitle: "See how clinics improve management and performance.",
    supportTitle: "Support that follows your clinic at every step",
    supportSubtitle: "From onboarding to growth, our team stays by your side.",
    ctaTitle: "Try Belle Software for free",
    ctaText: "No commitment. Discover how Belle Software transforms your management.",
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is Belle Software suitable for any clinic size?", a: "Yes, from small clinics to large operations." },
      { q: "Do you provide training?", a: "Yes, complete onboarding and training support are included." },
      { q: "How does the free trial work?", a: "You can test key features with no commitment." },
      { q: "Is the software secure?", a: "Yes, with access control, backups and security protocols." },
      { q: "Can I use mobile and desktop?", a: "Yes, it is fully online and multi-device." },
      { q: "Can data be migrated from another system?", a: "Yes, our team supports safe migration." }
    ],
    features: sharedFeaturesEn,
    aiCards: [
      { title: "BelleChat AI", text: "Serve with AI or human support in one centralized channel." },
      { title: "AI Manager", text: "Ask questions and get quick answers without opening reports." },
      { title: "Basic AI", text: "Speak to the system and organize forms and records in CRM." },
      { title: "Advanced AI", text: "Smart analysis and expense launches for safer decisions." }
    ],
    whatsappBullets: ["Automatic confirmations", "Smart reminders", "Automated billing", "Client reactivation", "Revenue campaigns"],
    appClinicBullets: ["Finance", "Scheduling", "Registrations", "Service Desk", "Plan Sales", "Indicators (BSC)"],
    appClientBullets: ["Scheduling", "Service purchases", "Plan purchases", "Product purchases", "Promotions", "Notifications"],
    supportCards: [
      { title: "Technical Support", text: "Mon-Fri 8am-10pm.\nSat 9am-4:30pm." },
      { title: "Help Center", text: "Knowledge base with tutorials and videos inside the platform." },
      { title: "Training", text: "Our team teaches your staff how to get full value from the system." },
      { title: "Management Tips", text: "Join an ecosystem focused on growth and operational excellence." }
    ]
  },
  es: {
    heroTitle: "El Mejor Sistema para Clínicas Estéticas",
    heroText: "Agenda, CRM, finanzas, automatizaciones, WhatsApp, fichas, marketing e IA en una sola plataforma.",
    trial: "Comenzar prueba gratis",
    trustTitle: "Más de 30.000 profesionales confían en Belle Software",
    demoTitle: "Conoce Belle Software en la práctica",
    demoSubtitle: "Descubre cómo organizar tu clínica, aumentar ingresos y fidelizar clientes.",
    featuresTitle: "Gestión completa para clínicas estéticas",
    featuresSubtitle: "Conoce funcionalidades para una gestión más inteligente.",
    solutionsTitle: "Todo lo que necesitas en un único sistema",
    solutionsSubtitle: "Gestion, atencion, marketing y crecimiento en una sola plataforma.",
    aiEyebrow: "Inteligencia Artificial en Belle Software",
    aiTitle: "Inteligencia artificial integrada a la rutina de tu clínica",
    aiText: "IA que automatiza procesos, organiza información y mejora decisiones.",
    whatsappTitle: "Transforma WhatsApp en el mayor aliado de tu clínica",
    whatsappSubtitle: "Reduce ausencias, aumenta la ocupación y automatiza la comunicación.",
    appTitle: "Tu clínica en la palma de tu mano",
    appText: "Una app completa integrada al sistema para acompañar la operación en tiempo real.",
    testimonialsTitle: "Clínicas de todo Brasil crecen con Belle Software",
    testimonialsSubtitle: "Descubre cómo las clínicas mejoran su gestión y resultados.",
    supportTitle: "Soporte que acompaña tu clínica en cada etapa",
    supportSubtitle: "Desde el inicio hasta el crecimiento, nuestro equipo está contigo.",
    ctaTitle: "Prueba Belle Software gratis",
    ctaText: "Sin compromiso. Descubre como Belle Software transforma tu gestion.",
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Sirve para cualquier tamaño de clínica?", a: "Sí, desde clínicas pequeñas hasta operaciones grandes." },
      { q: "¿Ofrecen entrenamiento?", a: "Sí, incluye onboarding y capacitación completa." },
      { q: "¿Cómo funciona la prueba gratis?", a: "Puedes probar funcionalidades clave sin compromiso." },
      { q: "¿El software es seguro?", a: "Sí, con control de acceso, backups y protocolos de seguridad." },
      { q: "¿Puedo usar móvil y escritorio?", a: "Sí, es 100% online y multidispositivo." },
      { q: "¿Se pueden migrar datos?", a: "Sí, nuestro equipo apoya una migración segura." }
    ],
    features: sharedFeaturesEs,
    aiCards: [
      { title: "BelleChat IA", text: "Atiende con IA o humano en un canal centralizado." },
      { title: "Gestor IA", text: "Haz preguntas y recibe respuestas rápidas sin abrir reportes." },
      { title: "IA Básica", text: "Habla con el sistema y organiza fichas y registros en el CRM." },
      { title: "IA Avanzada", text: "Análisis inteligente y gastos para decisiones más seguras." }
    ],
    whatsappBullets: ["Confirmaciones automáticas", "Recordatorios inteligentes", "Cobros automatizados", "Reactivación de clientes", "Campañas que generan ingresos"],
    appClinicBullets: ["Finanzas", "Agenda", "Registros", "Panel de atencion", "Venta de planes", "Indicadores (BSC)"],
    appClientBullets: ["Agenda", "Compra de servicios", "Compra de planes", "Compra de productos", "Promociones", "Notificaciones"],
    supportCards: [
      { title: "Soporte Técnico", text: "Lun-Vie 8h-22h.\nSábados 9h-16:30h." },
      { title: "Centro de Ayuda", text: "Base de conocimiento con tutoriales y videos dentro del sistema." },
      { title: "Entrenamientos", text: "Nuestro equipo enseña todo para sacar máximo provecho." },
      { title: "Consejos de Gestión", text: "Forma parte de un ecosistema orientado al crecimiento." }
    ]
  }
};

const testimonialsByLang = {
  pt: [
    {
      quote:
        "O Belle Software mudou completamente a forma como administro minha clínica. Agenda simples, financeiro completo e muito mais eficiência para toda a equipe.",
      name: "Janaina Marchioreto",
      role: "Administradora - Clínica Fisical",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2019/05/fisicallogo.jpg.webp"
    },
    {
      quote:
        "Posso definir o sistema clínica de estética Belle Software como: a solução para os nossos problemas! Completo, rápido e intuitivo. Suporte técnico incrível, a equipe está de parabéns!",
      name: "Marcia",
      role: "Administradora",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2019/05/donvitale.jpg.webp"
    },
    {
      quote:
        "O Belle Software atende minha clínica de forma completa, do agendamento ao financeiro. Tenho controle do estoque, dos recebimentos e acompanho meus resultados com clareza.",
      name: "Vanessa Amorim",
      role: "Proprietária",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Lavih-logo.jpg"
    }
  ],
  en: [
    {
      quote:
        "Belle Software completely changed how I manage my clinic. Simple scheduling, complete finance control, and much more efficiency for the whole team.",
      name: "Janaina Marchioreto",
      role: "Manager - Clínica Fisical",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2019/05/fisicallogo.jpg.webp"
    },
    {
      quote:
        "I can define Belle Software for aesthetic clinics as the solution to our problems. Complete, fast and intuitive. Outstanding technical support.",
      name: "Marcia",
      role: "Manager",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2019/05/donvitale.jpg.webp"
    },
    {
      quote:
        "Belle Software supports my clinic end-to-end, from scheduling to finance. I control inventory, receivables and performance with clarity.",
      name: "Vanessa Amorim",
      role: "Owner",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Lavih-logo.jpg"
    }
  ],
  es: [
    {
      quote:
        "Belle Software cambió por completo la forma en que administro mi clínica. Agenda simple, finanzas completas y más eficiencia para todo el equipo.",
      name: "Janaina Marchioreto",
      role: "Administradora - Clínica Fisical",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2019/05/fisicallogo.jpg.webp"
    },
    {
      quote:
        "Puedo definir Belle Software para clínicas estéticas como la solución a nuestros problemas. Completo, rápido e intuitivo, con soporte técnico excelente.",
      name: "Marcia",
      role: "Administradora",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2019/05/donvitale.jpg.webp"
    },
    {
      quote:
        "Belle Software atiende mi clínica de forma completa, desde la agenda hasta las finanzas. Controlo inventario, cobros y resultados con claridad.",
      name: "Vanessa Amorim",
      role: "Propietaria",
      image: "https://www.bellesoftware.com.br/wp-content/uploads/2026/03/logo-Lavih-logo.jpg"
    }
  ]
} as const;

export function LandingPage({ lang }: { lang: Lang }) {
  const t = copyByLang[lang];
  const trialPath = lang === "en" ? "/form/en" : lang === "es" ? "/form/es" : `/pricing?lang=${lang}`;
  const solutions = lang === "en" ? solutionsEn : lang === "es" ? solutionsEs : solutionsPt;
  const testimonials = testimonialsByLang[lang];
  const ui =
    lang === "en"
      ? {
          heroFootnote: "No commitment. No credit card. No download.",
          logoAlt: "Belle client clinic",
          kpis: ["Active users", "Appointments", "Billed", "Franchises"],
          slideAriaPrefix: "Go to slide",
          demoButton: "Start free trial now",
          demoVideoTitle: "Discover Belle Software",
          prevFeatureAria: "Previous feature",
          nextFeatureAria: "Next feature",
          solutionsCta: "Start free trial",
          aiFooter: "Less typing. Better organization. More focus on clients.",
          aiButton: "Start free trial",
          whatsappCta: "I want to automate my clinic",
          appClinicTitle: "Clinic app",
          appClientTitle: "Client app",
          appButton: "Start free trial",
          supportImageAlt: "Belle support",
          supportEmailLabel: "Email",
          supportPhoneLabel: "Phone",
          contactTitle: "Talk to our team",
          contactSubtitle: "Choose your preferred channel and we'll help you quickly.",
          contactWhatsApp: "Chat on WhatsApp",
          contactPhone: "Call us now",
          contactEmail: "Send an email",
          finalButton: "Start free trial",
          finalFootnote: "No commitment. No credit card. No download. Start in minutes.",
          faqTail: "about Belle Software"
        }
      : lang === "es"
        ? {
            heroFootnote: "Sin compromiso. Sin tarjeta. Sin descarga.",
            logoAlt: "Clínica cliente de Belle",
            kpis: ["Usuarios activos", "Agendamientos", "Facturado", "Franquicias"],
            slideAriaPrefix: "Ir a la diapositiva",
            demoButton: "Probar gratis ahora",
            demoVideoTitle: "Conoce Belle Software",
            prevFeatureAria: "Funcionalidad anterior",
            nextFeatureAria: "Siguiente funcionalidad",
            solutionsCta: "Probar gratis",
            aiFooter: "Menos digitación. Más organización. Más foco en el cliente.",
            aiButton: "Comenzar prueba gratis",
            whatsappCta: "Quiero automatizar mi clínica",
            appClinicTitle: "App de la clínica",
            appClientTitle: "App del cliente",
            appButton: "Comenzar prueba gratis",
            supportImageAlt: "Soporte Belle",
            supportEmailLabel: "Email",
            supportPhoneLabel: "Teléfono",
            contactTitle: "Habla con nuestro equipo",
            contactSubtitle: "Elige tu canal preferido y te ayudamos rapidamente.",
            contactWhatsApp: "Escribir por WhatsApp",
            contactPhone: "Llamar ahora",
            contactEmail: "Enviar correo",
            finalButton: "Probar gratis",
            finalFootnote: "Sin compromiso. Sin tarjeta. Sin descarga. Empieza en minutos.",
            faqTail: "sobre Belle Software"
          }
        : {
            heroFootnote: "Sem compromisso. Sem cartão. Sem download.",
            logoAlt: "Clinica cliente Belle",
            kpis: ["Usuários ativos", "Agendamentos", "Faturados", "Franquias"],
            slideAriaPrefix: "Ir para slide",
            demoButton: "Teste grátis agora",
            demoVideoTitle: "Conheca o sistema Belle Software",
            prevFeatureAria: "Funcionalidade anterior",
            nextFeatureAria: "Proxima funcionalidade",
            solutionsCta: "Testar grátis",
            aiFooter: "Menos digitação. Mais organização. Mais foco no cliente.",
            aiButton: "Começar teste grátis",
            whatsappCta: "Quero automatizar minha clínica",
            appClinicTitle: "APP da clínica",
            appClientTitle: "APP do cliente",
            appButton: "Começar teste grátis",
            supportImageAlt: "Suporte Belle",
            supportEmailLabel: "E-mail",
            supportPhoneLabel: "Telefone",
            contactTitle: "Fale com nosso time",
            contactSubtitle: "Escolha o melhor canal e vamos te atender rapidamente.",
            contactWhatsApp: "Chamar no WhatsApp",
            contactPhone: "Ligar agora",
            contactEmail: "Enviar e-mail",
            finalButton: "Testar grátis",
            finalFootnote: "Sem compromisso. Sem cartão. Sem download. Comece em minutos.",
            faqTail: "sobre o Belle Software"
          };
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const activeSolution = solutions[solutionIndex];

  const nextSolution = () => {
    setSolutionIndex((prev) => (prev + 1) % solutions.length);
  };

  const prevSolution = () => {
    setSolutionIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  return (
    <Layout lang={lang}>
      <main className="mx-auto w-full max-w-[1360px] px-3 pb-14 pt-10 md:px-4">
        <section id="inicio" className="grid items-center gap-10 rounded-3xl bg-gradient-to-b from-white to-[#FFE7F8] p-6 md:grid-cols-2 md:p-10">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-[38px] font-bold leading-[1.08] text-[#233c5e] md:text-[55px] md:leading-[60px]">
              {lang === "pt" ? (
                <>
                  O Melhor{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}
                  >
                    Sistema para Clínica
                  </span>{" "}
                  de Estética
                </>
              ) : lang === "es" ? (
                <>
                  El Mejor{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}
                  >
                    Sistema para Clínicas
                  </span>{" "}
                  Estéticas
                </>
              ) : lang === "en" ? (
                <>
                  The{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}
                  >
                    Best Software
                  </span>{" "}
                  for Aesthetic{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}
                  >
                    Clinics
                  </span>
                </>
              ) : (
                t.heroTitle
              )}
            </motion.h1>
            <p className="mt-5 max-w-xl text-[16px] font-medium leading-[1.5] text-[#365372] md:text-[17px]">{t.heroText}</p>
            <a href={trialPath} className="mt-8 inline-flex rounded-[9px] bg-gradient-to-b from-[#A11176] to-[#F2295B] px-8 py-3 text-[16px] font-semibold text-white shadow-lg shadow-fuchsia-200">
              {t.trial}
            </a>
            <p className="mt-4 text-[14px] italic leading-[21px] text-[#5e7591]">{ui.heroFootnote}</p>
          </div>
          <div className="rounded-3xl bg-transparent p-0">
            <img src="https://www.bellesoftware.com.br/wp-content/uploads/2026/04/Sistema-para-clinicas-de-estetica.gif" alt="Sistema Belle Software" className="w-full rounded-2xl" />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-center text-[27px] font-bold text-[#24364f] md:text-[38px]">{t.trustTitle}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-[#A1117620] bg-white p-5 md:grid-cols-4">
            {logoUrls.map((src) => (
              <div key={src} className="flex h-20 items-center justify-center rounded-xl border border-[#ece6f4] bg-white px-4">
                <img src={src} alt={ui.logoAlt} className="max-h-10 w-auto grayscale transition hover:grayscale-0" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 rounded-2xl bg-[#f8f2fb] p-5 md:grid-cols-4">
          {[
            { number: "+30K", label: ui.kpis[0] },
            { number: "+40M", label: ui.kpis[1] },
            { number: "+2B", label: ui.kpis[2] },
            { number: "+800", label: ui.kpis[3] }
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-white p-5 text-center">
              <p className="text-[32px] font-bold text-[#A11176] md:text-[45px]">{kpi.number}</p>
              <p className="mt-1 text-[14px] font-semibold text-[#4e4e4e] md:text-[15px]">{kpi.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid items-center gap-8 rounded-3xl border border-[#eedaf2] bg-white p-8 md:grid-cols-2">
          <div>
            <h2 className="text-[27px] font-bold text-[#2a2a2a] md:text-[38px]">
              {lang === "pt" ? (
                <>
                  Conheça o sistema para clínicas de estética{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                    Belle Software
                  </span>
                </>
              ) : lang === "en" ? (
                <>
                  Discover{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                    Belle Software
                  </span>{" "}
                  in practice
                </>
              ) : lang === "es" ? (
                <>
                  Conoce{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                    Belle Software
                  </span>{" "}
                  en la práctica
                </>
              ) : (
                t.demoTitle
              )}
            </h2>
            <p className="mt-3 text-[15px] font-medium text-[#4e4e4e] md:text-[17px]">{t.demoSubtitle}</p>
            <a href={trialPath} className="mt-6 inline-block rounded-[9px] bg-gradient-to-b from-[#A11176] to-[#F2295B] px-7 py-3 text-[16px] font-semibold text-white">
              {ui.demoButton}
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <iframe
              className="aspect-video w-full rounded-2xl"
              src="https://www.youtube.com/embed/xRF66h8tDlA"
              title={ui.demoVideoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section id="funcionalidades" className="mt-16">
          <h2 className="text-center text-[27px] font-bold leading-[1.2] text-[#2a2a2a] md:text-[38px]">
            {lang === "pt" ? (
              <>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)"
                  }}
                >
                  Gestão completa
                </span>{" "}
                para clínicas de estética
              </>
            ) : lang === "es" ? (
              <>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)"
                  }}
                >
                  Gestión completa
                </span>{" "}
                para clínicas estéticas
              </>
            ) : (
              t.featuresTitle
            )}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium leading-[1.5] text-[#4e4e4e] md:text-[17px]">{t.featuresSubtitle}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.features.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} whileHover={{ y: -2 }} className="min-h-[220px] rounded-[20px] border border-[#A1117629] bg-white px-5 pb-5 pt-3">
                  <Icon className="text-[#A11176]" size={15} />
                  <h3 className="mt-3 text-[17px] font-semibold leading-[21px] text-[#2a2a2a]">{item.title}</h3>
                  <p className="mt-2 text-[15px] font-semibold leading-[20px] text-[#A11176]">{item.subtitle}</p>
                  <p className="mt-2 text-[15px] font-medium leading-[24px] text-[#4e4e4e]">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[#f8f2fb] p-8">
          <h2 className="text-center text-[27px] font-bold md:text-[38px]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}
            >
              {t.solutionsTitle}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium text-[#4e4e4e] md:text-[17px]">{t.solutionsSubtitle}</p>
          <div className="mt-8 rounded-2xl border border-[#e9d9ee] bg-white p-5">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <img src={activeSolution.image} alt={activeSolution.title} className="w-full rounded-xl" />
              <div className="flex items-center justify-center gap-3 md:flex-col">
                <button type="button" onClick={prevSolution} className="rounded-full border border-[#e1cfe7] p-2 text-[#A11176] transition hover:bg-[#fdf4fb]" aria-label={ui.prevFeatureAria}>
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={nextSolution} className="rounded-full border border-[#e1cfe7] p-2 text-[#A11176] transition hover:bg-[#fdf4fb]" aria-label={ui.nextFeatureAria}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-[20px] font-bold text-[#2a2a2a] md:text-[32px]">{activeSolution.title}</h3>
              <p className="mt-2 text-[15px] font-medium text-[#4e4e4e] md:text-[17px]">{activeSolution.text}</p>
              <a href={trialPath} className="mt-4 inline-block text-[16px] font-semibold text-[#A11176]">{ui.solutionsCta}</a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {solutions.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSolutionIndex(idx)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    idx === solutionIndex ? "bg-[#A11176] text-white" : "bg-[#f5edf8] text-[#7f4b78]"
                  }`}
                  aria-label={`${ui.slideAriaPrefix} ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-[#41042F] p-8 text-white md:p-10">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A11176] to-[#d21188] px-5 py-2 text-sm font-medium text-white">
              <Sparkles size={14} />
              <span>{t.aiEyebrow}</span>
            </div>
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl text-center text-[27px] font-bold leading-[1.2] md:text-[55px] md:leading-[60px]">
            {lang === "pt" ? (
              <>
                <span className="text-[#00FFF5]">Inteligência Artificial</span> integrada à rotina da sua clínica de estética
              </>
            ) : lang === "es" ? (
              <>
                <span className="text-[#00FFF5]">Inteligencia artificial</span> integrada a la rutina de tu clínica
              </>
            ) : lang === "en" ? (
              <>
                <span className="text-[#00FFF5]">AI integrated</span> into your clinic routine
              </>
            ) : (
              t.aiTitle
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[15px] font-medium text-white/85 md:text-[17px]">{t.aiText}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.aiCards.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="text-[22px] font-semibold text-[#00FFF5]">{item.title}</h3>
                <p className="mt-1 text-[15px] font-medium leading-[1.4] text-white/85 md:text-[17px]">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[16px] font-medium text-white/90 md:text-[17px]">{ui.aiFooter}</p>
          <a href={trialPath} className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-[16px] font-bold text-[#A11176]">{ui.aiButton}</a>
        </section>

        <section className="mt-16 grid items-center gap-8 rounded-3xl border border-[#A1117626] bg-[#fff6fc] p-6 md:grid-cols-2 md:p-8">
          <img src="https://www.bellesoftware.com.br/wp-content/uploads/2026/03/Integracao-whatsapp-belle-software-6.png.webp" alt="Integracao WhatsApp Belle Software" className="w-full rounded-2xl" />
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#f8ddeb] px-4 py-1 text-[14px] font-semibold text-[#A11176]">WhatsApp</p>
            <h2 className="mt-4 text-[27px] font-bold leading-[1.15] text-[#1f2438] md:text-[50px] md:leading-[1.1]">
              {lang === "pt" ? (
                <>
                  Transforme o WhatsApp no{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                    maior aliado
                  </span>{" "}
                  da sua clínica
                </>
              ) : lang === "es" ? (
                <>
                  Transforma WhatsApp en el{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                    mayor aliado
                  </span>{" "}
                  de tu clínica
                </>
              ) : (
                <>
                  Turn WhatsApp into your clinic&apos;s{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                    best ally
                  </span>
                </>
              )}
            </h2>
            <p className="mt-4 text-[20px] font-semibold leading-[1.3] text-[#A11176] md:text-[27px] md:leading-[1.3]">
              {t.whatsappSubtitle}
            </p>
            <div className="mt-6 space-y-2.5">
              {t.whatsappBullets.map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5cfe4] text-[#A11176]">
                    <MessageCircleMore size={18} />
                  </span>
                  <p className="text-[17px] font-medium text-[#343b4d] md:text-[17px]">{item}</p>
                </div>
              ))}
            </div>
            <a href={trialPath} className="mt-7 inline-block rounded-xl bg-gradient-to-b from-[#A11176] to-[#F2295B] px-8 py-3 text-[16px] font-semibold text-white">{ui.whatsappCta}</a>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-white p-8">
          <h2 className="text-center text-[27px] font-bold text-[#2a2a2a] md:text-[50px]">
            {lang === "pt" ? (
              <>
                Sua clínica de estética{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  na palma da mão
                </span>
              </>
            ) : lang === "es" ? (
              <>
                Tu clínica{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  en la palma de tu mano
                </span>
              </>
            ) : lang === "en" ? (
              <>
                Your clinic{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  in the palm of your hand
                </span>
              </>
            ) : (
              t.appTitle
            )}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium text-[#4e4e4e] md:text-[17px]">
            {t.appText}
          </p>
          <div className="mt-8 grid items-start gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <div className="flex justify-center">
              <img
                src="https://www.bellesoftware.com.br/wp-content/uploads/2026/04/celular-aplicativos-belle-software-768x717.png.webp"
                alt="Aplicativo Belle Software"
                className="w-full max-w-[420px] object-contain"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-[20px] font-bold text-[#2a2a2a]">{ui.appClinicTitle}</h3>
                <ul className="mt-3 space-y-2 text-[16px] text-[#3e4e66]">
                  {t.appClinicBullets.map((i) => <li key={i}>• {i}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-[#2a2a2a]">{ui.appClientTitle}</h3>
                <ul className="mt-3 space-y-2 text-[16px] text-[#3e4e66]">
                  {t.appClientBullets.map((i) => <li key={i}>• {i}</li>)}
                </ul>
              </div>
              <div className="md:col-span-2">
                <a href={trialPath} className="mt-2 inline-block rounded-[9px] bg-gradient-to-b from-[#A11176] to-[#F2295B] px-8 py-3 text-[16px] font-semibold text-white">
                  {ui.appButton}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-[27px] font-bold text-[#2a2a2a] md:text-[38px]">
            {lang === "pt" ? (
              <>
                Clínicas de estética de todo o Brasil{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  crescem com o Belle Software
                </span>
              </>
            ) : (
              t.testimonialsTitle
            )}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[15px] font-medium text-[#4e4e4e] md:text-[17px]">{t.testimonialsSubtitle}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-[#e8dff1] bg-white p-6">
                <p className="text-[#4e4e4e]">{item.quote}</p>
                <p className="mt-4 text-[14px] font-semibold text-[#A11176]">⭐⭐⭐⭐⭐</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-[#2a2a2a]">{item.name}</p>
                    <p className="text-[14px] text-[#5a5a5a]">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-[#A1117626] bg-[#fff6fc] p-8 md:p-10">
          <h2 className="mx-auto max-w-5xl text-center text-[27px] font-bold leading-[1.15] text-[#234469] md:text-[45px] md:leading-[1.12]">
            {lang === "pt" ? (
              <>
                Suporte que acompanha{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  sua clínica de estética em cada etapa
                </span>
              </>
            ) : lang === "en" ? (
              <>
                Support that follows your{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  clinic at every step
                </span>
              </>
            ) : lang === "es" ? (
              <>
                Soporte que acompaña{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  tu clínica en cada etapa
                </span>
              </>
            ) : (
              t.supportTitle
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-center text-[15px] font-medium leading-[1.5] text-[#345e88] md:text-[16px]">
            {t.supportSubtitle}
          </p>
          <div className="mt-10 grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <img src="https://www.bellesoftware.com.br/wp-content/uploads/2025/11/Tela-suporte.png.webp" alt={ui.supportImageAlt} className="w-full" />
          </div>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {[
              { icon: UserCog, card: t.supportCards[0], showLinks: true },
              { icon: Settings, card: t.supportCards[1], showLinks: false },
              { icon: Bot, card: t.supportCards[2], showLinks: false },
              { icon: Globe, card: t.supportCards[3], showLinks: false }
            ].map(({ icon: Icon, card, showLinks }, idx) => {
              return (
              <article key={card.title ?? idx}>
                <Icon size={35} className="text-[#A11176]" />
                <h3 className="mt-4 text-[20px] font-semibold leading-[1.15] text-[#1f2438] md:text-[22px]">{card.title}</h3>
                <p className="mt-3 whitespace-pre-line text-[16px] font-medium leading-[1.45] text-[#2d3a4f] md:text-[16px]">{card.text}</p>
                {showLinks ? (
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[16px] font-semibold leading-[1.45] text-[#A11176] md:text-[16px]">
                    <a href="https://wa.me/551132305180" target="_blank" rel="noreferrer" className="hover:underline">
                      WhatsApp
                    </a>
                    <span>|</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
                      {ui.supportEmailLabel}
                    </a>
                    <span>|</span>
                    <a href="tel:08006460099" className="hover:underline">
                      {ui.supportPhoneLabel}
                    </a>
                  </p>
                ) : null}
              </article>
            )})}
          </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-r from-[#A11176] to-[#F2295B] px-8 py-12 text-center text-white">
          <h2 className="text-[27px] font-bold md:text-[38px]">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-[15px] font-medium text-white/90 md:text-[17px]">{t.ctaText}</p>
          <a href={trialPath} className="mt-7 inline-block rounded-xl bg-white px-8 py-3 text-[16px] font-bold text-[#A11176]">{ui.finalButton}</a>
          <p className="mt-3 text-[14px] text-white/85">{ui.finalFootnote}</p>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-[27px] font-bold text-[#2a2a2a] md:text-[45px]">
            {lang === "pt" ? (
              <>
                Dúvidas frequentes{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  sobre o Belle Software
                </span>
              </>
            ) : (
              t.faqTitle
            )}
          </h2>
          <div className="mx-auto mt-6 max-w-5xl rounded-3xl bg-white p-6">
            {t.faq.map((item, idx) => (
              <div
                key={item.q}
                className="mb-4 last:mb-0 rounded-[30px] bg-[#ffe7f8]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="flex w-full items-center gap-[9px] rounded-t-[30px] bg-[#ffe7f8] px-5 py-4 text-left text-[16px] font-semibold leading-[1.35] text-[#A11176] transition-all duration-200 ease-out active:scale-[0.995]"
                >
                  <span className="text-[15px] font-bold text-[#A11176]">{openFaqIndex === idx ? "−" : "+"}</span>
                  <span>{item.q}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="rounded-b-[30px] bg-[#ffe7f8] px-12 pb-5 text-[15px] font-medium leading-[1.5] text-[#2a2a2a] md:text-[16px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-[#efd8ea] bg-gradient-to-r from-[#fff5fc] to-[#f7f4ff] p-6 md:p-8">
          <h2 className="text-center text-[27px] font-bold text-[#2a2a2a] md:text-[38px]">
            {lang === "pt" ? (
              <>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  Fale
                </span>{" "}
                com nosso time
              </>
            ) : lang === "es" ? (
              <>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  Habla
                </span>{" "}
                con nuestro equipo
              </>
            ) : lang === "en" ? (
              <>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #A11176, #F2295B)" }}>
                  Talk
                </span>{" "}
                to our team
              </>
            ) : (
              ui.contactTitle
            )}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] font-medium text-[#5b5b6b] md:text-[17px]">{ui.contactSubtitle}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="rounded-2xl border border-[#e7d4ea] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[14px] font-semibold text-[#A11176]">WhatsApp</p>
              <p className="mt-1 text-[18px] font-bold text-[#2a2a2a]">(11) 3230-5180</p>
              <p className="mt-2 text-[15px] font-medium text-[#5b5b6b]">{ui.contactWhatsApp}</p>
            </a>
            <a href="tel:08006460099" className="rounded-2xl border border-[#e7d4ea] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[14px] font-semibold text-[#A11176]">0800</p>
              <p className="mt-1 text-[18px] font-bold text-[#2a2a2a]">0800 646 0099</p>
              <p className="mt-2 text-[15px] font-medium text-[#5b5b6b]">{ui.contactPhone}</p>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-2xl border border-[#e7d4ea] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[14px] font-semibold text-[#A11176]">E-mail</p>
              <p className="mt-1 text-[18px] font-bold text-[#2a2a2a]">{CONTACT_EMAIL}</p>
              <p className="mt-2 text-[15px] font-medium text-[#5b5b6b]">{ui.contactEmail}</p>
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}


