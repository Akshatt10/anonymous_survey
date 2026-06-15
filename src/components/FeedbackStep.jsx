import { useState } from 'react'

export default function FeedbackStep({ value, onChange, onSubmit, onBack, submitting }) {
  const [charCount, setCharCount] = useState(value.length)

  const handleChange = (e) => {
    const text = e.target.value
    if (text.length <= 500) {
      onChange(text)
      setCharCount(text.length)
    }
  }

  return (
    <>
      <div className="step-header">
        <span className="step-label">Step 5 of 5</span>
        <h2>Final Thoughts</h2>
        <p className="step-desc">Anything you feel or wish to share with us?</p>
      </div>

      <div className="form-group">
        <textarea
          id="feedback-text"
          className="feedback-textarea"
          placeholder="Your thoughts are valuable to us… (optional)"
          rows="4"
          maxLength="500"
          value={value}
          onChange={handleChange}
        />
        <span className="char-count" id="charCount">
          {charCount} / 500
        </span>
      </div>

      <div className="step-nav">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className={`btn-primary${submitting ? ' loading' : ''}`}
          id="btn-submit"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? '' : 'Submit'}
        </button>
      </div>
    </>
  )
}
