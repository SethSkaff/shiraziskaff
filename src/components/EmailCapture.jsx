import { useState } from "react";

export default function EmailCapture({ productName = "SSE", subject = "Early access" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  function handleSubmit(event) {
    event.preventDefault();
    const value = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isValid) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      window.location.href = `mailto:contact@shiraziskaff.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Early access email: ${value}`)}`;
    }, 250);
  }

  return (
    <form
      className="email-capture"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="email-capture__label" htmlFor={`email-${productName}`}>
        Early access
      </label>
      <div className="email-capture__row">
        <input
          id={`email-${productName}`}
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-invalid={status === "error"}
          aria-describedby={`email-${productName}-status`}
          aria-label={`${productName} early access email`}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Opening email" : "Request access"}
        </button>
      </div>
      <p className={`email-capture__status email-capture__status--${status}`} id={`email-${productName}-status`}>
        {status === "error" && "Enter a valid email address."}
        {status === "success" && "Opening your email client with the request prepared."}
      </p>
    </form>
  );
}
