import { Link } from "react-router-dom";
import LogoLockup from "./LogoLockup";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <LogoLockup size={63} to="/" />
          <nav className="site-footer__links" aria-label="Footer navigation">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <a className="site-footer__email" href="mailto:contact@shiraziskaff.com">
            contact@shiraziskaff.com
          </a>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 Shirazi Skaff Enterprises</p>
          <p className="mono">v0.1.0</p>
        </div>
      </div>
    </footer>
  );
}
