import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainArea from './components/MainArea'
import NewNoteModal from './components/NewNoteModal'
import NoteDetailModal from './components/NoteDetailModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  // LocalStorageからデータを読み込む
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('clipnote-notes')
      return savedNotes ? JSON.parse(savedNotes) : initialNotes
    } catch (error) {
      console.error('データの読み込みでエラーが発生しました', error)
      return initialNotes
    }
  })

  // notesが変わるたびに自動でLocalStorageに保存
  useEffect(() => {
    try {
      localStorage.setItem('clipnote-notes', JSON.stringify(notes))
    } catch (error) {
      console.error('データの保存でエラーが発生しました', error)
    }
  }, [notes])

  // 新しいノートを追加する関数
  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes])//配列の先頭に新しいノートを追加
    setIsModalOpen(false)//モーダルを閉じる
  }
  // 削除機能
  const handleDeleteNote = (idToDelete) => {
    if (window.confirm('このノートを削除してもよろしいですか？')) {
      setNotes(notes.filter(note => note.id !== idToDelete))

      if (selectedNote && selectedNote.id === idToDelete) {
        setSelectedNote(null)
      }
    }
  }

  return (
    <div className="app-container">
      <Sidebar onClickNew={() => setIsModalOpen(true)} />
      <div className="main-content">
        <Header />
        <MainArea
          notes={notes}
          onDelete={handleDeleteNote}
          onSelectNote={setSelectedNote}
        />
      </div>

      {isModalOpen && (
        <NewNoteModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddNote}
        />

      )}

      {/* 詳細表示モーダル */}
      {selectedNote && (
        <NoteDetailModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  )
}

export default App
