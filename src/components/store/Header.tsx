import logoRodulfo from "../../assets/logo.png";

export function Header({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (v: string) => void;
}) {
  return (
    <header className="sticky top-0 z-[70] border-b border-border bg-[oklch(0.14_0.02_250)]/95 backdrop-blur">
      {/* Doble franja de acento en rojo carmesí */}
      <div className="h-[3px] w-full bg-crimson" />
      <div className="h-[1px] w-full bg-[oklch(0.12_0.02_250)]" />
      <div className="h-[3px] w-full bg-crimson" />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-4 sm:px-10">
        <a href="#top" className="group mr-auto flex items-center gap-3 -ml-3">
          
          {/* Contenedor del logo en la posición exacta */}
          <div className="w-14 h-14 flex items-center justify-center shadow-md overflow-hidden shrink-0">
            <img 
              src={logoRodulfo} 
              alt="Logo Grupo Rodulfo" 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-gilded">Grupo Rodulfo</span>
            <span className="hidden text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
              Licores
            </span>
          </div>
        </a>

        <nav className="order-3 flex w-full gap-6 sm:order-2 sm:w-auto">
          <a href="#catalogo" className="link-lux">
            Catálogo
          </a>
          <a href="#seleccion" className="link-lux">
            Selección
          </a>
          <a href="#casa" className="link-lux">
            La casa
          </a>
        </nav>

        <div className="order-2 relative w-full sm:order-3 sm:w-72">
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Buscar licor, apartir de precio…"
            aria-label="Buscar licores"
            className="input-lux pl-9"
          />
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </div>
      </div>
    </header>
  );
}