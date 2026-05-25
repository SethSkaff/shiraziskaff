import { Link } from "react-router-dom";
import SectionLabel from "../components/SectionLabel";

export default function NotFound() {
  return (
    <main className="page-transition">
      <section className="page-hero hero-gradient">
        <div className="container page-hero__inner">
          <SectionLabel>404 / NOT FOUND</SectionLabel>
          <h1 className="display">This page is not in the build.</h1>
          <p>
            The studio site is small by design. Return home or send a note if you were
            looking for something specific.
          </p>
          <div className="home-hero__actions">
            <Link className="button-primary" to="/">
              Return home
            </Link>
            <Link className="text-link" to="/contact">
              Contact SSE.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
