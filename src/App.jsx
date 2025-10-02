import React, { useEffect, useState } from "react";
import "./App.css";

/* Small SVG Check icon */
function CheckIcon() {
  return (
    <svg className="feature-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
    </svg>
  );
}

/* Presentational PlanCard component */
function PlanCard({ plan }) {
  // Consider a plan featured if tag === 'Popular' or plan.highlighted is truthy
  const isFeatured = (plan.tag && plan.tag.toLowerCase() === "popular") || plan.highlighted;

  return (
    <article
      className={`plan-card${isFeatured ? " featured" : ""}`}
      aria-labelledby={`plan-${plan.id || plan.name}`}
    >
      <div className="plan-head">
        <div>
          <h3 id={`plan-${plan.id || plan.name}`} className="plan-title">{plan.name}</h3>
          {plan.subtitle && <p className="plan-sub">{plan.subtitle}</p>}
        </div>
        {plan.tag && <span className="plan-tag">{plan.tag}</span>}
      </div>

      <div className="plan-price-row">
        <div className="plan-price">
          <span className="price-amount">{plan.price}{plan.currency ? ` ${plan.currency}` : ""}</span>
          {plan.billingCycle && <span className="price-cycle"> / {plan.billingCycle}</span>}
        </div>
      </div>

      <ul className="plan-features" aria-label={`${plan.name} features`}>
        {Array.isArray(plan.features) && plan.features.length > 0 ? (
          plan.features.map((f, i) => (
            <li key={i}>
              <CheckIcon /> <span className="feature-text">{f}</span>
            </li>
          ))
        ) : (
          <li className="muted">No features listed</li>
        )}
      </ul>

      <div className="plan-cta-wrap">
        <button
          className="choose-btn"
          aria-label={`Choose ${plan.name} plan`}
          type="button"
        >
          Choose {plan.name}
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [data, setData] = useState(null); // { version: 'blue', plans: [...] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch("https://pricing-backend-xhsp.onrender.com", {
      method: "GET",
      credentials: "include",
      headers: { "Accept": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${txt}`);
        }
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        setData(json);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Pricing fetch failed:", err);
        setError(err.message || "Failed to fetch pricing");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  return (
    <div className="page">
      <div className="container">
        <header className="site-header">
          <div>
            <h1 className="title">Pricing</h1>
            <p className="lead">
              Real-time pricing served safely — this frontend displays exactly what the backend returns.
            </p>
          </div>

          <div className="header-actions">
            <div className="badge-outer" aria-hidden>
              {data && data.version && <span className={`served-badge served-${data.version}`}>Served: {data.version}</span>}
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-inner">
            <h2 className="hero-title">Simple plans, clearly priced</h2>
            <p className="hero-sub">
              Choose a plan that fits you. This page demonstrates blue/green pricing served by the backend and sticky sessions via cookies.
            </p>
          </div>
        </section>

        <main>
          {loading && <div className="placeholder card">Loading pricing…</div>}
          {error && <div className="placeholder error">Error: {error}</div>}

          {!loading && !error && data && (
            <div className="grid">
              {Array.isArray(data.plans) && data.plans.length > 0 ? (
                data.plans.map((plan) => <PlanCard key={plan.id || plan.name} plan={plan} />)
              ) : (
                <div className="card">No plans available</div>
              )}
            </div>
          )}
        </main>

        <footer className="footer">
          <small>Frontend demo — fetches <code>/pricing</code>. Cookies enabled for sticky routing.</small>
        </footer>
      </div>
    </div>
  );
}
