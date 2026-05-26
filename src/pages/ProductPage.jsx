import EmailCapture from "../components/EmailCapture";
import LogoLockup from "../components/LogoLockup";
import SectionLabel from "../components/SectionLabel";

export default function ProductPage({ product }) {
  return (
    <main className="page-transition product-page" data-product={product.id}>
      <section className="product-hero motion-hero" style={{ "--hero-photo": `url(${product.heroPhoto})` }}>
        <div className="product-hero__sticky" aria-hidden="true">
          <div className="product-hero__image" />
        </div>
        <div className="container product-hero__inner">
          <SectionLabel>00 / PRODUCT</SectionLabel>
          <LogoLockup
            mark={product.logo}
            wordmark={product.name}
            size={product.id === "crave" ? 936 : 416}
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

      <section className="section-block product-detail">
        <div className="container product-detail__inner">
          <h2 className="display">{product.name}</h2>
          <div className="product-detail__copy">
            {product.detailCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
      {word}{" "}
    </span>
  ));
}

