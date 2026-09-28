import { useEffect, useState } from "react";
import { BottlePlaceholder } from "./BottlePlaceholder";
import { CheckoutPanel } from "./CheckoutPanel";
import { StarRating } from "./StarRating";
import { currency, type Product } from "@/lib/products";

export function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const [buying, setBuying] = useState(false);
  const [showWholesaleMenu, setShowWholesaleMenu] = useState(false);
  
  const [selectedPrice, setSelectedPrice] = useState<number>(product.price);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedTitle, setSelectedTitle] = useState<string>(`${product.brand} — ${product.name}`);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const stockPct = Math.round((product.stock / product.stockTotal) * 100);
  const low = product.stock <= 5;

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-[oklch(0.12_0.02_250)]">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-[oklch(0.12_0.02_250)]/95 px-5 py-4 backdrop-blur sm:px-10">
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold">
          Grupo Rodulfo · {product.type}
        </span>
        <button type="button" onClick={onClose} className="link-lux">
          Volver al catálogo
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-10 lg:grid-cols-2 lg:py-16">
        <div className="animate-lux-up">
          <BottlePlaceholder
            label={`${product.brand} ${product.name}`}
            large
            className="h-[26rem] w-full sm:h-[34rem]"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Etiqueta", "Detalle", "Estuche"].map((l) => (
              <BottlePlaceholder key={l} label={l} className="h-24 w-full" />
            ))}
          </div>
        </div>

        <div className="animate-lux-up">
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-crimson">{product.origin}</p>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">{product.brand}</h2>
          <p className="mt-2 font-display text-2xl text-muted-foreground">{product.name}</p>

          <div className="mt-4 flex items-center gap-4">
            <StarRating value={product.rating} />
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {product.abv}% vol · {product.volume}
            </span>
          </div>

          <div className="gold-rule my-6" />
          <p className="font-display text-4xl text-gilded">{currency(product.price)}</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <h3 className="mt-8 text-sm uppercase tracking-[0.25em] text-gold">Notas de cata</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.tasting.map((note) => (
              <li
                key={note}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                {note}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <div className="h-1 w-full overflow-hidden rounded-full bg-[oklch(0.24_0.03_250)]">
              <div
                className={`h-full rounded-full ${low ? "bg-crimson" : "bg-gold"}`}
                style={{ width: `${Math.max(stockPct, 6)}%` }}
              />
            </div>
            <p
              className={`mt-2 text-[0.65rem] uppercase tracking-[0.18em] ${
                low ? "text-crimson" : "text-muted-foreground"
              }`}
            >
              {low
                ? `Quedan pocas unidades · solo ${product.stock}`
                : `${product.stock} unidades en bodega`}
            </p>
          </div>

          {!buying ? (
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="btn-lux w-full text-center"
                  onClick={() => {
                    setSelectedPrice(product.price);
                    setSelectedQuantity(1);
                    setSelectedTitle(`${product.brand} — ${product.name} (1 Botella)`);
                    setShowWholesaleMenu(false);
                    setBuying(true);
                  }}
                >
                  Comprar botella
                </button>
                <button
                  type="button"
                  className="w-full rounded border border-gold bg-gold/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/20 text-center font-medium"
                  onClick={() => setShowWholesaleMenu(!showWholesaleMenu)}
                >
                  Al mayor
                </button>
              </div>

              {showWholesaleMenu && product.wholesale && (
                <div className="mt-4 rounded-lg border border-border bg-[oklch(0.15_0.02_250)] p-4 animate-lux-up">
                  <p className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                    Selecciona un lote al mayor:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPrice(product.wholesale!.lote10);
                        setSelectedQuantity(10);
                        setSelectedTitle(`${product.brand} — ${product.name} (Lote 10 Botellas)`);
                        setBuying(true);
                      }}
                      className="flex flex-col items-center rounded border border-border p-2 text-left transition-colors hover:border-gold"
                    >
                      <span className="text-xs font-semibold text-foreground">10 Botellas</span>
                      <span className="text-sm font-display text-gilded">{currency(product.wholesale.lote10)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPrice(product.wholesale!.lote20);
                        setSelectedQuantity(20);
                        setSelectedTitle(`${product.brand} — ${product.name} (Lote 20 Botellas)`);
                        setBuying(true);
                      }}
                      className="flex flex-col items-center rounded border border-border p-2 text-left transition-colors hover:border-gold"
                    >
                      <span className="text-xs font-semibold text-foreground">20 Botellas</span>
                      <span className="text-sm font-display text-gilded">{currency(product.wholesale.lote20)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPrice(product.wholesale!.lote50);
                        setSelectedQuantity(50);
                        setSelectedTitle(`${product.brand} — ${product.name} (Lote 50 Botellas)`);
                        setBuying(true);
                      }}
                      className="flex flex-col items-center rounded border border-border p-2 text-left transition-colors hover:border-gold"
                    >
                      <span className="text-xs font-semibold text-foreground">50 Botellas</span>
                      <span className="text-sm font-display text-gilded">{currency(product.wholesale.lote50)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPrice(product.wholesale!.lote100);
                        setSelectedQuantity(100);
                        setSelectedTitle(`${product.brand} — ${product.name} (Lote 100 Botellas)`);
                        setBuying(true);
                      }}
                      className="flex flex-col items-center rounded border border-border p-2 text-left transition-colors hover:border-gold"
                    >
                      <span className="text-xs font-semibold text-foreground">100 Botellas</span>
                      <span className="text-sm font-display text-gilded">{currency(product.wholesale.lote100)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8">
              <CheckoutPanel 
                product={product} 
                customPrice={selectedPrice} 
                customTitle={selectedTitle} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}