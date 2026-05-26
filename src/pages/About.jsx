import SectionLabel from "../components/SectionLabel";

export default function About() {
  return (
    <main className="page-transition">
      <section className="page-hero hero-gradient">
        <div className="container page-hero__inner">
          <SectionLabel>01 / ABOUT</SectionLabel>
          <h1 className="display">About us</h1>
          <p className="mono page-hero__caption">Founded 2026</p>
        </div>
      </section>

      <section className="section-block founders-section">
        <div className="container founders-grid">
          <div className="founders-section__label">
            <SectionLabel>02 / TEAM</SectionLabel>
          </div>
          <Founder
            name="Kian Shirazi"
            image="/assets/kian-photo-sm.jpg"
            meta="High school senior"
            body={[
              "Kian tutors math at Mathnasium and noticed the same thing every week. Students learn faster when someone is right there pointing at the paper. He builds AI tools that do that part: the actual coaching, not just the answer.",
            ]}
          />
          <Founder
            name="Seth Skaff"
            image="/assets/seth-photo-sm.jpg"
            meta="UCLA-bound"
            body={[
              "Seth is going to UCLA to study Mathematics, Economics, and Data Science Engineering. He spends his time on politics, data, and media, with an interest in AI products that make expensive expertise affordable.",
            ]}
          />
        </div>
      </section>

      <section className="section-block why-section">
        <div className="container why-section__grid">
          <div>
            <p>
              We're interested in using AI to solve problems that used to need a human expert. Most AI startups are building chatbots. We're building the specific tools: a tutor that watches your paper, a DJ board that runs on AR glasses, a nutrition coach that orders your groceries. The bet is that vertical AI products beat horizontal ones when the vertical is sharp enough.
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
