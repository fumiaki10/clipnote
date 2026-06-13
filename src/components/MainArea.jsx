import Card from './Card'

function MainArea({ notes, onDelete }) {
  return (
    <main className="main-area">
      <div className="main-box">
        <h2 className="box-title">メインのボックス</h2>
        <div className="cards-grid">
          {notes.map((note) => (
            <Card
              key={note.id}
              note={note}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainArea
