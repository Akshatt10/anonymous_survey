export default function LandingStep({ onStart }) {
  return (
    <div className="landing-content">
      <div className="landing-icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" fill="#E2E2E2" />
          <circle cx="40" cy="38" r="36" fill="white" />
          <circle cx="40" cy="40" r="36" stroke="#292744" strokeWidth="6" />
          <path d="M24 30C24 24.5 32 24.5 32 30" stroke="#292744" strokeWidth="6" strokeLinecap="round" />
          <path d="M48 30C48 24.5 56 24.5 56 30" stroke="#292744" strokeWidth="6" strokeLinecap="round" />
          <path d="M28 46C28 46 34 54 40 54C46 54 52 46 52 46" stroke="#292744" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1>Visual Impressions</h1>
      <p className="landing-subtitle">
        We'd love to know your first thoughts! Take a quick look at each style board and pick the feeling that matches best.
      </p>
      <div className="landing-meta">
        <span className="meta-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Under 1 min
        </span>
        <span className="meta-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          100% Anonymous
        </span>
      </div>
      <button className="btn-primary landing-btn" id="btn-start" onClick={onStart}>
        Begin Survey
      </button>
    </div>
  )
}
