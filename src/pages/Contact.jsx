import SectionLabel from "../components/SectionLabel";

const inquiries = [
  { label: "Partnerships", subject: "Partnership inquiry" },
  { label: "Press", subject: "Press inquiry" },
  { label: "General", subject: "General inquiry" },
];

export default function Contact() {
  return (
    <main className="page-transition">
      <section className="page-hero hero-gradient contact-hero">
        <div className="container page-hero__inner">
          <SectionLabel>01 / CONTACT</SectionLabel>
          <h1 className="display">Start the conversation.</h1>
          <p>We read every note and aim to respond within two business days.</p>
          <a className="contact-email" href="mailto:contact@shiraziskaff.com">
            contact@shiraziskaff.com
          </a>
        </div>
      </section>

      <section className="section-block contact-section">
        <div className="container">
          <SectionLabel>02 / INQUIRIES</SectionLabel>
          {inquiries.map((inquiry) => (
            <a
              className="role-row"
              href={`mailto:contact@shiraziskaff.com?subject=${encodeURIComponent(inquiry.subject)}`}
              key={inquiry.label}
            >
              <span>{inquiry.label}</span>
              <span className="mono">{inquiry.subject}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
