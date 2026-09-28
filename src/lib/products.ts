export type Product = {
  id: string;
  name: string;
  brand: string;
  type: "Whisky" | "Ron" | "Vodka" | "Vino" | "Tequila" | "Ginebra" | "Coñac";
  origin: string;
  price: number;
  abv: number;
  volume: string;
  stock: number;
  stockTotal: number;
  rating: number;
  description: string;
  tasting: string[];
  wholesale?: {
    lote10: number;
    lote20: number;
    lote50: number;
    lote100: number;
  };
};

export const PRODUCT_TYPES = [
  "Whisky",
  "Ron",
  "Vodka",
  "Vino",
  "Tequila",
  "Ginebra",
  "Coñac",
] as const;

export const products: Product[] = [
  {
    id: "macallan-18",
    name: "Reserva 18 Años Sherry Oak",
    brand: "The Macallan",
    type: "Whisky",
    origin: "Speyside, Escocia",
    price: 647,
    abv: 43,
    volume: "700 ml",
    stock: 10,
    stockTotal: 15,
    rating: 5,
    description:
      "Madurado durante dieciocho años en barricas de roble europeo curadas con jerez oloroso. Un destilado de color caoba profundo, con una textura sedosa y un final prolongado que define la elegancia del Speyside.",
    tasting: ["Pasas al jerez", "Jengibre confitado", "Roble especiado", "Chocolate amargo"],
    wholesale: {
      lote10: 4200,
      lote20: 8000,
      lote50: 19000,
      lote100: 36000,
    },
  },
  {
    id: "zacapa-xo",
    name: "Solera Gran Reserva XO",
    brand: "Zacapa",
    type: "Ron",
    origin: "Guatemala",
    price: 215,
    abv: 40,
    volume: "750 ml",
    stock: 9,
    stockTotal: 30,
    rating: 5,
    description:
      "Añejado en las tierras altas guatemaltecas mediante el sistema de solera, con un acabado final en barricas de coñac francés. Dulzor sereno y cuerpo aterciopelado.",
    tasting: ["Miel de caña", "Vainilla tostada", "Nuez moscada", "Cacao"],
    wholesale: {
      lote10: 1850,
      lote20: 3500,
      lote50: 8400,
      lote100: 21000,
    },
  },
  {
    id: "beluga-gold",
    name: "Gold Line",
    brand: "Beluga",
    type: "Vodka",
    origin: "Siberia, Rusia",
    price: 320,
    abv: 40,
    volume: "700 ml",
    stock: 12,
    stockTotal: 40,
    rating: 4,
    description:
      "Triple filtrado y reposado noventa días antes del embotellado manual. Cristalino, de una pureza glacial y un paladar notablemente limpio.",
    tasting: ["Grano dulce", "Mineral fresco", "Crema ligera", "Final seco"],
    wholesale: {
      lote10: 2750,
      lote20: 5200,
      lote50: 12500,
      lote100: 24000,
    },
  },
  {
    id: "vega-sicilia-unico",
    name: "Único Gran Reserva",
    brand: "Vega Sicilia",
    type: "Vino",
    origin: "Ribera del Duero, España",
    price: 540,
    abv: 14,
    volume: "750 ml",
    stock: 2,
    stockTotal: 18,
    rating: 5,
    description:
      "Tempranillo de viñedos históricos con una crianza extensa entre roble y botella. Un tinto de estructura solemne, ideal para guarda prolongada.",
    tasting: ["Fruta negra madura", "Cuero", "Tabaco dulce", "Balsámicos"],
    wholesale: {
      lote10: 4650,
      lote20: 8900,
      lote50: 21000,
      lote100: 40000,
    },
  },
  {
    id: "clase-azul-reposado",
    name: "Reposado Decantador",
    brand: "Clase Azul",
    type: "Tequila",
    origin: "Jalisco, México",
    price: 275,
    abv: 40,
    volume: "750 ml",
    stock: 6,
    stockTotal: 25,
    rating: 5,
    description:
      "Agave azul cocido lentamente y reposado ocho meses en roble americano, presentado en un decantador de cerámica pintado a mano.",
    tasting: ["Agave cocido", "Caramelo", "Canela", "Madera suave"],
    wholesale: {
      lote10: 2350,
      lote20: 4500,
      lote50: 10800,
      lote100: 20500,
    },
  },
  {
    id: "monkey-47",
    name: "Schwarzwald Dry Gin",
    brand: "Monkey 47",
    type: "Ginebra",
    origin: "Selva Negra, Alemania",
    price: 78,
    abv: 47,
    volume: "500 ml",
    stock: 18,
    stockTotal: 50,
    rating: 4,
    description:
      "Cuarenta y siete botánicos, entre ellos arándano rojo silvestre de la Selva Negra, destilados en pequeños lotes y macerados durante tres meses.",
    tasting: ["Enebro intenso", "Arándano rojo", "Cítricos", "Pimienta"],
    wholesale: {
      lote10: 670,
      lote20: 1280,
      lote50: 3100,
      lote100: 6000,
    },
  },
  {
    id: "hennessy-paradis",
    name: "Paradis Impérial",
    brand: "Hennessy",
    type: "Coñac",
    origin: "Cognac, Francia",
    price: 1290,
    abv: 40,
    volume: "700 ml",
    stock: 1,
    stockTotal: 10,
    rating: 5,
    description:
      "Un ensamblaje excepcional seleccionado entre miles de eaux-de-vie. Delicadeza floral extrema y una persistencia aromática casi infinita.",
    tasting: ["Flor de azahar", "Miel clara", "Almendra", "Seda mineral"],
    wholesale: {
      lote10: 11000,
      lote20: 21000,
      lote50: 50000,
      lote100: 95000,
    },
  },
  {
    id: "yamazaki-12",
    name: "Single Malt 12 Años",
    brand: "Yamazaki",
    type: "Whisky",
    origin: "Osaka, Japón",
    price: 265,
    abv: 43,
    volume: "700 ml",
    stock: 4,
    stockTotal: 20,
    rating: 5,
    description:
      "El single malt fundacional de Japón, madurado en roble americano, español y mizunara. Precisión aromática y equilibrio impecable.",
    tasting: ["Melocotón", "Coco", "Incienso", "Mizunara"],
    wholesale: {
      lote10: 2280,
      lote20: 4350,
      lote50: 10400,
      lote100: 20000,
    },
  },
  {
    id: "diplomatico-reserva",
    name: "Reserva Exclusiva",
    brand: "Diplomático",
    type: "Ron",
    origin: "Venezuela",
    price: 62,
    abv: 40,
    volume: "700 ml",
    stock: 22,
    stockTotal: 60,
    rating: 4,
    description:
      "Mezcla de rones de hasta doce años con melaza y caña virgen, destilada en alambiques de cobre. Un clásico venezolano de cuerpo generoso.",
    tasting: ["Toffee", "Naranja confitada", "Regaliz", "Roble dulce"],
    wholesale: {
      lote10: 530,
      lote20: 1000,
      lote50: 2400,
      lote100: 4700,
    },
  },
  {
    id: "dom-perignon-vintage",
    name: "Vintage Brut",
    brand: "Dom Pérignon",
    type: "Vino",
    origin: "Champagne, Francia",
    price: 410,
    abv: 12.5,
    volume: "750 ml",
    stock: 5,
    stockTotal: 22,
    rating: 5,
    description:
      "Champagne de una sola cosecha con ocho años sobre lías. Burbuja fina, tensión salina y una madurez luminosa.",
    tasting: ["Cítrico blanco", "Brioche", "Almendra tostada", "Yodo"],
    wholesale: {
      lote10: 3500,
      lote20: 6700,
      lote50: 16000,
      lote100: 31000,
    },
  },
  {
    id: "grey-goose-vx",
    name: "VX Vodka",
    brand: "Grey Goose",
    type: "Vodka",
    origin: "Picardía, Francia",
    price: 98,
    abv: 40,
    volume: "750 ml",
    stock: 14,
    stockTotal: 45,
    rating: 4,
    description:
      "Vodka de trigo invernal francés enriquecido con una fracción de coñac, para un paladar redondo y sorprendentemente aromático.",
    tasting: ["Uva blanca", "Pan de trigo", "Flor blanca", "Final cremoso"],
    wholesale: {
      lote10: 840,
      lote20: 1600,
      lote50: 3800,
      lote100: 7400,
    },
  },
  {
    id: "hibiki-harmony",
    name: "Harmony Blended",
    brand: "Hibiki",
    type: "Whisky",
    origin: "Japón",
    price: 175,
    abv: 43,
    volume: "700 ml",
    stock: 7,
    stockTotal: 28,
    rating: 5,
    description:
      "Ensamblaje de maltas y grano de tres destilerías japonesas, en una botella de veinticuatro facetas que evoca las estaciones del año.",
    tasting: ["Miel de flores", "Naranja", "Sándalo", "Mizunara ligero"],
    wholesale: {
      lote10: 1500,
      lote20: 2850,
      lote50: 6900,
      lote100: 13200,
    },
  },
];

export const currency = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    value,
  );