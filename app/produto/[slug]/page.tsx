import { products } from "../../data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug) ?? products[0];
  return { title: `${product.name} | Maison Laiza`, description: `Conheça ${product.name} na curadoria Maison Laiza.` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const message = encodeURIComponent(`Olá, Maison Laiza! Gostaria de saber mais sobre ${product.name}, cor ${product.tone}. Podem confirmar valor, tamanhos e disponibilidade?`);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "558781026402";
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${message}`
    : "https://www.instagram.com/lojamaisonlaiza/";
  return <main className="product-page">
    <header className="sub-header"><a className="wordmark" href="/"><img className="official-logo" src="/images/logo-maison-laiza-transparent.png" alt="Maison Laiza" /></a><nav><a href="/catalogo/novidades">NOVIDADES</a><a href="/catalogo/vestidos">VESTIDOS</a><a href="/catalogo/conjuntos">CONJUNTOS</a></nav><a href="/catalogo/novidades">VOLTAR AO CATÁLOGO</a></header>
    <section className="product-detail">
      <div className="product-gallery"><img src={product.image} alt={product.name} /><img src={product.secondaryImage} alt={`Detalhe de ${product.name}`} /></div>
      <div className="product-summary"><p className="eyebrow">{product.category} · FEED MAISON LAIZA</p><h1>{product.name}</h1><p className="product-price">Preço sob consulta</p><p className="product-description">Peça publicada no perfil oficial da Maison Laiza. Consulte cores, composição, modelagem, valores e disponibilidade diretamente com a loja.</p><label>ESCOLHA O TAMANHO</label><div className="sizes">{product.sizes.map((size) => <button key={size}>{size}</button>)}</div><p className="size-help">Ficou em dúvida sobre o tamanho? <a href={whatsappUrl}>Fale com uma consultora Maison Laiza.</a></p><a className="button button-dark full" href={whatsappUrl}>COMPRAR PELO WHATSAPP</a><div className="product-accordions"><details open><summary>DESCRIÇÃO <span>+</span></summary><p>Confirme os detalhes desta peça com a equipe pelo WhatsApp.</p></details><details><summary>COMPOSIÇÃO &amp; CUIDADOS <span>+</span></summary><p>Consulte a etiqueta e a equipe Maison Laiza.</p></details><details><summary>TROCAS <span>+</span></summary><p>Consulte a política vigente diretamente com a loja.</p></details></div></div>
    </section>
    <section className="related"><p className="eyebrow">VOCÊ TAMBÉM VAI AMAR</p><h2>Complete sua seleção</h2><div>{products.filter((item) => item.id !== product.id).slice(0,3).map((item) => <a href={`/produto/${item.slug}`} key={item.id}><img src={item.image} alt={item.name} /><h3>{item.name}</h3><span>VER PEÇA →</span></a>)}</div></section>
  </main>;
}
