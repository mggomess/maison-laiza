import { products } from "../../data";
import type { Metadata } from "next";

const labels: Record<string, string> = {
  novidades: "Novidades",
  vestidos: "Vestidos",
  conjuntos: "Conjuntos",
  blusas: "Blusas",
  saias: "Saias",
  calcas: "Calças",
  promocoes: "Promoções",
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const title = labels[category] ?? "Coleção";
  return { title: `${title} | Maison Laiza`, description: `Explore ${title.toLowerCase()} e novidades da Maison Laiza.` };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const title = labels[category] ?? "Coleção";
  const matches = products.filter((product) => product.category.toLowerCase() === title.toLowerCase());
  const visible = matches.length ? matches : products;

  return <main className="catalog-page">
    <header className="sub-header"><a className="wordmark" href="/"><img className="official-logo" src="/images/logo-maison-laiza-transparent.png" alt="Maison Laiza" /></a><nav><a href="/catalogo/novidades">NOVIDADES</a><a href="/catalogo/vestidos">VESTIDOS</a><a href="/catalogo/conjuntos">CONJUNTOS</a><a href="/catalogo/blusas">BLUSAS</a></nav><a href="/">VOLTAR À MAISON</a></header>
    <section className="catalog-hero"><p className="eyebrow">CURADORIA MAISON</p><h1>{title}</h1><p>Formas femininas, tons atemporais e peças selecionadas para acompanhar seus melhores momentos.</p></section>
    <div className="catalog-toolbar"><button>FILTROS +</button><span>{visible.length} PEÇAS NA PRÉVIA</span><label>ORDENAR POR <select aria-label="Ordenar produtos"><option>Mais recentes</option><option>Mais vendidos</option></select></label></div>
    <section className="catalog-grid">
      {visible.concat(visible).map((product, index) => <a className="catalog-product" href={`/produto/${product.slug}`} key={`${product.id}-${index}`}><div><img src={product.image} alt={product.name} />{product.badge && <span>{product.badge}</span>}</div><p>{product.category}</p><h2>{product.name}</h2><small>VALOR SOB CONSULTA</small></a>)}
    </section>
    <footer className="catalog-footer"><a href="/">← VOLTAR PARA A HOME</a><span>MAISON LAIZA · AREIA BRANCA</span></footer>
  </main>;
}
