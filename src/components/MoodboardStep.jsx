export default function MoodboardStep({
  stepNumber,
  totalSteps,
  moodboardNumber,
  imageSrc,
  keywords,
  selected,
  onSelect,
  onNext,
  onBack,
  canProceed,
}) {
  return (
    <>
      <div className="step-header">
        <span className="step-label">Step {stepNumber} of {totalSteps}</span>
        <h2>Moodboard {moodboardNumber}</h2>
        <p className="step-desc">Which words best describe this moodboard?</p>
      </div>

      <div className="moodboard-frame">
        <img
          src={imageSrc}
          alt={`Moodboard ${moodboardNumber}`}
          className="moodboard-img"
          loading={moodboardNumber === 1 ? 'eager' : 'lazy'}
        />
      </div>

      <div className="chip-group" id={`mood${moodboardNumber}-group`}>
        {keywords.map((word) => (
          <button
            key={word}
            className={`chip${selected && selected.includes(word) ? ' selected' : ''}`}
            onClick={() => onSelect(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="step-nav">
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="btn-primary"
          id={`btn-step${stepNumber}`}
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </>
  )
}
