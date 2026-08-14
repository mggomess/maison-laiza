"use client";

import { useEffect, useState } from "react";
import { categories, products, type Product } from "./data";

const announcements = [
  "NOVIDADES TODA SEMANA",
  "COMPRE ONLINE",
  `WHATSAPP · ${process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+55 87 8102-6402"}`,
  "MAISON LAIZA — MODA FEMININA",
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "558781026402";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+55 87 8102-6402";
const STORE_CITY = process.env.NEXT_PUBLIC_STORE_CITY || "Areia Branca";
const STORE_ADDRESS = process.env.NEXT_PUBLIC_STORE_ADDRESS || "Avenida São Francisco";
const STORE_REFERENCE = process.env.NEXT_PUBLIC_STORE_REFERENCE || "Ao lado do 777 Sushi";
const MAPS_QUERY =
  process.env.NEXT_PUBLIC_MAPS_QUERY ||
  "Maison Laiza Avenida São Francisco ao lado do 777 Sushi Areia Branca";
const whatsappLink = (message: string) =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : "https://www.instagram.com/lojamaisonlaiza/";

export default function Storefront() {
  const [announcement, setAnnouncement] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setAnnouncement((current) => (current + 1) % announcements.length),
      3500,
    );
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || quickView || cartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, quickView, cartOpen]);

  const addToCart = (product: Product) => {
    setCart((items) => [...items, product]);
    setQuickView(null);
    setCartOpen(true);
  };

  return (
    <main>
      <div className="announcement" aria-live="polite">
        <span>{announcements[announcement]}</span><i aria-hidden="true" /><span>{STORE_CITY.toUpperCase()}</span>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><span /><span /></button>
        <a className="wordmark" href="#inicio" aria-label="Maison Laiza — início">
          <img className="official-logo" src="/images/logo-maison-laiza-transparent.png" alt="Maison Laiza" />
        </a>
        <nav aria-label="Menu principal">
          <a href="#novidades">Novidades</a><a href="/catalogo/vestidos">Vestidos</a><a href="/catalogo/conjuntos">Conjuntos</a><a href="/catalogo/blusas">Blusas</a><a href="#colecoes">Coleções</a><a href="#sobre">A Maison</a>
        </nav>
        <div className="header-actions">
          <a href="#novidades" aria-label="Buscar produtos">BUSCAR</a>
          <button onClick={() => setCartOpen(true)} aria-label={`Abrir sacola com ${cart.length} itens`}>SACOLA <b>{cart.length}</b></button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <img src="/images/maison-hero.jpg" alt="Editorial Maison Laiza em tons terrosos" />
        <div className="hero-shade" />
        <div className="hero-copy reveal">
          <p className="eyebrow light">NOVA COLEÇÃO · 2026</p>
          <h1>Elegância para viver<br />todos os seus momentos.</h1>
          <p>Uma curadoria feminina para vestir confiança, leveza e personalidade.</p>
          <div className="hero-ctas"><a className="button button-light" href="#novidades">VER NOVIDADES</a><a className="text-link light" href="#colecoes">DESCOBRIR A COLEÇÃO <span>↗</span></a></div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>04</span></div>
        <a className="scroll-cue" href="#categorias">DESCUBRA <span>↓</span></a>
      </section>

      <section className="intro section-pad" id="categorias">
        <p className="eyebrow">CURADORIA MAISON</p>
        <h2>Peças que contam<br />a sua história.</h2>
        <p className="intro-text">Entre formas femininas, tecidos leves e uma paleta atemporal, descubra looks pensados para acompanhar você.</p>
      </section>

      <section className="category-grid" aria-label="Categorias em destaque">
        {categories.map((category, index) => (
          <a className={`category-card category-${index + 1}`} href={category.href} key={category.name}>
            <img src={category.image} alt={`Coleção de ${category.name.toLowerCase()}`} loading="lazy" />
            <span className="category-number">0{index + 1}</span>
            <div><h3>{category.name}</h3><span>EXPLORAR COLEÇÃO →</span></div>
          </a>
        ))}
      </section>

      <section className="products-section section-pad" id="novidades">
        <div className="section-heading">
          <div><p className="eyebrow">ACABOU DE CHEGAR</p><h2>Novidades Maison Laiza</h2></div>
          <p>Prévia editorial. Valores e disponibilidade devem ser confirmados com a loja.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <button className="product-image" onClick={() => setQuickView(product)} aria-label={`Ver ${product.name}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && <span className="badge">{product.badge}</span>}<span className="quick-label">VER PRODUTO</span>
              </button>
              <div className="product-info"><div><p>{product.category}</p><h3>{product.name}</h3><span>Consulte disponibilidade</span></div><button aria-label={`Favoritar ${product.name}`}>♡</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="campaign-split" id="colecoes">
        <div className="campaign-image"><img src="/images/feed-vestido-branco.webp" alt="Vestido branco e acessórios Maison Laiza" loading="lazy" /><span>FEED OFICIAL</span></div>
        <div className="campaign-copy">
          <p className="eyebrow">NEW COLLECTION</p>
          <h2>Vista o que faz<br />você se sentir<br /><em>incrível.</em></h2>
          <p>Uma seleção que combina formas precisas, tons naturais e a elegância descomplicada que transforma cada momento.</p>
          <a className="line-link" href="/catalogo/novidades">DESCOBRIR A COLEÇÃO <span>→</span></a>
        </div>
      </section>

      <section className="best-sellers section-pad">
        <div className="section-heading"><div><p className="eyebrow">BEST SELLERS</p><h2>Os favoritos delas</h2></div><a className="line-link" href="/catalogo/vestidos">VER TODOS <span>→</span></a></div>
        <div className="best-layout">
          <a className="best-main" href="/produto/look-renda-vinho"><img src="/images/feed-look-renda.webp" alt="Look Maison Laiza em renda vinho e saia branca" loading="lazy" /><div><p>LOOK DA SEMANA</p><h3>Renda, textura e uma produção marcante.</h3><span>DESCOBRIR →</span></div></a>
          <div className="best-side">
            {products.slice(0, 3).map((product) => <a href={`/produto/${product.slug}`} key={product.id}><img src={product.image} alt={product.name} loading="lazy" /><div><span>{product.category}</span><h3>{product.name}</h3><p>CONSULTAR DISPONIBILIDADE</p></div><b>↗</b></a>)}
          </div>
        </div>
      </section>

      <section className="shop-look">
        <div className="shop-photo"><img src="/images/feed-conjunto-amarelo.webp" alt="Conjunto amarelo Maison Laiza" loading="lazy" /><button className="look-dot dot-one" aria-label="Ver parte superior">+</button><button className="look-dot dot-two" aria-label="Ver parte inferior">+</button></div>
        <div className="shop-copy"><p className="eyebrow">SHOP THE LOOK</p><h2>Uma cor.<br />Infinitas possibilidades.</h2><p>Leve, feminino e cheio de personalidade. Descubra a seleção publicada no Instagram da Maison.</p><div className="look-items"><a href="/produto/conjunto-amarelo-curadoria"><span>01</span><div><small>LOOK COMPLETO</small><strong>Conjunto Amarelo Curadoria</strong></div><b>→</b></a><a href="https://www.instagram.com/lojamaisonlaiza/p/DbyM6V-xrBH/"><span>02</span><div><small>PUBLICAÇÃO OFICIAL</small><strong>Ver detalhes no Instagram</strong></div><b>↗</b></a></div></div>
      </section>

      <section className="editorial-banner">
        <img src="/images/maison-black.jpg" alt="Campanha editorial Maison Laiza" loading="lazy" />
        <div><p className="eyebrow light">MAISON EDIT · 2026</p><h2>Sua próxima peça<br />favorita está aqui.</h2><a className="button button-light" href="/catalogo/novidades">DESCOBRIR</a></div>
      </section>

      <section className="instagram-section section-pad">
        <div className="insta-heading"><p className="eyebrow">@LOJAMAISONLAIZA</p><h2>Acompanhe a Maison</h2><a className="line-link" href="https://www.instagram.com/lojamaisonlaiza/">SEGUIR NO INSTAGRAM ↗</a></div>
        <div className="insta-grid">
          <a href="https://www.instagram.com/lojamaisonlaiza/p/Db--6CTRIE2/"><img src="/images/feed-look-renda.webp" alt="Look com renda vinho publicado pela Maison Laiza" loading="lazy" /><span>VER NO INSTAGRAM ↗</span></a>
          <a href="https://www.instagram.com/lojamaisonlaiza/p/DbyJavSRzfw/"><img src="/images/feed-vestido-branco.webp" alt="Vestido branco e acessórios publicados pela Maison Laiza" loading="lazy" /><span>VER NO INSTAGRAM ↗</span></a>
          <a href="https://www.instagram.com/lojamaisonlaiza/p/DbyM6V-xrBH/"><img src="/images/feed-conjunto-amarelo.webp" alt="Conjunto amarelo publicado pela Maison Laiza" loading="lazy" /><span>VER NO INSTAGRAM ↗</span></a>
          <a href="https://www.instagram.com/lojamaisonlaiza/p/DbyOqorRzDA/"><img src="/images/feed-inspo-looks.webp" alt="Inspiração de looks publicada pela Maison Laiza" loading="lazy" /><span>VER NO INSTAGRAM ↗</span></a>
        </div>
        <p className="image-note">Fotos do feed oficial da Maison Laiza.</p>
      </section>

      <section className="about-section" id="sobre">
        <div className="about-image"><img src="/images/maison-hero.jpg" alt="Universo Maison Laiza" loading="lazy" /><span>MAISON / LAIZA</span></div>
        <div className="about-copy"><p className="eyebrow">SOBRE NÓS</p><h2>Muito mais<br />que vestir.</h2><p>A Maison Laiza acompanha mulheres que enxergam a moda como uma forma de expressar personalidade. Nossa curadoria reúne peças femininas atuais, elegantes e versáteis para diferentes momentos da vida.</p><p>Da escolha de cada coleção ao atendimento, buscamos oferecer uma experiência próxima, especial e cheia de estilo.</p><a className="line-link" href="https://www.instagram.com/lojamaisonlaiza/">CONHEÇA NOSSA HISTÓRIA <span>↗</span></a></div>
      </section>

      <section className="store-section section-pad" id="loja">
        <div className="store-title"><p className="eyebrow">VENHA NOS VISITAR</p><h2>Maison Laiza<br /><em>{STORE_CITY}</em></h2></div>
        <div className="store-details"><div><small>ENDEREÇO</small><p>{STORE_ADDRESS}<br />Loja Maison Laiza</p>{STORE_REFERENCE && <span>{STORE_REFERENCE} · {STORE_CITY}.</span>}</div><div><small>WHATSAPP &amp; VENDAS</small><p>{WHATSAPP_NUMBER ? <a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a> : <a href="https://www.instagram.com/lojamaisonlaiza/">{PHONE_DISPLAY}</a>}</p><span>Loja física &amp; atendimento online.</span></div><a className="button button-dark" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`}>COMO CHEGAR ↗</a><a className="button button-outline" href={whatsappLink("Olá, Maison Laiza! Gostaria de atendimento.")}>CHAMAR NO WHATSAPP</a></div>
      </section>

      <section className="benefits"><div><span>01</span><h3>Atendimento personalizado</h3><p>Uma experiência próxima em cada compra.</p></div><div><span>02</span><h3>Curadoria feminina</h3><p>Peças escolhidas para diferentes momentos.</p></div><div><span>03</span><h3>Novidades frequentes</h3><p>Novas peças e coleções ao longo da temporada.</p></div><div><span>04</span><h3>Loja física &amp; online</h3><p>Escolha como prefere comprar.</p></div></section>

      <section className="newsletter"><div><p className="eyebrow">MAISON CLUB</p><h2>Seja a primeira<br />a saber.</h2></div><form onSubmit={(event) => event.preventDefault()}><label htmlFor="email">Receba novidades, lançamentos e condições especiais.</label><div><input id="email" type="email" placeholder="SEU MELHOR E-MAIL" aria-label="Seu melhor e-mail" /><button type="submit">QUERO RECEBER →</button></div></form></section>

      <footer>
        <div className="footer-brand"><div className="wordmark footer-logo"><img className="official-logo" src="/images/logo-maison-laiza-transparent.png" alt="Maison Laiza" /></div><p>Seu estilo. Sua Maison.</p></div>
        <div className="footer-links"><div><strong>INSTITUCIONAL</strong><a href="#sobre">Sobre</a><a href="#loja">Loja física</a><a href={whatsappLink("Olá, Maison Laiza! Gostaria de atendimento.")}>WhatsApp</a></div><div><strong>AJUDA</strong><a href={whatsappLink("Olá! Gostaria de informações sobre trocas e devoluções.")}>Trocas e devoluções</a><a href={whatsappLink("Olá! Gostaria de informações sobre envios.")}>Envios</a><a href="/catalogo/novidades">Guia de tamanhos</a></div><div><strong>COMPRE</strong><a href="/catalogo/novidades">Novidades</a><a href="/catalogo/vestidos">Vestidos</a><a href="/catalogo/conjuntos">Conjuntos</a><a href="/catalogo/blusas">Blusas</a></div><div><strong>CONTATO</strong>{WHATSAPP_NUMBER ? <a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a> : <a href="https://www.instagram.com/lojamaisonlaiza/">{PHONE_DISPLAY}</a>}<a href="https://www.instagram.com/lojamaisonlaiza/">Instagram ↗</a></div></div>
        <div className="footer-bottom"><span>© 2026 MAISON LAIZA — TODOS OS DIREITOS RESERVADOS.</span><span>DESENVOLVIDO POR MG</span></div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappLink("Olá, Maison Laiza! Gostaria de atendimento.")}
        aria-label="Falar com a Maison Laiza pelo WhatsApp"
      >
        <span>FALAR COM A MAISON</span>
        <WhatsAppIcon />
      </a>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={() => addToCart(quickView)} />}

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <button className="close" onClick={() => setCartOpen(false)} aria-label="Fechar sacola">FECHAR ×</button>
        <p className="eyebrow">SELEÇÃO MAISON</p><h2>Sua sacola <sup>{cart.length}</sup></h2>
        <div className="cart-items">
          {cart.length === 0 ? <p className="empty-cart">Sua sacola está vazia.<br />Descubra sua próxima peça favorita.</p> : cart.map((product, index) => (
            <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>{product.tone} · tamanho a escolher</span><button onClick={() => setCart((items) => items.filter((_, i) => i !== index))}>REMOVER</button></div></div>
          ))}
        </div>
        {cart.length > 0 && <a className="button button-dark full" href={whatsappLink(`Olá, Maison Laiza! Gostaria de finalizar meu pedido:\n\n${cart.map((item) => `• ${item.name} — ${item.tone}`).join("\n")}\n\nPodem confirmar tamanhos, valores e disponibilidade?`)}>FINALIZAR PELO WHATSAPP</a>}
        <button className="text-link" onClick={() => setCartOpen(false)}>CONTINUAR COMPRANDO</button>
      </aside>
      {cartOpen && <button className="drawer-backdrop" aria-label="Fechar sacola" onClick={() => setCartOpen(false)} />}
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      className="whatsapp-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 017.021 2.91 9.83 9.83 0 012.9 7.019c-.003 5.45-4.437 9.884-9.925 9.884m8.413-18.297A11.82 11.82 0 0012.055 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.9 11.9 0 005.69 1.448h.005c6.558 0 11.893-5.335 11.896-11.893a11.82 11.82 0 00-3.488-8.413Z" />
    </svg>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const items = ["Novidades", "Vestidos", "Conjuntos", "Blusas", "Calças", "Saias", "Coleções", "Promoções"];
  return <div className="mobile-menu overlay-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <button className="close" onClick={onClose} aria-label="Fechar menu">FECHAR ×</button><div className="menu-brand"><img src="/images/logo-maison-laiza-transparent.png" alt="Maison Laiza" /></div>
    <nav>{items.map((item, index) => <a href={index === 0 ? "#novidades" : `/catalogo/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} onClick={onClose} key={item}><small>0{index + 1}</small>{item}<span>→</span></a>)}</nav>
    <div className="menu-footer"><a href="#sobre" onClick={onClose}>SOBRE</a><a href="#loja" onClick={onClose}>LOJA FÍSICA</a><a href="https://www.instagram.com/lojamaisonlaiza/">INSTAGRAM ↗</a></div>
  </div>;
}

function QuickView({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="quick-view" role="dialog" aria-modal="true" aria-label={`Detalhes de ${product.name}`} onMouseDown={(event) => event.stopPropagation()}>
    <button className="close" onClick={onClose} aria-label="Fechar visualização">×</button><img src={product.image} alt={product.name} />
    <div className="quick-copy"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p className="availability">Preço e disponibilidade sob consulta</p><label>ESCOLHA O TAMANHO</label><div className="sizes">{product.sizes.map((size) => <button key={size}>{size}</button>)}</div><button className="button button-dark full" onClick={onAdd}>ADICIONAR À SACOLA</button><a className="button button-outline full" href={whatsappLink(`Olá, Maison Laiza! Gostaria de saber mais sobre ${product.name}, cor ${product.tone}.`)}>COMPRAR PELO WHATSAPP</a></div>
  </div></div>;
}
