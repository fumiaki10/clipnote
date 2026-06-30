import Card from './Card'

function MainArea({
  notes,
  totalNotesCount,
  hasActiveFilters,
  searchTeam,
  selectedTag,
  onResetFilters,
  onDelete,
  onSelectNote
}) {
  return (
    <main className="main-area">
      <div className="main-box">
        <div>
          <h2 className="box-title">ノート一覧</h2>
          <p className="note-count">
            {hasActiveFilters
              ? `${notes.length} / ${totalNotesCount}件`
              : `${totalNotesCount}件`
            }
          </p>
        </div>

        {hasActiveFilters && (
          <button className="reset-filters-button" onClick={onResetFilters}>
            絞り込み解除
          </button>
        )}

        {totalNotesCount === 0 ? (
          <div className="empty-state" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <p className='empty-state-title' style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>ノートがありません
            </p>

            <p className='empty-state-text' style={{
              fontSize: '0.9rem',
              color: '#888'
            }}>左上の「＋新規作成」から最初のノートを追加してみましょう
            </p>
          </div>
        ) : notes.length === 0 && hasActiveFilters ? (
          <div className="empty-state" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <p className='empty-state-title' style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>条件に一致するノートがありません
            </p>

            <p className='empty-state-text' style={{
              fontSize: '0.9rem',
              color: '#888'
            }}>検索ワードやタグ、フィルター条件を変えてみてください
            </p>
          </div>
        ) : (
          <div className="cards-grid">
            {notes.map((note) => (
              <Card
                key={note.id}
                note={note}
                onDelete={onDelete}
                onSelect={onSelectNote}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default MainArea
