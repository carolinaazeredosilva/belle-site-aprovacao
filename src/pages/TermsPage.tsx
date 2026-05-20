import { Layout } from "../components/Layout";

type TermsLang = "pt" | "en" | "es";

type TermsSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type TermsCopy = {
  title: string;
  updatedAt: string;
  intro: string;
  sections: TermsSection[];
};

const copyByLang: Record<TermsLang, TermsCopy> = {
  pt: {
    title: "Política de Privacidade",
    updatedAt: "Atualizado em: 26/11/2024",
    intro:
      "No Belle Software, respeitamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. Esta política explica como coletamos, usamos, armazenamos e protegemos suas informações.",
    sections: [
      {
        title: "1. Coleta de Informações Pessoais",
        paragraphs: ["Quando você se cadastra para o teste gratuito ou realiza o download de materiais gratuitos, coletamos os seguintes dados pessoais:"],
        bullets: ["Nome", "Telefone", "E-mail", "Senha (criada para acesso ao Belle Software)."],
      },
      {
        title: "2. Finalidade do Tratamento dos Dados",
        paragraphs: [
          "Os dados coletados têm duas finalidades principais:",
          "1) Permitir o acesso ao Belle Software: utilizamos seu e-mail e senha para criar e gerenciar seu acesso ao sistema.",
          "2) Comunicação durante o teste gratuito: seu nome, telefone e e-mail permitem que nossa equipe entre em contato para oferecer suporte e orientação durante o período de utilização gratuita.",
        ],
      },
      {
        title: "3. Uso e Armazenamento de Dados",
        paragraphs: [
          "As informações fornecidas serão utilizadas exclusivamente para as finalidades descritas e armazenadas em um ambiente seguro, com acesso restrito. Adotamos medidas para garantir a proteção da sua privacidade, respeitando sua intimidade, vida privada, honra e imagem.",
        ],
      },
      {
        title: "4. Gerenciamento de Dados Pessoais",
        paragraphs: [
          "Atualização de dados: você pode atualizar suas informações pessoais a qualquer momento acessando o sistema Belle Software pelo link https://app.bellesoftware.com.br/. Em seguida, navegue até a opção 'Cadastro -> Usuário' para fazer alterações.",
          "Exclusão de dados: se desejar excluir sua conta e todos os seus dados, envie um e-mail para contato@bellesoftware.com.br a partir do e-mail cadastrado, com o assunto 'Excluir minha conta'. O processo de exclusão será realizado conforme solicitado.",
          "Cancelamento de comunicações: caso não queira mais receber comunicações do Belle Software, envie um e-mail para contato@bellesoftware.com.br com o assunto 'Não entrar em contato'. Seu pedido será atendido rapidamente.",
        ],
      },
      {
        title: "5. Uso de Cookies",
        paragraphs: [
          "Nosso site utiliza cookies (pequenos arquivos ou pacotes de dados) para garantir o funcionamento adequado do sistema e proporcionar uma experiência segura. Esses cookies não armazenam informações pessoais e preservam a segurança da sua navegação.",
        ],
      },
      {
        title: "6. Compartilhamento de Dados",
        paragraphs: ["Seus dados não serão compartilhados com terceiros fora do Belle Software, salvo se exigido por lei ou mediante sua autorização expressa."],
      },
      {
        title: "7. Contato",
        paragraphs: ["Se tiver dúvidas ou preocupações sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail contato@bellesoftware.com.br."],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updatedAt: "Updated on: 11/26/2024",
    intro:
      "At Belle Software, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, store, and protect your information.",
    sections: [
      {
        title: "1. Collection of Personal Information",
        paragraphs: ["When you sign up for the free trial or download free materials, we collect the following personal data:"],
        bullets: ["Name", "Phone number", "Email", "Password (created to access Belle Software)."],
      },
      {
        title: "2. Purpose of Data Processing",
        paragraphs: [
          "The data collected has two main purposes:",
          "1) To provide access to Belle Software: we use your email and password to create and manage your access to the system.",
          "2) Communication during the free trial: your name, phone number, and email allow our team to contact you and provide support and guidance during the free usage period.",
        ],
      },
      {
        title: "3. Data Use and Storage",
        paragraphs: [
          "The information provided will be used exclusively for the purposes described and stored in a secure environment with restricted access. We adopt measures to protect your privacy, respecting your personal dignity and private life.",
        ],
      },
      {
        title: "4. Personal Data Management",
        paragraphs: [
          "Data update: you can update your personal information at any time by accessing Belle Software at https://app.bellesoftware.com.br/. Then navigate to 'Cadastro -> Usuário' to make changes.",
          "Data deletion: if you want to delete your account and all your data, send an email to contato@bellesoftware.com.br from your registered email address with the subject 'Delete my account'. The deletion process will be carried out as requested.",
          "Communication opt-out: if you no longer wish to receive communications from Belle Software, send an email to contato@bellesoftware.com.br with the subject 'Do not contact me'. Your request will be handled promptly.",
        ],
      },
      {
        title: "5. Use of Cookies",
        paragraphs: [
          "Our website uses cookies (small files or data packages) to ensure the proper functioning of the system and provide a secure experience. These cookies do not store personal information and help preserve your browsing security.",
        ],
      },
      {
        title: "6. Data Sharing",
        paragraphs: [
          "Your data will not be shared with third parties outside Belle Software, except when required by law or with your express authorization.",
        ],
      },
      {
        title: "7. Contact",
        paragraphs: [
          "If you have any questions or concerns about our Privacy Policy, please contact us at contato@bellesoftware.com.br.",
        ],
      },
    ],
  },
  es: {
    title: "Política de Privacidad",
    updatedAt: "Actualizado el: 26/11/2024",
    intro:
      "En Belle Software, respetamos tu privacidad y estamos comprometidos con la protección de tus datos personales. Esta política explica cómo recopilamos, usamos, almacenamos y protegemos tu información.",
    sections: [
      {
        title: "1. Recopilación de Información Personal",
        paragraphs: ["Cuando te registras para la prueba gratuita o realizas la descarga de materiales gratuitos, recopilamos los siguientes datos personales:"],
        bullets: ["Nombre", "Teléfono", "Correo electrónico", "Contraseña (creada para el acceso a Belle Software)."],
      },
      {
        title: "2. Finalidad del Tratamiento de los Datos",
        paragraphs: [
          "Los datos recopilados tienen dos finalidades principales:",
          "1) Permitir el acceso a Belle Software: utilizamos tu correo electrónico y contraseña para crear y gestionar tu acceso al sistema.",
          "2) Comunicación durante la prueba gratuita: tu nombre, teléfono y correo electrónico permiten que nuestro equipo se ponga en contacto para ofrecer soporte y orientación durante el período de uso gratuito.",
        ],
      },
      {
        title: "3. Uso y Almacenamiento de Datos",
        paragraphs: [
          "La información proporcionada se utilizará exclusivamente para las finalidades descritas y se almacenará en un entorno seguro, con acceso restringido. Adoptamos medidas para garantizar la protección de tu privacidad, respetando tu intimidad, vida privada, honra e imagen.",
        ],
      },
      {
        title: "4. Gestión de Datos Personales",
        paragraphs: [
          "Actualización de datos: puedes actualizar tu información personal en cualquier momento accediendo al sistema Belle Software en https://app.bellesoftware.com.br/. Luego, navega a la opción 'Cadastro -> Usuário' para realizar cambios.",
          "Eliminación de datos: si deseas eliminar tu cuenta y todos tus datos, envía un correo a contato@bellesoftware.com.br desde el correo registrado, con el asunto 'Eliminar mi cuenta'. El proceso de eliminación se realizará según lo solicitado.",
          "Cancelación de comunicaciones: si ya no deseas recibir comunicaciones de Belle Software, envía un correo a contato@bellesoftware.com.br con el asunto 'No entrar en contacto'. Tu solicitud será atendida rápidamente.",
        ],
      },
      {
        title: "5. Uso de Cookies",
        paragraphs: [
          "Nuestro sitio utiliza cookies (pequeños archivos o paquetes de datos) para garantizar el funcionamiento adecuado del sistema y proporcionar una experiencia segura. Estas cookies no almacenan información personal y preservan la seguridad de tu navegación.",
        ],
      },
      {
        title: "6. Compartición de Datos",
        paragraphs: [
          "Tus datos no serán compartidos con terceros fuera de Belle Software, salvo que la ley lo exija o exista tu autorización expresa.",
        ],
      },
      {
        title: "7. Contacto",
        paragraphs: [
          "Si tienes dudas o inquietudes sobre nuestra Política de Privacidad, contáctanos por correo en contato@bellesoftware.com.br.",
        ],
      },
    ],
  },
};

export function TermsPage({ lang }: { lang: TermsLang }) {
  const c = copyByLang[lang];
  return (
    <Layout lang={lang} showLanguageSwitcher={false}>
      <main className="min-h-screen bg-[#f3f4f6] px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-md md:p-10">
          <h1 className="text-center text-4xl font-bold text-[#A11176]">{c.title}</h1>
          <p className="mt-2 text-center text-sm text-[#6b7280]">{c.updatedAt}</p>
          <p className="mt-6 text-lg leading-8 text-[#4b5563]">{c.intro}</p>
          <div className="mt-8 space-y-8">
            {c.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl font-bold text-[#A11176]">{section.title}</h2>
                <div className="mt-4 space-y-3 text-lg leading-8 text-[#4b5563]">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc pl-8">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
