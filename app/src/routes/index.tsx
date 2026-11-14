import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";

// ScrollScrub remains available for a future cinematic film once its real clips are ready.
export const Route = createFileRoute("/")({
  component: Index,
});

type Product = { name: string; detail?: string; price: string; category: string; image: string; featured?: boolean };
type CartItem = { product: Product; quantity: number };

function priceValue(price: string) { const amount = price.match(/\$([\d.]+)/)?.[1]; return amount ? Number(amount.replace(/\./g, "")) : 0; }
function formatCOP(value: number) { return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value); }

const products: Product[] = [
  // Colección especial — fotografías individuales extraídas del catálogo original.
  { name: "Búho mágico", detail: "Adorno temático para los fans del mundo mágico.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/a1310cc8-86b0-4d14-94d2-436ca9284cea.jpg" },
  { name: "Mago de cabello largo", detail: "Figura decorativa inspirada en la magia.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/33c800f1-b07e-432b-b724-94b4820a21f6.jpg" },
  { name: "Mago de bigote", detail: "Adorno de personaje en relieve.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/fa2831fb-239d-4c5f-99a2-882d996f5fc5.jpg" },
  { name: "Joven mago", detail: "Figura con varita mágica.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/d16d0c23-feaa-4335-a825-194ff8f61595.jpg" },
  { name: "Retrato mágico", detail: "Adorno circular de personaje.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/d01845f2-3ac8-45f5-bee7-938f9705ec07.jpg" },
  { name: "Escudo de Hogwarts", detail: "Adorno con escudo y emblemas.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/266cd3d2-0b14-4bb0-9ad0-33b155a81267.jpg" },
  { name: "Tren mágico", detail: "Adorno temático del tren.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/655b05cc-4fdb-4444-9da6-67b750757420.jpg" },
  { name: "Escoba voladora", detail: "Adorno colgante.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/93e8f513-b5a0-414b-a4ef-bce993a8d55b.jpg" },
  { name: "Snitch dorada", detail: "Adorno con alas.", price: "$7.500 unidad", category: "Colección mágica", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/eb51a803-2bb5-40c3-979e-e93bfb0d4dfc.jpg" },
  // Adornos para el árbol.
  { name: "Adornos clásicos", detail: "6 cm. Disponibles en blanco, rojo, verde oscuro y rosado. Media docena: $30.000.", price: "$6.000 unidad", category: "Adornos navideños", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/9a802626-6b66-4587-95a7-1f7f61467edc.jpg", featured: true },
  { name: "Moño decorativo", detail: "Adorno para árbol de 15 cm. Media docena: $42.000.", price: "$8.000 unidad", category: "Adornos navideños", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/870bb555-6e8f-41f0-891b-d89edebf4b13.jpg" },
  { name: "Estrella colgante", detail: "Diseño con textura en relieve. Media docena: $25.000.", price: "$5.000 unidad", category: "Adornos navideños", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/fefcd2e1-7f33-47d3-9dab-218a7f8cefc6.jpg" },
  { name: "Bolas de Navidad", detail: "Media docena en rojo, verde y rosado.", price: "$35.000 media docena", category: "Adornos navideños", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/6334f646-fe01-4497-b917-ca3f6f1d0643.jpg" },
  { name: "Adornos variados para el árbol", detail: "Diseños surtidos de 6 cm. Elige tus favoritos. Disponibles en blanco, rojo, verde oscuro y rosado. Media docena: $30.000.", price: "$6.000 unidad", category: "Adornos navideños", image: "/assets/products/adornos-variados.webp", featured: true },
  { name: "Adorno personalizado", detail: "Diseño circular con nombre en relieve. Media docena: $35.000.", price: "$35.000 media docena", category: "Personalizados", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/aaf76267-b43a-44c3-8436-8f1b9818c993.jpg", featured: true },
  { name: "Adorno con copos de nieve", detail: "Diseño personalizado con nombre y copos. Media docena: $45.000.", price: "$45.000 media docena", category: "Personalizados", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/5041458e-c039-471d-80d6-128e19bc0b9c.jpg" },
  // Figuras y decoración.
  { name: "Reno decorativo", detail: "Figura de 20 cm, doble color. Consulta combinaciones.", price: "$45.000", category: "Figuras navideñas", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/4458d0ab-599c-4ea2-9eb2-12099e88e79e.jpg", featured: true },
  { name: "Reno doble color", detail: "Diseño navideño de 20 cm. Pregunta por colores.", price: "$45.000", category: "Figuras navideñas", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/0e5c815e-83a8-49b0-9636-42edba12722c.jpg" },
  { name: "Pareja de renos", detail: "Figuras decorativas de 15 cm.", price: "$50.000 la pareja", category: "Figuras navideñas", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/804c30f9-5c3a-45e0-96b9-98265601b12b.jpg" },
  { name: "Reno sentado", detail: "Figura decorativa de 25 cm.", price: "$45.000", category: "Figuras navideñas", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/e1dee147-3c00-42dc-bcc1-5bf2bbf6f540.jpg" },
  { name: "Portavasos copo de nieve", detail: "Set de portavasos con soporte.", price: "$55.000", category: "Figuras navideñas", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/862e07e4-e113-4b33-b9ef-905cc53e35da.jpg" },
  { name: "Pesebre minimalista", detail: "Diseño decorativo de la Sagrada Familia.", price: "$30.000", category: "Pesebres", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/7c64e665-d53c-42ed-b098-8686fb1a211c.jpg" },
  { name: "Pesebre de 8 piezas", detail: "8 figuras de 8 cm de alto, pintadas a mano.", price: "$150.000 el juego completo", category: "Pesebres", image: "https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/866ac85a-cbce-4f9b-a405-b868468c5604.jpg", featured: true },
];

const categories = ["Todos", "Adornos navideños", "Personalizados", "Figuras navideñas", "Pesebres", "Colección mágica"];
const whatsappBase = "https://wa.me/573015826473";

function Index() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [notes, setNotes] = useState("");
  const filtered = useMemo(() => activeCategory === "Todos" ? products : products.filter((item) => item.category === activeCategory), [activeCategory]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + priceValue(item.product.price) * item.quantity, 0);

  function addToCart(item: Product, amount: number) {
    setCart((current) => {
      const existing = current.find((entry) => entry.product.name === item.name);
      return existing ? current.map((entry) => entry.product.name === item.name ? { ...entry, quantity: entry.quantity + amount } : entry) : [...current, { product: item, quantity: amount }];
    });
    setSelectedProduct(null);
    setSelectedQuantity(1);
    setCartOpen(true);
  }

  function updateCartQuantity(itemName: string, amount: number) {
    setCart((current) => current.map((entry) => entry.product.name === itemName ? { ...entry, quantity: Math.max(1, amount) } : entry));
  }

  function removeFromCart(itemName: string) { setCart((current) => current.filter((entry) => entry.product.name !== itemName)); }

  function sendCartOrder() {
    const lines = cart.map((entry) => `${entry.quantity} x ${entry.product.name} — ${entry.product.price}`);
    const message = ["Hola, VIOTORIIA. Quiero realizar este pedido:", ...lines, `Total estimado: ${formatCOP(cartTotal)}`, "Por favor confirmen disponibilidad, colores y tiempo de elaboración."].join("\\n");
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function sendOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      "Hola, VIOTORIIA. Quiero solicitar un pedido.",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Producto: ${product}`,
      `Cantidad: ${quantity}`,
      notes ? `Detalles: ${notes}` : "",
    ].filter(Boolean).join("\n");
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="storefront">
      <header className="site-header">
        <a className="brand-lockup" href="#inicio" aria-label="VIOTORIIA inicio">
          <span className="brand-mark">V<span>✳</span></span>
          <span><strong>VIOTORIIA</strong><small>ARTE EN 3D</small></span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#coleccion">Colección</a><a href="#video">Video</a><a href="#nosotros">Nuestra esencia</a><a href="#pedido">Pedidos</a>
        </nav>
        <div className="header-actions"><a className="header-cta" href="#coleccion">Explorar colección <span>↗</span></a><button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito, ${cartCount} productos`}><span aria-hidden="true">♧</span> Carrito <b>{cartCount}</b></button></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> COLECCIÓN NAVIDAD 2026</p>
          <h1>Pequeños detalles,<br /><em>grandes momentos.</em></h1>
          <p className="hero-intro">Piezas creadas en 3D para llenar tus espacios de magia, calidez y personalidad. Diseños especiales para regalar y celebrar.</p>
          <div className="hero-actions"><a className="button-primary" href="#coleccion">Descubrir diseños <span>↗</span></a><a className="text-link" href="#pedido">Crear mi pedido <span>→</span></a></div>
          <div className="hero-note"><span className="sparkle">✳</span><span>Hecho bajo pedido<br /><small>Detalles que se sienten únicos</small></span></div>
        </div>
        <div className="hero-art" aria-label="Catálogo de diseños navideños VIOTORIIA">
          <div className="hero-image-main"><img src="/assets/catalog/page-1.jpg" alt="Portada de la colección navideña VIOTORIIA" /></div>
          <div className="floating-stamp"><span>DISEÑADO</span><strong>con<br />intención</strong><span>IMPRESO EN 3D ✳</span></div>
          <div className="hero-caption">NAVIDAD · 2026 <span>01 / 07</span></div>
        </div>
        <div className="hero-side-label">OBJETOS CON PERSONALIDAD · HECHOS PARA COMPARTIR</div>
      </section>

      <section className="intro-band" id="nosotros">
        <p className="eyebrow">EL ARTE DE CREAR</p>
        <h2>Diseños que hacen<br /><em>especial lo cotidiano.</em></h2>
        <p>En VIOTORIIA transformamos ideas en objetos decorativos con carácter. Cada pieza se imprime bajo pedido y está pensada para acompañar tus celebraciones, tus espacios y tus momentos favoritos.</p>
        <div className="intro-orbit" aria-hidden="true">✳</div>
      </section>

      <section className="showreel-section" id="video" aria-labelledby="showreel-title">
        <div className="showreel-copy">
          <p className="eyebrow">VIOTORIIA · ARTE EN 3D</p>
          <h2 id="showreel-title">La magia está<br /><em>en los detalles.</em></h2>
          <p>Conoce nuestra colección navideña y descubre cómo una idea se convierte en una pieza especial.</p>
        </div>
        <div className="showreel-frame">
          <video controls playsInline preload="metadata" poster="/assets/catalog/page-1.jpg" aria-label="Video de presentación de la colección navideña VIOTORIIA">
            <source src="https://d2ol7oe51mr4n9.cloudfront.net/user_3LXKNlzLOs2jmGsBXwh0UhR766e/c6df7389-6630-4642-86f2-a65c9fec1410.mp4" type="video/mp4" />
            Tu navegador no puede reproducir este video. Puedes consultar nuestra colección más abajo.
          </video>
          <span className="showreel-caption">COLECCIÓN NAVIDAD · 2026</span>
        </div>
      </section>

      <section className="catalog-section" id="coleccion">
        <div className="section-heading"><div><p className="eyebrow">NAVIDAD 2026 · DISEÑOS ESPECIALES</p><h2>Encuentra tu <em>favorito.</em></h2></div><p>Explora la colección y elige las piezas que harán parte de tu celebración.</p></div>
        <div className="category-tabs" role="group" aria-label="Filtrar productos">
          {categories.map((category) => <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className="product-grid">
          {filtered.map((item) => (
            <article className="product-card" key={item.name}>
              <button className={`product-image product-image-button ${item.name === "Pesebre de 8 piezas" ? "product-image-tall" : ""} ${item.name === "Adornos variados para el árbol" ? "product-image-collection" : ""}`} type="button" onClick={() => { setSelectedProduct(item); setSelectedQuantity(1); }} aria-label={`Ver ${item.name} ampliado`}><img src={item.image} alt={item.name} loading="lazy" decoding="async" /><span className="product-category">{item.category}</span>{item.featured && <span className="product-star">✳</span>}<span className="image-zoom-hint">Ver detalle ↗</span></button>
              <div className="product-info"><div><h3>{item.name}</h3>{item.detail && <p>{item.detail}</p>}</div><strong>{item.price}</strong></div>
              <button type="button" className="product-link" onClick={() => { setSelectedProduct(item); setSelectedQuantity(1); }}>Ver detalles y agregar al carrito <span>＋</span></button>
            </article>
          ))}
        </div>

      {selectedProduct && (
        <div className="store-modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-label={`Detalle de ${selectedProduct.name}`} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Cerrar">×</button>
            <div className="product-modal-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div>
            <div className="product-modal-copy">
              <p className="eyebrow">{selectedProduct.category}</p>
              <h2>{selectedProduct.name}</h2>
              <strong className="modal-price">{selectedProduct.price}</strong>
              <p className="modal-description">{selectedProduct.detail || "Pieza decorativa impresa en 3D. Consulta disponibilidad y opciones de color."}</p>
              <p className="modal-note">Precio expresado en pesos colombianos (COP). La disponibilidad y los colores se confirman al realizar el pedido.</p>
              <div className="modal-quantity"><span>Cantidad</span><div><button type="button" onClick={() => setSelectedQuantity((n) => Math.max(1, n - 1))} aria-label="Restar cantidad">−</button><b>{selectedQuantity}</b><button type="button" onClick={() => setSelectedQuantity((n) => Math.min(99, n + 1))} aria-label="Sumar cantidad">＋</button></div></div>
              <button className="button-primary modal-add" type="button" onClick={() => addToCart(selectedProduct, selectedQuantity)}>Agregar al carrito <span>＋</span></button>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="store-modal-backdrop cart-backdrop" role="presentation" onClick={() => setCartOpen(false)}>
          <section className="cart-modal" role="dialog" aria-modal="true" aria-label="Mi carrito" onClick={(event) => event.stopPropagation()}>
            <div className="cart-heading"><div><p className="eyebrow">TU SELECCIÓN</p><h2>Mi carrito <span>({cartCount})</span></h2></div><button className="modal-close" type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar">×</button></div>
            {cart.length === 0 ? <div className="cart-empty"><span>✳</span><h3>Tu carrito está vacío</h3><p>Abre cualquier producto del catálogo para ver sus detalles y agregarlo aquí.</p><button className="button-primary" type="button" onClick={() => { setCartOpen(false); document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" }); }}>Explorar catálogo</button></div> : <>
              <div className="cart-items">{cart.map((entry) => <article className="cart-item" key={entry.product.name}><img src={entry.product.image} alt="" /><div className="cart-item-info"><h3>{entry.product.name}</h3><p>{entry.product.price}</p><div className="cart-item-actions"><button type="button" onClick={() => updateCartQuantity(entry.product.name, entry.quantity - 1)} aria-label={`Reducir ${entry.product.name}`}>−</button><b>{entry.quantity}</b><button type="button" onClick={() => updateCartQuantity(entry.product.name, entry.quantity + 1)} aria-label={`Aumentar ${entry.product.name}`}>＋</button><button className="remove-item" type="button" onClick={() => removeFromCart(entry.product.name)}>Quitar</button></div></div><strong>{formatCOP(priceValue(entry.product.price) * entry.quantity)}</strong></article>)}</div>
              <div className="cart-total"><span>Total estimado</span><strong>{formatCOP(cartTotal)}</strong></div>
              <p className="cart-disclaimer">El total es una estimación según el primer valor indicado en cada precio. Confirmaremos paquetes, disponibilidad y envío por WhatsApp.</p>
              <button className="button-primary cart-checkout" type="button" onClick={sendCartOrder}>Continuar pedido por WhatsApp <span>↗</span></button>
            </>}
          </section>
        </div>
      )}

        <p className="catalog-footnote">Los colores y combinaciones están sujetos a disponibilidad. Los precios están expresados en pesos colombianos (COP).</p>
      </section>

      <section className="order-banner">
        <div><p className="eyebrow">UNA IDEA, MUCHAS POSIBILIDADES</p><h2>¿Lo imaginaste?<br /><em>Hagámoslo realidad.</em></h2></div>
        <a className="button-light" href="#pedido">Cuéntanos qué buscas <span>↗</span></a>
      </section>

      <section className="order-section" id="pedido">
        <div className="order-copy"><p className="eyebrow">PEDIDOS PERSONALIZADOS</p><h2>Tu próximo detalle<br /><em>empieza aquí.</em></h2><p>Completa tus datos y se abrirá WhatsApp con tu solicitud lista para enviarnos. Confirmaremos disponibilidad, colores y tiempo de elaboración contigo.</p>
          <div className="order-steps"><div><span>01</span><p><strong>Elige tu diseño</strong><small>Cuéntanos qué pieza te gustó.</small></p></div><div><span>02</span><p><strong>Confirmamos contigo</strong><small>Revisamos colores y disponibilidad.</small></p></div><div><span>03</span><p><strong>Lo creamos para ti</strong><small>Comenzamos con el 30% de anticipo.</small></p></div></div>
        </div>
        <form className="order-form" onSubmit={sendOrder}>
          <div className="form-heading"><span>✳</span><div><h3>Cuéntanos tu idea</h3><p>Todos los campos marcados son necesarios.</p></div></div>
          <label>Nombre completo<input value={name} onChange={(e) => setName(e.target.value)} placeholder="¿Cómo te llamas?" required /></label>
          <label>Teléfono de contacto<input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Tu número de contacto" required /></label>
          <div className="form-row"><label className="grow">Producto de interés<select value={product} onChange={(e) => setProduct(e.target.value)} required><option value="">Selecciona un diseño</option>{products.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}<option value="Pedido personalizado">Pedido personalizado</option></select></label><label className="quantity">Cantidad<input type="number" min="1" max="500" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></label></div>
          <label>Detalles adicionales<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Color, personalización o cualquier detalle que quieras contarnos." rows={3} /></label>
          <button className="button-primary form-submit" type="submit">Enviar solicitud por WhatsApp <span>↗</span></button>
          <small className="form-privacy">Al enviar, se abrirá WhatsApp para que puedas revisar y confirmar el mensaje.</small>
        </form>
      </section>

      <section className="conditions"><div><span>30%</span><p><strong>Anticipo para iniciar</strong><small>Comenzamos a elaborar tu pedido.</small></p></div><div><span>70%</span><p><strong>Al finalizar</strong><small>El saldo se paga al completar tu pedido.</small></p></div><div><span>✳</span><p><strong>Hecho bajo pedido</strong><small>Precios especiales para compras al por mayor. Consulta con nosotros.</small></p></div></section>

      <footer className="site-footer"><a className="brand-lockup footer-brand" href="#inicio"><span className="brand-mark">V<span>✳</span></span><span><strong>VIOTORIIA</strong><small>ARTE EN 3D</small></span></a><p>Diseños especiales. Decoración y regalos.</p><div className="footer-contact"><a href="mailto:Viotoriia@gmail.com">Viotoriia@gmail.com</a><a href="https://wa.me/573015826473" target="_blank" rel="noreferrer">+57 301 582 6473</a></div><small>© 2026 VIOTORIIA · Hecho con creatividad en Colombia</small></footer>
      <a className="viotoriia-whatsapp" href="https://wa.me/573015826473?text=Hola%2C%20quiero%20hacer%20un%20pedido%20en%20VIOTORIIA" target="_blank" rel="noreferrer" aria-label="Escribir a VIOTORIIA por WhatsApp"><span aria-hidden="true">✳</span> Pedir por WhatsApp</a>
    </main>
  );
}
