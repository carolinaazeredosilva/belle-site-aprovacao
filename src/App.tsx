import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { TestePage } from "./pages/TestePage";
import { TermsPage } from "./pages/TermsPage";

function detectBrowserLangPath() {
  const raw = (navigator.language || "pt").toLowerCase();
  if (raw.startsWith("es")) return "/es";
  if (raw.startsWith("en")) return "/en";
  return "/";
}

function PricingRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rawLang = (params.get("lang") || "pt").toLowerCase();
  const target = rawLang === "es" ? "/form/es" : rawLang === "en" ? "/form/en" : "/form/pt";
  return <Navigate to={target} replace />;
}

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          detectBrowserLangPath() === "/" ? (
            <LandingPage lang="pt" />
          ) : (
            <Navigate to={detectBrowserLangPath()} replace />
          )
        }
      />
      <Route path="/en" element={<LandingPage lang="en" />} />
      <Route path="/es" element={<LandingPage lang="es" />} />
      <Route path="/pricing" element={<PricingRedirect />} />
      <Route path="/form/pt" element={<TestePage lang="pt" />} />
      <Route path="/form/en" element={<TestePage lang="en" />} />
      <Route path="/form/es" element={<TestePage lang="es" />} />
      <Route path="/teste" element={<Navigate to="/form/pt" replace />} />
      <Route path="/teste/en" element={<Navigate to="/form/en" replace />} />
      <Route path="/teste/es" element={<Navigate to="/form/es" replace />} />
      <Route path="/termos-e-condicoes" element={<TermsPage lang="pt" />} />
      <Route path="/terms-and-conditions" element={<TermsPage lang="en" />} />
      <Route path="/terminos-y-condiciones" element={<TermsPage lang="es" />} />
    </Routes>
  );
}
