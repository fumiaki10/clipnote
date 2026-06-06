import Card from './Card'

const sampleNotes = [
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

function MainArea() {
  return (
    <main className="main-area">
      <div className="main-box">
        <h2 className="box-title">メインのボックス</h2>
        <div className="cards-grid">
          {sampleNotes.map((note) => (
            <Card key={note.id} note={note} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainArea
