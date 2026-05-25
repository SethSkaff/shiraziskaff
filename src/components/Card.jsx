import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Card({
  as: Component = "article",
  to,
  children,
  className = "",
  accent,
  tall = false,
}) {
  const ref = useRef(null);
  const classNames = `crafted-card ${tall ? "crafted-card--tall" : ""} ${className}`.trim();
  const style = accent ? { "--card-accent": accent } : undefined;

  function handleMove(event) {
    const card = ref.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transition = "transform 80ms linear";
    card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateZ(0)`;
  }

  function handleLeave() {
    const card = ref.current;
    if (!card) return;
    card.style.transition = "transform 400ms var(--ease-out-expo)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  const content = (
    <Component className={classNames} onMouseMove={handleMove} onMouseLeave={handleLeave} ref={ref} style={style}>
      {children}
    </Component>
  );

  if (to) {
    return (
      <Link className="crafted-card-link" to={to}>
        {content}
      </Link>
    );
  }

  return content;
}
