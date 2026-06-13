Local Storageと useEffect

Local Storage はブラウザにデータを保存して置ける仕組み
const savedNotes = localStorage.getItem('clipnote-notes')
これはclipnote-notesという名前で保存されているデータを取り出す

localStorageは文字列のみ保存できるため、値とかはいったん変換する必要あり

保存時
localStorage.setItem('clipnote-notes',JSON.stringify(notes))
取り出し時
JSON.parse(savedNotes)

JSON.stringifyで文字列に変換
JSON.parse(savedNotes)で文字列を元の配列やオブジェクトに戻す


useEffect はReactコンポーネントの表示後「追加で実行したい処理」を書くためのもの

useEffect(() => {
  try{
    localStorage.setItem('clipnote-notes',JSON.stringify(notes))
  }catch(error){
    console.error('データの保存でエラーが発生しました',error)
  }
},{notes})
notesが変わったら、そのたびにlocalStorageに保存する
最後の{notes}は依存配列
この値が変化したときだけeffectを実行する

useEffectは状態が変わった後に自動で保存処理を走らせる

const [notes, setNotes] = useState(() => {
  try {
    const savedNotes = localStorage.getItem('clipnote-notes')
    return savedNotes ? JSON.parse(savedNotes) : initialNotes
  } catch (error) {
    console.error('データの読み込みでエラーが発生しました:', error)
    return initialNotes
  }
})
が実際どういう処理になっているか
useState(() => {...}) localStorageに保存済みのノートがあるか確認


 const savedNotes = localStorage.getItem('clipnote-notes')
ブラウザのストレージ内を検索⇒保存されているデータを返す
指定したキーがない場合はnullを返す
clipnote-notesがあるならそのデータを返す