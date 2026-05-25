import EmailCapture from "../components/EmailCapture";
import LogoLockup from "../components/LogoLockup";
import SectionLabel from "../components/SectionLabel";

export default function ProductPage({ product }) {
  return (
    <main className="page-transition product-page" data-product={product.id}>
      <section className="product-hero hero-gradient motion-hero" style={{ "--hero-photo": `url(${product.heroPhoto})`, "--product-hero-gradient": product.heroGradient }}>
        <HeroAtmosphere />
        <div className="container product-hero__inner">
          <SectionLabel>00 / PRODUCT</SectionLabel>
          <LogoLockup
            mark={product.logo}
            wordmark={product.name}
            size={104}
            product
            className="product-hero__lockup"
          />
          <div className="product-hero__copy">
            <p className="mono product-hero__meta">
              STATUS: {product.status} · LAUNCH: {product.launch}
            </p>
            <h1 className="display">
              <AnimatedText text={product.summary} />
            </h1>
            <p>{product.cardCopy}</p>
          </div>
        </div>
      </section>

      {product.sections.map((section) => (
        <section className="section-block product-section" key={section.label}>
          <div className="container product-section__grid">
            <SectionLabel>{section.label}</SectionLabel>
            <div>
              <h2 className="display">{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="section-block product-cta">
        <div className="container product-cta__inner">
          <SectionLabel>07 / EARLY ACCESS</SectionLabel>
          <div>
            <h2 className="display">Help shape {product.name} before launch.</h2>
            <p>
              We are talking to first users while the product is still narrow. Tell us where
              the current alternatives fail and what would make this worth using every week.
            </p>
            <EmailCapture productName={product.name} subject={`${product.name} early access`} />
          </div>
        </div>
      </section>
    </main>
  );
}

function AnimatedText({ text }) {
  return text.split(" ").map((word, index) => (
    <span className="word-reveal" style={{ "--word-delay": `${index * 60}ms` }} key={`${word}-${index}`}>
      {word}
    </span>
  ));
}

function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <span className="hero-blob hero-blob--one" />
      <span className="hero-blob hero-blob--two" />
      <span className="hero-spotlight" />
    </div>
  );
}
