const roles = [
  "Engineering internship",
  "Design internship",
  "Growth internship",
];

export default function Careers() {
  return (
    <main className="page-transition">
      <section className="page-hero hero-gradient">
        <div className="container page-hero__inner">
          <p className="section-label">01 / CAREERS</p>
          <h1 className="display">Build with us.</h1>
          <p>
            We are looking for people who like narrow problems, fast prototypes, and products
            that prove their value through use.
          </p>
        </div>
      </section>

      <section className="section-block roles-section">
        <div className="container">
          <p className="section-label">02 / OPEN ROLES</p>
          {roles.map((role) => (
            <a
              className="role-row"
              href={`mailto:contact@shiraziskaff.com?subject=${encodeURIComponent(role)}`}
              key={role}
            >
              <span>{role}</span>
              <span className="mono">contact@shiraziskaff.com</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
