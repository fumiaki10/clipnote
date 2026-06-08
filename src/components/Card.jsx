function Card({ note }) {
  return (
    <article className="note-card">
      <h2 className="note-title">{note.title}</h2>

      <div className="note-tag">
        {note.tags.map((tag) => (
          <span key={tag} className="note-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="note-content">
        <p className="note-section"><strong>要約：</strong>{note.summary}</p>
        {note.questions && (
          <p className="note-section"><strong>疑問点：</strong>{note.questions}</p>
        )}
        {note.important && (
          <p className="note-section"><strong>重要な点：</strong>{note.important}</p>
        )}
      </div>
    </article>
  )
}

export default Card