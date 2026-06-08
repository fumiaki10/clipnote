function Card({ note }) {
  return (
    <article className="note-card">
      <h2 className="note-title">{note.title}</h2>

      <div className="note-tags">
        {note.tags.map((tag) => (
          <span key={tag} className="note-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="note-content">
        {note.summary && (
          <div className="note-section">
            <span className="section-label">📝 要約</span>
            <p className="section-text">{note.summary}</p>
          </div>
        )}

        {note.questions && (
          <div className="note-section">
            <span className="section-label">❓ 疑問点</span>
            <p className="section-text">{note.questions}</p>
          </div>
        )}

        {note.important && (
          <div className="note-section">
            <span className="section-label">⭐ 重要な点</span>
            <p className="section-text">{note.important}</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default Card
