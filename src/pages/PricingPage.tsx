import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { type Lang } from "../lib/content";

export function PricingPage() {
  const [params] = useSearchParams();
  const lang = (params.get("lang") || "pt") as Lang;

  useEffect(() => {
    const target =
      lang === "en"
        ? "/form/en"
        : lang === "es"
          ? "/form/es"
          : "/form/pt";

    window.location.replace(target);
  }, [lang]);

  return null;
}
