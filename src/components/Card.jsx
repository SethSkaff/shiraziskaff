import { Link } from "react-router-dom";

export default function Card({
  as: Component = "article",
  to,
  children,
  className = "",
  accent,
  tall = false,
}) {
  const classNames = `crafted-card ${tall ? "crafted-card--tall" : ""} ${className}`.trim();
  const style = accent ? { "--card-accent": accent } : undefined;
  const content = (
    <Component className={classNames} style={style}>
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
