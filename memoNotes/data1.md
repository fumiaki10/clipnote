NewNoteModalで管理していたsampleデータをapp.jsxで管理
 const [notes, setNotes] = useState([
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
  ])
  初期値は配列でuseStateで管理

  新しいノートを追加するための関数を追記
   const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes])//配列の先頭に新しいノートを追加
    setIsModalOpen(false)//モーダルを閉じる
  }


MainArea notes={notes}
MainAreaのfunction MainArea({ notes }) {
  に飛ぶ
   <MainArea notes={notes} />
  ⇩
  左側のnotes 子コンポーネントMainAreaで受け取るときの名前
  右側　親が持っているstateデータ
  親が持っているnotesの配列データをMainAreaコンポーネントににこれを使って画面に表示してくれと言っている

  notesのデータはいたるところで使うので共通の親で管理
  複数の子が使えるようにしている

  handleAddNoteは
  newNoteを「」コンポーネントから受け取ってnotesの後ろに追記するやつ


     <NewNoteModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleAddNote}
        />
    onCloseにsetIsModalOpen(false)を渡している
   　const [isModalOpen, setIsModalOpen] = useState(false)


    onSaveにhandleAddNoteを渡している
    const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes])//配列の先頭に新しいノートを追加
    setIsModalOpen(false)//モーダルを閉じる
  }


App.jsx（データの管理者）
│
│  [state] notes = [...] ← ノートデータの本体
│  [state] isModalOpen = false ← モーダルの表示状態
│
├─ MainArea
│    └─ props: notes={notes}
│         └─ 受け取ったnotesデータを画面に表示
│
└─ NewNoteModal（isModalOpenがtrueのときだけ表示）
     ├─ props: onClose → 実行するとモーダルが閉じる
     └─ props: onSave → 実行すると新しいノートが追加される
