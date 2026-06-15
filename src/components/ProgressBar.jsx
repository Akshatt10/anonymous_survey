export default function ProgressBar({ percent, visible }) {
  return (
    <div className={`progress-bar-container${visible ? ' visible' : ''}`}>
      <div className="progress-bar" style={{ width: `${percent}%` }} />
    </div>
  )
}
