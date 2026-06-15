const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']
const AGE_OPTIONS = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+']
const AGE_VALUES = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+']

export default function DemographicsStep({
  gender,
  age,
  onSelectGender,
  onSelectAge,
  onNext,
  onBack,
  canProceed,
}) {
  return (
    <>
      <div className="step-header">
        <span className="step-label">Step 1 of 5</span>
        <h2>About You</h2>
        <p className="step-desc">Just a couple of quick questions to start.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <div className="chip-group" id="gender-group">
          {GENDER_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`chip${gender === opt ? ' selected' : ''}`}
              onClick={() => onSelectGender(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Age Group</label>
        <div className="chip-group" id="age-group">
          {AGE_OPTIONS.map((opt, i) => (
            <button
              key={opt}
              className={`chip${age === AGE_VALUES[i] ? ' selected' : ''}`}
              onClick={() => onSelectAge(AGE_VALUES[i])}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="step-nav">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="btn-primary"
          id="btn-step1"
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </>
  )
}
