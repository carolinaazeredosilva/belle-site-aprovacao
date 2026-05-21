import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import { CONTACT_EMAIL, WHATSAPP_URL, type Lang } from "../lib/content";

export function Layout({
  lang,
  children,
  showLanguageSwitcher = true,
}: {
  lang: Lang;
  children: ReactNode;
  showLanguageSwitcher?: boolean;
}) {
  const location = useLocation();
  const pricingPath = lang === "en" ? "/form/en" : lang === "es" ? "/form/es" : "/form/pt";
  const trialCtaPath = pricingPath;
  const homePath = lang === "pt" ? "/" : lang === "en" ? "/en" : "/es";
  const ui =
    lang === "en"
      ? {
          navHome: "Home",
          navPricing: "Plans & Pricing",
          navContact: "Contact",
          mobilePricing: "Pricing",
          trial: "Start free trial",
          contacts: "CONTACT",
          copyright: "© 2025 Belle Software. All rights reserved. Powered by Geinfo"
        }
      : lang === "es"
        ? {
            navHome: "Inicio",
            navPricing: "Planes y Precios",
            navContact: "Contacto",
            mobilePricing: "Precios",
            trial: "Prueba gratis",
            contacts: "CONTACTO",
            copyright: "© 2025 Belle Software. Todos los derechos reservados. Powered by Geinfo"
          }
        : {
            navHome: "Início",
            navPricing: "Planos e Preços",
            navContact: "Contato",
            mobilePricing: "Preços",
            trial: "Teste grátis",
            contacts: "CONTATOS",
            copyright: "© 2025 Belle Software. Todos os direitos reservados. Powered by Geinfo"
          };

  const languagePath = (nextLang: Lang) => {
    if (location.pathname === "/pricing") return `/pricing?lang=${nextLang}`;
    if (nextLang === "pt") return "/";
    if (nextLang === "en") return "/en";
    return "/es";
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-[#f3e5ef] bg-[#FFE7F8]">
        <div className="mx-auto flex w-full items-center justify-between px-2 py-4 md:px-3">
          <a href={homePath} className="flex items-center gap-3">
            <img src="/logo-belle.png" alt="Belle Software" className="h-8 w-auto" />
          </a>
          <nav className="hidden items-center gap-8 font-semibold md:flex">
            <Link to={homePath} className="text-base transition hover:text-belle">{ui.navHome}</Link>
            <Link to={pricingPath} className="text-base transition hover:text-belle">{ui.navPricing}</Link>
            <a href="#contato" className="text-base transition hover:text-belle">{ui.navContact}</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to={pricingPath} className="rounded-full border border-[#e7c7da] bg-white px-3 py-1.5 text-xs font-semibold text-[#7a4965] md:hidden">
              {ui.mobilePricing}
            </Link>
            {showLanguageSwitcher && (
              <div className="flex items-center rounded-full border border-[#f0d6e6] bg-white p-1 text-xs font-bold">
                <Link to={languagePath("es")} className={`rounded-full px-2.5 py-1 ${lang === "es" ? "bg-belle text-white" : "text-[#7a4965]"}`}>ES</Link>
                <Link to={languagePath("pt")} className={`rounded-full px-2.5 py-1 ${lang === "pt" ? "bg-belle text-white" : "text-[#7a4965]"}`}>PT</Link>
                <Link to={languagePath("en")} className={`rounded-full px-2.5 py-1 ${lang === "en" ? "bg-belle text-white" : "text-[#7a4965]"}`}>EN</Link>
              </div>
            )}
            <a href={trialCtaPath} className="rounded-full bg-gradient-to-b from-[#A11176] to-[#F2295B] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-200 transition hover:scale-105">
              {ui.trial}
            </a>
          </div>
        </div>
      </header>

      {children}

      <footer id="contato" className="mt-20 text-white">
        <div className="bg-[#2A2A2A]">
          <div className="mx-auto w-full px-3 py-12 md:px-4">
            <div className="space-y-3 text-white">
            <p className="text-sm font-bold tracking-[0.12em]">{ui.contacts}</p>
            <p className="flex items-center gap-2"><Phone size={16} /> 0800 646 0099</p>
            <p className="flex items-center gap-2"><MessageCircle size={16} /> <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">+55 (11) 3230-5180</a></p>
            <p className="flex items-center gap-2"><Mail size={16} /> {CONTACT_EMAIL}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#54595F] px-4 py-4 md:px-6">
          <div className="mx-auto flex w-full flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-center text-sm text-white">{ui.copyright}</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/bellesoftware" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/bellesoftware" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com time de vendas no WhatsApp"
        className="fixed bottom-5 right-5 z-50 hidden items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-b hover:from-[#A11176] hover:to-[#F2295B] hover:shadow-fuchsia-300/40 md:inline-flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className="h-[34px] w-[34px] shrink-0 text-white"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
        <span className="text-[16px] font-semibold leading-none">Falar com time de vendas</span>
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-b hover:from-[#A11176] hover:to-[#F2295B] hover:shadow-fuchsia-300/40 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className="h-12 w-12 text-white"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </a>
    </div>
  );
}
