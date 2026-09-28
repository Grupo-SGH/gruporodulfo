import { useEffect, useState } from "react";

export function SplashIntro() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2000);
    const dismiss = () => setHidden(true);
    window.addEventListener("scroll", dismiss, { once: true });
    window.addEventListener("click", dismiss, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("click", dismiss);
    };
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[oklch(0.13_0.02_250)] transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-lux-up text-center">
        <p className="text-[0.6rem] uppercase tracking-[0.5em] text-crimson">Desde 2025</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">
          <span className="text-gilded">Grupo Rodulfo</span>
        </h1>
        <div className="gold-rule mx-auto mt-5 w-48" />
        <p className="mt-5 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Distribuidor de licores
        </p>
      </div>
      <div className="spinner-lux mt-12" />
    </div>
  );
}
