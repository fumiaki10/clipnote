import Card from './Card'

function MainArea({ notes, onDelete, onSelectNote }) {
  return (
    <main className="main-area">
      <div className="main-box">
        <h2 className="box-title">メインのボックス</h2>


        {notes.length === 0 ? (
          <div className="empty-state" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#666'
          }}>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>ノートがありません</p>

            <p style={{
              fontSize: '0.9rem',
              color: '#888'
            }}>左上の「＋新規作成」から最初のノートを追加してみましょう</p>
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
