import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { PRODUCT_TYPES, currency, products, type Product } from "@/lib/products";

type Sort = "relevancia" | "precio-asc" | "precio-desc" | "graduacion";

export function Catalog({
  query,
  onQuery,
  onSelect,
}: {
  query: string;
  onQuery: (v: string) => void;
  onSelect: (p: Product) => void;
}) {
  const [type, setType] = useState<string>("Todos");
  const [maxPrice, setMaxPrice] = useState(1300);
  const [minAbv, setMinAbv] = useState(0);
  const [sort, setSort] = useState<Sort>("relevancia");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const haystack = `${p.name} ${p.brand} ${p.type} ${p.origin} ${p.tasting.join(" ")} ${p.price}`.toLowerCase();
      return (
        (q === "" || haystack.includes(q)) &&
        (type === "Todos" || p.type === type) &&
        p.price <= maxPrice &&
        p.abv >= minAbv
      );
    });
    const sorted = [...list];
    if (sort === "precio-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "graduacion") sorted.sort((a, b) => b.abv - a.abv);
    return sorted;
  }, [query, type, maxPrice, minAbv, sort]);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-5 py-20 sm:px-10">
      <p className="text-[0.62rem] uppercase tracking-[0.35em] text-crimson">Catálogo</p>
      <h2 className="mt-3 text-4xl sm:text-5xl">
        Nuestra <span className="text-gilded">bodega</span>
      </h2>
      <div className="gold-rule mt-5 w-40" />

      <div className="mt-10 grid gap-6 rounded-md border border-border bg-[oklch(0.18_0.025_250)] p-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <label className="mb-2 block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            Búsqueda
          </label>
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Whisky, Zacapa, vainilla, 489…"
            className="input-lux"
          />
        </div>

        <div>
          <label className="mb-2 block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            Precio máximo · {currency(maxPrice)}
          </label>
          <input
            type="range"
            min={50}
            max={1300}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[oklch(0.74_0.12_88)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            Graduación mínima · {minAbv}%
          </label>
          <input
            type="range"
            min={0}
            max={47}
            value={minAbv}
            onChange={(e) => setMinAbv(Number(e.target.value))}
            className="w-full accent-[oklch(0.74_0.12_88)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
            Ordenar por
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="input-lux"
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="graduacion">Graduación alcohólica</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Todos", ...PRODUCT_TYPES].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-full border px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] transition-all duration-300 ${
              type === t
                ? "border-gold bg-gold text-accent-foreground"
                : "border-border text-muted-foreground hover:border-gold hover:text-gold"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {loading ? "Cargando bodega…" : `${results.length} referencias encontradas`}
      </p>

      {loading ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-md border border-border p-4">
              <div className="skeleton-lux h-56 w-full" />
              <div className="skeleton-lux mt-4 h-4 w-2/3" />
              <div className="skeleton-lux mt-2 h-3 w-1/3" />
              <div className="skeleton-lux mt-5 h-6 w-1/2" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="mt-10 rounded-md border border-border p-14 text-center">
          <p className="font-display text-2xl text-gilded">Sin coincidencias</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ajusta la búsqueda o los filtros para ver otras botellas.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
