function Card({ note, onDelete, onSelect }) {
  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(note.id)
  }
  const visibleTags = note.tags?.slice(0, 3) ?? []
  const hiddenTagCount = Math.max((note.tags?.length ?? 0) - 3, 0)

  const hasImportant = Boolean(note.important)
  const hasQuestions = Boolean(note.questions)
  const hasChatUrl = Boolean(note.chat_url)


  return (
    <article
      className="note-card"
      onClick={() => onSelect(note)}
    >
      <div className="note-header">
        <h2 className="note-title">{note.title}</h2>
        <button
          className="delete-button"
          onClick=
          {handleDelete}
          aria-label="ノートを削除"
          title="このノートを削除"
        >
          ×
        </button>
      </div>



      <div className="note-tags">
        {visibleTags.map((tag) => (
          <span key={tag} className="note-tag">
            {tag}
          </span>
        ))}

        {hiddenTagCount > 0 && (
          <span className="note-tag more-tag">+{hiddenTagCount}</span>
        )}
      </div>

      <div className="note-content">
        {note.summary && (
          <div className="note-section">
            <span className="section-label">📝 要約</span>
            <p className="section-text">{note.summary}</p>
          </div>
        )}
      </div>

      <div className="note-card-footer">
        {hasImportant && <span className="meta-chip important-chip">重要</span>}
        {hasQuestions && <span className="meta-chip question-chip">疑問</span>}
        {hasChatUrl && <span className="meta-chip chat-chip">Chat</span>}
      </div>
    </article >
  )
}

export default Card
