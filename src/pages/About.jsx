import SectionLabel from "../components/SectionLabel";

export default function About() {
  return (
    <main className="page-transition">
      <section className="page-hero hero-gradient">
        <div className="container page-hero__inner">
          <SectionLabel>01 / ABOUT</SectionLabel>
          <h1 className="display">Two founders, <em>building.</em></h1>
          <p className="mono page-hero__caption">Founded 2026</p>
        </div>
      </section>

      <section className="section-block founders-section">
        <div className="container founders-grid">
          <div className="founders-section__label">
            <SectionLabel>02 / FOUNDERS</SectionLabel>
          </div>
          <Founder
            name="Kian Shirazi"
            image="/assets/kian-photo-sm.jpg"
            meta="Founder · High school senior"
            body={[
              "Kian works from the edge where new hardware, young users, and practical AI meet. His focus is on products that can be tested quickly with real people instead of debated abstractly.",
              "At SSE, he leads product direction across tutoring, AR interfaces, and nutrition workflows, with a bias toward narrow launch wedges that prove behavior before scale.",
            ]}
          />
          <Founder
            name="Seth Skaff"
            image="/assets/seth-photo-sm.jpg"
            meta="Founder · UCLA-bound"
            body={[
              "Seth brings the operating pressure: what can ship, what can be sold, and what users will actually repeat. He pushes each idea toward a concrete first audience and a clean business model.",
              "At SSE, he works across growth, execution, and product shape, keeping the studio focused on services that software can replace without losing the human outcome.",
            ]}
          />
        </div>
      </section>

      <section className="section-block why-section">
        <div className="container why-section__grid">
          <SectionLabel>03 / WHY WE EXIST</SectionLabel>
          <div>
            <h2 className="display">AI is ready for vertical products.</h2>
            <p>
              Most AI startups are still chasing horizontal chatbots. We think the better
              opportunity is narrower: pick a service people already pay for, understand the
              physical or behavioral loop behind it, and build software that can do the job
              with more immediacy and lower cost.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Founder({ name, image, meta, body }) {
  return (
    <article className="founder">
      <img src={image} alt={name} loading="lazy" decoding="async" />
      <div>
        <p className="mono founder__meta">{meta}</p>
        <h2 className="display">{name}</h2>
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
