export default function ThankYouStep() {
  return (
    <div className="thankyou-content">
      <div className="thankyou-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="url(#grad2)"
            strokeWidth="2"
            fill="url(#grad2)"
            fillOpacity="0.08"
          />
          <path
            d="M20 33L28 41L44 25"
            stroke="url(#grad2)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="grad2" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#C4B4A1" />
              <stop offset="100%" stopColor="#D9CBB8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h2>Thank You!</h2>
      <p className="thankyou-text">
        Your responses have been recorded. We appreciate you taking the time to
        share your impressions.
      </p>
    </div>
  )
}
