import { Link } from "react-router-dom";

export default function LogoLockup({
  mark = "/logos/sse-double-s.png",
  wordmark = "Shirazi Skaff Enterprises",
  to,
  size = 24,
  product = false,
  className = "",
}) {
  const isCoach = /coach/i.test(mark || "");
  const content = (
    <span className={`logo-lockup ${className}`.trim()}>
      <img
        className={`logo-lockup__mark ${isCoach ? "logo-lockup__mark--coach" : ""}`}
        src={mark}
        alt=""
        style={{ width: size, height: size }}
      />
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
