type Props = {
  label: string;
  className?: string;
  large?: boolean;
};

/**
 * Marco de imagen marcado explícitamente como placeholder.
 * Debe reemplazarse por una fotografía real del producto (no IA).
 */
export function BottlePlaceholder({ label, className = "", large = false }: Props) {
  return (
    <div
      data-image-placeholder="REEMPLAZAR-CON-FOTO-REAL"
      className={`relative flex items-center justify-center overflow-hidden rounded-md border border-border bg-[oklch(0.13_0.02_250)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_35%,oklch(0.36_0.09_245/0.55),transparent_70%)]" />
      <svg
        viewBox="0 0 80 200"
        className={`relative text-gold transition-transform duration-500 ${large ? "h-72" : "h-40"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M32 6h16v34c0 8 14 18 14 34v112a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V74c0-16 14-26 14-34V6Z" />
        <path d="M18 104h44" opacity="0.6" />
        <path d="M26 128h28" opacity="0.4" />
      </svg>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">
        Foto pendiente · {label}
      </span>
    </div>
  );
}
