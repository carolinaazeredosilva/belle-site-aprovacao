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
  const pricingPath = lang === "en" ? "/form/en" : lang === "es" ? "/form/es" : `/pricing?lang=${lang}`;
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
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between px-3 py-4 md:px-4">
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
                <Link to={languagePath("pt")} className={`rounded-full px-2.5 py-1 ${lang === "pt" ? "bg-belle text-white" : "text-[#7a4965]"}`}>PT</Link>
                <Link to={languagePath("es")} className={`rounded-full px-2.5 py-1 ${lang === "es" ? "bg-belle text-white" : "text-[#7a4965]"}`}>ES</Link>
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
          <div className="mx-auto w-full max-w-[1360px] px-4 py-12 md:px-6">
            <div className="space-y-3 text-white">
            <p className="text-sm font-bold tracking-[0.12em]">{ui.contacts}</p>
            <p className="flex items-center gap-2"><Phone size={16} /> 0800 646 0099</p>
            <p className="flex items-center gap-2"><MessageCircle size={16} /> <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">(11) 3230-5180</a></p>
            <p className="flex items-center gap-2"><Mail size={16} /> {CONTACT_EMAIL}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#54595F] px-4 py-4 md:px-6">
          <div className="mx-auto flex w-full max-w-[1360px] flex-col items-center justify-between gap-3 md:flex-row">
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
    </div>
  );
}
