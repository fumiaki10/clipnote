function NoteDetailModal({ note, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete(note.id)
  }

  const tags = note.tags ?? []

  const rawChatUrl = typeof note.chat_url === 'string' ? note.chat_url.trim() : ''

  const safeChatUrl =
    rawChatUrl.startsWith('http://') || rawChatUrl.startsWith('https://')
      ? rawChatUrl
      : rawChatUrl
        ? `https://${rawChatUrl}`
        : ''

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="detail-modal-header">
          <div className="detail-title-area">
            <h2 className="detail-title">{note.title}</h2>

            {(note.date || note.folder) && (
              <div className="detail-meta">
                {note.date && <p className="detail-meta-text">📅 {note.date}</p>}
                {note.folder && <p className="detail-meta-text">📁 {note.folder}</p>}
              </div>
            )}
            {tags.length > 0 && (
              <div className="detail-tags">
                {tags.map((tag, index) => (
                  <span key={`${tag}-${index}`} className="detail-tag">
                    {tag}
                  </span>
                ))}
              </div>

            )}
          </div>

          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="detail-modal-body">
          {note.summary && (
            <div className="detail-section">
              <h3 className="detail-section-title">📝 要約</h3>
              <p className="detail-section-text">{note.summary}</p>
            </div>
          )}

          {note.questions && (
            <div className="detail-section">
              <h3 className="detail-section-title">❓ チャット中に出た疑問点</h3>
              <p className="detail-section-text">{note.questions}</p>
            </div>
          )}

          {note.important && (
            <div className="detail-section">
              <h3 className="detail-section-title">⭐ 重要な点</h3>
              <p className="detail-section-text">{note.important}</p>
            </div>
          )}

          {note.supplement && (
            <div className="detail-section">
              <h3 className="detail-section-title">補足の本文</h3>
              <p className="detail-section-text">{note.supplement}</p>
            </div>
          )}

          {safeChatUrl && (
            <div className="detail-section">
              <h3 className="detail-section-title">🔗 元のチャット</h3>
              <a
                href={safeChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link"
              >
                リンクを開く →
              </a>
            </div>
          )}

        </div>

        <div className="detail-modal-footer">
          <button className="detail-delete-button" onClick={handleDelete}>
            🗑️ このノートを削除
          </button>
          <button className="detail-close-button" onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailModal
