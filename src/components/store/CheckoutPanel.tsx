import { useState } from "react";
import { currency, type Product } from "@/lib/products";

type Fields = {
  name: string;
  card: string;
  expiry: string;
  cvc: string;
  address: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", card: "", expiry: "", cvc: "", address: "" };

const digits = (v: string) => v.replace(/\D/g, "");

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 3) e.name = "Escribe tu nombre completo.";
  if (digits(f.card).length !== 16) e.card = "La tarjeta debe tener 16 dígitos.";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.expiry)) e.expiry = "Formato MM/AA inválido.";
  else {
    const [mm, yy] = f.expiry.split("/").map(Number);
    const exp = new Date(2000 + yy, mm, 0);
    if (exp < new Date()) e.expiry = "La tarjeta está vencida.";
  }
  if (digits(f.cvc).length < 3) e.cvc = "CVC de 3 o 4 dígitos.";
  if (f.address.trim().length < 8) e.address = "Indica una dirección de entrega completa.";
  return e;
}

export function CheckoutPanel({ 
  product, 
  customPrice, 
  customTitle 
}: { 
  product: Product; 
  customPrice?: number; 
  customTitle?: string; 
}) {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "declined">("idle");
  const [orderId, setOrderId] = useState("");

  const finalPrice = customPrice !== undefined ? customPrice : product.price;
  const itemTitle = customTitle !== undefined ? customTitle : `${product.brand} — ${product.name}`;

  const shipping = 18;
  const total = finalPrice + shipping;

  const set = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "declined") setStatus("idle");
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("loading");
    setTimeout(() => {
      const card = digits(fields.card);
      if (card.endsWith("0000")) {
        setStatus("declined");
        return;
      }
      setOrderId(`CC-${Date.now().toString().slice(-6)}`);
      setStatus("success");
    }, 1400);
  };

  if (status === "success") {
    return (
      <div className="animate-lux-up rounded-md border border-border bg-[oklch(0.18_0.025_250)] p-8 text-center">
        <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16 text-gold" fill="none" strokeWidth="3">
          <circle cx="32" cy="32" r="28" stroke="currentColor" opacity="0.35" />
          <path
            d="M19 33.5 28.5 43 45 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray="80"
            style={{ animation: "lux-check 0.8s ease forwards" }}
          />
        </svg>
        <h3 className="mt-5 text-2xl text-gilded">Gracias por tu compra</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Pedido {orderId} confirmado. Recibirás la confirmación por correo.
        </p>
        <div className="gold-rule my-6" />
        <dl className="space-y-2 text-left text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground max-w-[65%]">
              {itemTitle}
            </dt>
            <dd>{currency(finalPrice)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Envío asegurado</dt>
            <dd>{currency(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3 font-display text-lg">
            <dt>Total</dt>
            <dd className="text-gilded">{currency(total)}</dd>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <dt>Entrega en</dt>
            <dd className="max-w-[60%] text-right">{fields.address}</dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-md border border-border bg-[oklch(0.18_0.025_250)] p-6"
      noValidate
    >
      <h3 className="text-xl">Finalizar compra</h3>
      <div className="gold-rule my-4" />

      {status === "declined" && (
        <p className="mb-4 rounded-md border border-crimson bg-[oklch(0.55_0.23_22/0.12)] px-4 py-3 text-sm text-foreground">
          Tarjeta rechazada por el banco emisor. Verifica los datos o usa otro método e inténtalo de
          nuevo.
        </p>
      )}

      <div className="grid gap-4">
        <Field
          label="Nombre completo"
          value={fields.name}
          onChange={set("name")}
          error={errors.name}
          placeholder="Hector Rodulfo"
          autoComplete="name"
        />
        <Field
          label="Número de tarjeta"
          value={fields.card}
          onChange={(v) => set("card")(digits(v).slice(0, 16).replace(/(.{4})/g, "$1 ").trim())}
          error={errors.card}
          placeholder="4111 1111 1111 1111"
          inputMode="numeric"
          autoComplete="cc-number"
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Expiración"
            value={fields.expiry}
            onChange={(v) => {
              const d = digits(v).slice(0, 4);
              set("expiry")(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
            }}
            error={errors.expiry}
            placeholder="MM/AA"
            inputMode="numeric"
            autoComplete="cc-exp"
          />
          <Field
            label="CVC"
            value={fields.cvc}
            onChange={(v) => set("cvc")(digits(v).slice(0, 4))}
            error={errors.cvc}
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
          />
        </div>
        <Field
          label="Dirección de entrega"
          value={fields.address}
          onChange={set("address")}
          error={errors.address}
          placeholder="Av. Rotaria, Cumaná 6101, Sucre"
          autoComplete="street-address"
        />
      </div>

      <div className="mt-6 space-y-1 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{currency(finalPrice)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Envío asegurado</span>
          <span>{currency(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 font-display text-lg">
          <span>Total</span>
          <span className="text-gilded">{currency(total)}</span>
        </div>
      </div>

      <button type="submit" className="btn-lux mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? "Procesando pago…" : status === "declined" ? "Reintentar pago" : "Pagar ahora"}
      </button>
      <p className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
        Demostración · una tarjeta terminada en 0000 simula un rechazo
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={`input-lux ${error ? "input-error" : ""}`}
      />
      {error && <span className="mt-1.5 block text-xs text-crimson">{error}</span>}
    </label>
  );
}