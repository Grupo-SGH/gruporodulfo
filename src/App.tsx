import { useState } from "react";
import { BottlePlaceholder } from "@/components/store/BottlePlaceholder";
import { Catalog } from "@/components/store/Catalog";
import { Header } from "@/components/store/Header";
import { ProductDetail } from "@/components/store/ProductDetail";
import { ScrollProgress } from "@/components/store/ScrollProgress";
import { SplashIntro } from "@/components/store/SplashIntro";
import { products, type Product } from "@/lib/products";

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const featured = products.slice(0, 3);

  return (
    <div id="top" className="min-h-screen">
      <SplashIntro />
      <ScrollProgress />
      <Header query={query} onQuery={setQuery} />

      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-10 lg:grid-cols-2 lg:py-28">
          <div className="animate-lux-up">
            <p className="text-[0.62rem] uppercase tracking-[0.4em] text-crimson">
              Destilados de autor
            </p>
            <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              El arte de la <span className="text-gilded">botella</span> perfecta
            </h1>
            <div className="gold-rule my-7 w-56" />
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Cada referencia de nuestra bodega se selecciona a mano: añejamientos largos, ediciones
              limitadas y casas que llevan generaciones perfeccionando su oficio.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#catalogo" className="btn-lux">
                Explorar catálogo
              </a>
              <a href="#casa" className="link-lux self-center">
                Conocer sobre nosotros
              </a>
            </div>
          </div>

          <div className="animate-lux-up grid grid-cols-2 gap-4">
            <BottlePlaceholder label="Pieza destacada" large className="col-span-2 h-72" />
            <BottlePlaceholder label="Edición limitada" className="h-44" />
            <BottlePlaceholder label="Añejamiento" className="h-44" />
          </div>
        </div>
      </section>

      <section id="seleccion" className="mx-auto max-w-7xl px-5 py-20 sm:px-10">
        <p className="text-[0.62rem] uppercase tracking-[0.35em] text-crimson">Selección</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">
          Las tres más <span className="text-gilded">destacadas</span> del mes
        </h2>
        <div className="gold-rule mt-5 w-40" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelected(product)}
              className="card-lux group rounded-md p-5 text-left"
            >
              <BottlePlaceholder
                label={product.brand}
                className="h-48 w-full transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <h3 className="mt-5 text-xl">{product.brand}</h3>
              <p className="text-sm text-muted-foreground">{product.name}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold">Ver detalle</p>
            </button>
          ))}
        </div>
      </section>

      <Catalog query={query} onQuery={setQuery} onSelect={setSelected} />

      <section id="casa" className="border-y border-border bg-[oklch(0.18_0.025_250)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-3">
          {[
            {
              title: "Curaduría",
              description: "Un comité de sumilleres cata cada lote antes de entrar en bodega.",
            },
            {
              title: "Bodega climatizada",
              description: "Temperatura y humedad controladas para preservar cada añejamiento.",
            },
            {
              title: "Entrega asegurada",
              description: "Embalaje rígido, seguro incluido y seguimiento puerta a puerta.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-2xl text-gilded">{item.title}</h3>
              <div className="gold-rule my-4 w-24" />
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 py-12 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <span className="font-display text-xl text-gilded">Grupo Rodulfo</span>
          
          {/* --- ICONOS DE REDES SOCIALES Y MAPS --- */}
          <div className="flex items-center gap-5">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/p/Grupo-Rodulfo-61571841485727/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook de Grupo Rodulfo"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com/gruporodulfo" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram de Grupo Rodulfo"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/584121423631" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp de Grupo Rodulfo"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            {/* Google Maps */}
            <a 
              href="https://maps.app.goo.gl/Zv7scxDjP1Yj2xZT9" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Ubicación en Google Maps de Grupo Rodulfo"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </a>
          </div>

          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            Venta exclusiva a mayores de 18 años · Bebe con moderación
          </p>
        </div>
      </footer>

      {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}