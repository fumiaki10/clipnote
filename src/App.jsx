import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainArea from './components/MainArea'
import NewNoteModal from './components/NewNoteModal'

// 初期ノートサンプルデータ
const initialNotes = [
  {
    id: 1,
    title: '自己理解・学習ログ・自分の核についての考察',
    tags: ['自己理解', '学習', 'ライフログ'],
    summary: '学習中に結果を急ぎすぎる傾向を分析。自分のペースを尊重した学習方法について考察。',
    questions: '焦りは向上心なのか、それとも周囲との比較による不安なのか。',
    important: '構造化・理解・改善・構築という一貫した傾向が自分の核にある。'
  },
  {
    id: 2,
    title: '基本情報処理試験 問13の解説',
    tags: ['基本情報', 'セキュリティ'],
    summary: '認証と認可の違い、アクセス制御の3要素について整理。',
    questions: 'RBACとACLの使い分けがまだ曖昧。',
    important: 'アクセス制御の3要素：認証・認可・監査。'
  },
  {
    id: 3,
    title: 'Reactコンポーネント設計の基本',
    tags: ['React', '学習'],
    summary: 'コンポーネントの分割方針と再利用性について学習。',
    questions: null,
    important: '単一責任の原則を意識してコンポーネントを設計する。'
  }
]

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    }
  }

  return (
    <div className="app-container">
      <Sidebar onClickNew={() => setIsModalOpen(true)} />
      <div className="main-content">
        <Header />
        <MainArea notes={notes} onDelete={handleDeleteNote} />
      </div>

      {isModalOpen && (
        <NewNoteModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddNote}
        />
      )}
    </div>
  )
}

export default App
