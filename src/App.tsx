import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { PricingPage } from "./pages/PricingPage";
import { TestePage } from "./pages/TestePage";
import { TermsPage } from "./pages/TermsPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage lang="pt" />} />
      <Route path="/en" element={<LandingPage lang="en" />} />
      <Route path="/es" element={<LandingPage lang="es" />} />
      <Route path="/pricing" element={<PricingPage />} />
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
