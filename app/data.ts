export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  secondaryImage: string;
  tone: string;
  sizes: string[];
  badge?: string;
};

export const products: Product[] = [
  { id: 1, slug: "look-renda-vinho", name: "Look Renda Vinho", category: "Conjuntos", image: "/images/feed-look-renda.webp", secondaryImage: "/images/feed-look-renda.webp", tone: "Vinho & branco", sizes: ["P", "M", "G"], badge: "NOVO" },
  { id: 2, slug: "vestido-branco-curadoria", name: "Vestido Branco Curadoria", category: "Vestidos", image: "/images/feed-vestido-branco.webp", secondaryImage: "/images/feed-vestido-branco.webp", tone: "Branco", sizes: ["PP", "P", "M", "G"] },
  { id: 3, slug: "conjunto-amarelo-curadoria", name: "Conjunto Amarelo Curadoria", category: "Conjuntos", image: "/images/feed-conjunto-amarelo.webp", secondaryImage: "/images/feed-conjunto-amarelo.webp", tone: "Amarelo", sizes: ["P", "M", "G"], badge: "DESTAQUE" },
  { id: 4, slug: "vestidos-inspo-maison", name: "Vestidos Inspo Maison", category: "Vestidos", image: "/images/feed-inspo-looks.webp", secondaryImage: "/images/feed-inspo-looks.webp", tone: "Cores selecionadas", sizes: ["P", "M", "G", "GG"] },
];

export const categories = [
  { name: "Vestidos", image: "/images/feed-vestido-branco.webp", href: "/catalogo/vestidos" },
  { name: "Conjuntos", image: "/images/feed-look-renda.webp", href: "/catalogo/conjuntos" },
  { name: "Novidades", image: "/images/feed-conjunto-amarelo.webp", href: "/catalogo/novidades" },
];
