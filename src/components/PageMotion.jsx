import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const sections = document.querySelectorAll(".section-block");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    sections.forEach((section) => observer.observe(section));

    const updateScroll = () => {
      document.querySelectorAll(".motion-hero").forEach((hero) => {
        const rect = hero.getBoundingClientRect();
        const offset = Math.max(-rect.top, 0) * 0.5;
        hero.style.setProperty("--hero-parallax", `${offset}px`);
      });
    };

    const updateCursor = (event) => {
      document.querySelectorAll(".motion-hero").forEach((hero) => {
        const rect = hero.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
        hero.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        hero.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("mousemove", updateCursor, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", updateCursor);
    };
  });

  return null;
}
