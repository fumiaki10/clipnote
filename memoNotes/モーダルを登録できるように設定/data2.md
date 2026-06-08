NewNoteModal

function NewNoteModal({onClose,onSave})

handleSave
!inputText.trim
inputText = " "空白のみ
.trimで""空白が消える
!""はtrue

javascriptは空の物をfalseとみなすルールがあるので
inputText.trimしたあと空白ならfalseになる

if(!inputText.trim()) 空白であるなら　falseでないならという意味になる。つまりtrueなら

<NewNoteModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddNote}
        />

        onCloseとonSaveはAppからきている

        onClose　閉じる
        onSaveは　newNoteをnotesの後ろにつける



  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes])//配列の先頭に新しいノートを追加
    setIsModalOpen(false)//モーダルを閉じる
  }

   const newNote = {
      id: Date.now(),
      title: '新しいノート（仮）',
      tags: ['新規'],
      summary: inputText.substring(0, 100) + '...',
      questions: null,
      important: null
    }

    newNoteの中身




    この辺でどうやってモーダル開いているのかわかんなくなった
     {isModalOpen && (
        <NewNoteModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddNote}
        />
      )}
      ここにモーダル開くための条件式書いてあった
      trueなら描画するみたいな書きかた
      初期値falseだから見えないけど新規登録押すとtrueになって見えるようになる