import { Link } from "react-router-dom";

function SyntheticMark({ size = 24 }) {
  return (
    <span
      className="synthetic-mark"
      style={{ width: size, height: size, minWidth: size }}
      aria-hidden="true"
    >
      <span>S</span>
    </span>
  );
}

export default function LogoLockup({
  mark,
  wordmark = "Shirazi Skaff Enterprises",
  to,
  size = 24,
  product = false,
  className = "",
}) {
  const content = (
    <span className={`logo-lockup ${className}`.trim()}>
      {mark ? (
        <img
          className="logo-lockup__mark"
          src={mark}
          alt=""
          style={{ width: size, height: size }}
        />
      ) : (
        <SyntheticMark size={size} />
      )}
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
