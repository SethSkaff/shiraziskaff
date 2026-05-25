import { Link } from "react-router-dom";
import Card from "../components/Card";
import LogoLockup from "../components/LogoLockup";
import SectionLabel from "../components/SectionLabel";
import StatusIndicator from "../components/StatusIndicator";
import { products } from "../data/products";

export default function Home() {
  const [coach, airmix, crave] = products;

  return (
    <main className="page-transition">
      <section className="home-hero hero-gradient">
        <div className="container home-hero__inner">
          <div className="home-hero__presented">
            <LogoLockup size={32} />
          </div>
          <StatusIndicator />
          <div className="home-hero__copy">
            <SectionLabel>00 / STUDIO</SectionLabel>
            <h1 className="display">
              AI products, built <em>with intent.</em>
            </h1>
            <p>
              Shirazi Skaff Enterprises is a vertical AI products studio founded by Kian
              Shirazi and Seth Skaff. We build software that replaces expensive human
              services in narrow domains where real-time feedback changes the outcome.
            </p>
            <div className="home-hero__actions">
              <a className="button-primary" href="#products">
                See our products
              </a>
              <Link className="text-link" to="/about">
                Read about us.
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block products-section" id="products">
        <div className="container">
          <SectionLabel>01 / PRODUCTS</SectionLabel>
          <div className="section-heading">
            <h2 className="display">Three products, one vertical thesis.</h2>
            <p>
              Each product starts with a specific user, a specific behavior, and a service
              that should become software.
            </p>
          </div>

          <div className="product-grid">
            <ProductCard product={coach} featured />
            <div className="product-grid__stack">
              <ProductCard product={airmix} />
              <ProductCard product={crave} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-block work-section">
        <div className="container">
          <SectionLabel>02 / OUR APPROACH</SectionLabel>
          <div className="work-section__grid">
            <h2 className="display">How we work.</h2>
            <div className="principles">
              <p>Build for one user first.</p>
              <p>Ship before it’s ready.</p>
              <p>Vertical, not horizontal.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, featured = false }) {
  return (
    <Card
      to={product.route}
      accent={product.accent}
      className={featured ? "product-card product-card--featured" : "product-card"}
      tall={featured}
    >
      <div className="product-card__top">
        <LogoLockup mark={product.logo} wordmark={product.name} size={featured ? 72 : 48} />
        <span className="product-card__price mono">{product.price}</span>
      </div>
      <div className="product-card__body">
        <h3 className="display">{product.name}</h3>
        <p>{featured ? product.cardCopy : product.summary}</p>
      </div>
      <div className="product-card__bottom">
        <p className="mono">
          STATUS: {product.status} · LAUNCH: {product.launch}
        </p>
        <span className="learn-more">
          Learn more <span aria-hidden="true">→</span>
        </span>
      </div>
    </Card>
  );
}
