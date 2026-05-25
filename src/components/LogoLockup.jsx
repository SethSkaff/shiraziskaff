import { Link } from "react-router-dom";

export default function LogoLockup({
  mark = "/logos/sse-double-s.png",
  wordmark = "Shirazi Skaff Enterprises",
  to,
  size = 24,
  product = false,
  brand = !product && /sse-double-s/i.test(mark || ""),
  className = "",
}) {
  const isCoach = /coach/i.test(mark || "");
  const content = (
    <span className={`logo-lockup ${brand ? "logo-lockup--brand" : ""} ${className}`.trim()}>
      <span className={brand ? "logo-lockup__mark-shell" : undefined} style={brand ? { width: size, height: size } : undefined}>
        <img
          className={`logo-lockup__mark ${isCoach ? "logo-lockup__mark--coach" : ""}`}
          src={mark}
          alt=""
          style={{ width: brand ? Math.round(size * 0.68) : size, height: brand ? Math.round(size * 0.68) : size }}
        />
      </span>
      <span
        className={product ? "logo-lockup__wordmark logo-lockup__wordmark--product" : "logo-lockup__wordmark"}
      >
        {wordmark}
      </span>
    </span>
  );

  if (to) {
    return (
      <Link className="logo-lockup-link" to={to} aria-label={wordmark}>
        {content}
      </Link>
    );
  }

  return content;
}
