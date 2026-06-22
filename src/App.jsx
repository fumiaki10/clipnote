import { useState, useEffect, useMemo } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainArea from './components/MainArea'
import NewNoteModal from './components/NewNoteModal'
import NoteDetailModal from './components/NoteDetailModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [selectedFolder, setSelectedFolder] = useState('all')

  // LocalStorageからデータを読み込む
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('clipnote-notes')
      return savedNotes ? JSON.parse(savedNotes) : []
    } catch (error) {
      console.error('データの読み込みでエラーが発生しました', error)
      return []
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

  // 一覧用のタグ配列
  const allTags = useMemo(() => {
    return [...new Set(notes.flatMap((note) => note.tags || []))]
  }, [notes])

  // 一覧用のフォルダー配列
  const allFolders = useMemo(() => {
    return [
      ...new Set(
        notes
          .map((note) => note.folder)
          .filter((folder) => folder && folder.trim() !== '')
      ),
    ]
  }, [notes])

  // フィルター済みノート一覧
  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return notes.filter((note) => {
      const searchTarget = [
        note.title,
        note.summary,
        note.questions,
        note.important,
        note.folder,
        ...(note.tags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        normalizedSearch === '' || searchTarget.includes(normalizedSearch)

      const matchesTag =
        selectedTag === 'all' || (note.tags || []).includes(selectedTag)

      const matchesFolder =
        selectedFolder === 'all' || note.folder === selectedFolder

      return matchesSearch && matchesTag && matchesFolder
    })

  }, [notes, searchTerm, selectedTag, selectedFolder])

  const hasActiveFilters =
    searchTerm.trim() !== '' || selectedTag !== 'all' || selectedFolder !== 'all'

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedTag('all')
    setSelectedFolder('all')
  }

  // 新しいノートを追加する関数
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setIsModalOpen(false)
  }

  // 削除機能
  const handleDeleteNote = (idToDelete) => {
    if (window.confirm('このノートを削除してもよろしいですか？')) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idToDelete))

      if (selectedNote && selectedNote.id === idToDelete) {
        setSelectedNote(null)
      }
    }
  }

  return (
    <div className="app-container">
      <Sidebar
        onClickNew={() => setIsModalOpen(true)}
        folders={allFolders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onResetFilters={handleResetFilters}
      />

      <div className="main-content">
        <Header
          searchTerm={searchTerm}
          onChangeSearch={setSearchTerm}
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        <MainArea
          notes={filteredNotes}
          totalNotesCount={notes.length}
          hasActiveFilters={hasActiveFilters}
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
