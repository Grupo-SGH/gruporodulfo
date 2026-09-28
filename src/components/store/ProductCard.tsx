import { BottlePlaceholder } from "./BottlePlaceholder";
import { StarRating } from "./StarRating";
import { currency, type Product } from "@/lib/products";

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  const stockPct = Math.round((product.stock / product.stockTotal) * 100);
  const low = product.stock <= 5;

  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="card-lux group flex flex-col rounded-md p-4 text-left"
    >
      <div className="overflow-hidden rounded-md">
        <BottlePlaceholder
          label={product.brand}
          className="h-56 w-full transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
          {product.type}
        </span>
        <StarRating value={product.rating} />
      </div>

      <h3 className="mt-2 text-lg leading-snug text-foreground">{product.brand}</h3>
      <p className="text-sm text-muted-foreground">{product.name}</p>

      <div className="gold-rule my-4" />

      <div className="flex items-end justify-between">
        <span className="font-display text-2xl text-gilded">{currency(product.price)}</span>
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          {product.abv}% vol · {product.volume}
        </span>
      </div>

      <div className="mt-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-[oklch(0.24_0.03_250)]">
          <div
            className={`h-full rounded-full ${low ? "bg-crimson" : "bg-gold"}`}
            style={{ width: `${Math.max(stockPct, 6)}%` }}
          />
        </div>
        <p
          className={`mt-2 text-[0.62rem] uppercase tracking-[0.18em] ${
            low ? "text-crimson" : "text-muted-foreground"
          }`}
        >
          {low ? `Quedan pocas unidades · ${product.stock}` : `${product.stock} unidades disponibles`}
        </p>
      </div>
    </button>
  );
}
