export default function LandingStep({ onStart }) {
  return (
    <div className="landing-content">
      <div className="landing-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="23" stroke="url(#grad1)" strokeWidth="2" />
          <circle cx="16" cy="20" r="4" fill="#C4B4A1" />
          <circle cx="32" cy="20" r="4" fill="#D9CBB8" />
          <circle cx="24" cy="32" r="4" fill="#B09B86" />
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#C4B4A1" />
              <stop offset="100%" stopColor="#D9CBB8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1>Visual Impressions</h1>
      <p className="landing-subtitle">
        Help us understand your first impressions. Take a quick look at each
        moodboard and choose the option that best matches what comes to mind.
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
