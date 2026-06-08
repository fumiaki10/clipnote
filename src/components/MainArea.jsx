import Card from './Card'

function MainArea({ notes }) {
  return (
    <main className="main-area">
      <div className="main-box">
        <h2 className="box-title">メインのボックス</h2>
        <div className="cards-grid">
          {notes.map((note) => (
            <Card key={note.id} note={note} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainArea
