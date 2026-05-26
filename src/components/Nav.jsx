import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoLockup from "./LogoLockup";

const navItems = [
  { label: "Products", to: "/#products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > Math.max(360, window.innerHeight * 0.62));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="site-nav__inner container">
        <LogoLockup to="/" size={54} wordmark="Shirazi Skaff" />
        <nav className="site-nav__links" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.to.startsWith("/#") ? (
              <a className="nav-link" href={item.to} key={item.label}>
                {item.label}
              </a>
            ) : (
              <NavLink className="nav-link" to={item.to} key={item.label}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
