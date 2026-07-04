## 1. useState とは
* **`useState`**：コンポーネントの内部で管理する「状態（変化するデータ）」を扱うためのReact専用の機能（Reactフック）
* **`state`**：画面に表示され、ユーザーの操作（入力、クリック）によってリアルタイムで書き換わるデータのこと

**+a** **Reactフックとはクラスを書かなくても、状態（state）やライフサイクル（誕生⇒成長（変化）⇒消えるまでの一連の流れ）といったReactの機能を利用できるようにする特別な関数のこと**

* 例　useEffect,　useRef,　useMemo 

## 2. なぜ使うのか、なぜ必要なのか
[その技術や構文が存在する理由、使わないとどうなるか]
* 自動画面更新：通常の変数では値を書き換えても画面（DOM）が再描画されないが、reactは数値を書き得ると再描画までされる
* 状態の保持：関数コンポーネントは実行のたびに内部変数が初期化されるため、値を維持できない
* 使わないとどうなるか：let count = 0 でカウントアップしても、画面が再描画されないので0のまま

## 3. 記述の特徴と具体例


### 💡 [パターンA / 基本の書き方]
```jsx
import React, {useState}from 'react';

function Counter(){
  const [count,setCount] = useState(0)

  return(
    <button onClick={() =>
    setCount(count + 1)
    }>
      カウント:{count}
    </button>
  );
}
```
> **POINT:** 

### 💡 [パターンB / 応用・比較]
```jsx
import React, { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({ name: '田中', age: 20 });

  const celebrateBirthday = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <button onClick={celebrateBirthday}>
      {user.name}は{user.age}歳になりました
    </button>
  );
}

```
> **POINT:** POINT: オブジェクトを更新する際は、スプレッド構文（...）で既存の値をコピーする必要があります。

**+a**

**スプレット構文とは、箱の殻を破って、「中身をその場に分ける」といった機能**

---

### 📝 ＋α [関連するJavaScriptの基礎知識など]
[Reactの背景にあるJavaScriptの仕組み（配列、オブジェクト、非同期処理など）の補足]
```javascript
// 純粋なJSのコード例
// 1. 配列の分割代入の仕組み
const milkAndBread = ['牛乳', '食パン'];
const [item1, item2] = milkAndBread; 
console.log(item1); // '牛乳'

// 2. スプレッド構文によるオブジェクトの浅いコピー
const original = { id: 1, text: 'Hello' };
const updated = { ...original, text: 'Goodbye' }; 
console.log(updated); // { id: 1, text: 'Goodbye' }

```

---

## 4. ClipNoteではどのように使われている？
src/components/NoteEditor.jsx の中で、[ユーザーが入力中のノート本文をリアルタイムに保持・反映する機能] を実現するために使われています。

```jsx
// ClipNoteの実際のコードを切り出し（想定例）
import React, { useState } from 'react';

export function NoteEditor({ onSave }) {
  const [content, setContent] = useState('');

  return (
    <div className="editor">
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="メモを入力してください..."
      />
      <button onClick={() => onSave(content)}>保存</button>
    </div>
  );
}

```

### 💡 なぜこのように書かれているのか？
* **[理由1]**：ユーザーがキーボード入力を行うたびに onChange イベントが発生し、最新の文字列で content 状態を書き換えて画面の表示と同期させるため。
* **[理由2]**：「保存」ボタンが押された瞬間に、現在 state に安全に保持されている最新の文字列を親コンポーネント（API送信側）へ確実に渡すため。

**+a：APIについて**
**プログラム同士がデータをやり取りするための窓口のようなもの。ClipNoteで言うとAPIはブラウザ、データベース（サーバー）をつなぐ専用の受付のような役割を持っている**

## 5. 学んだこと
* useStateは値の変化⇒再描画まで自動でやる
* 状態を更新するときは、元のデータを書き換えずに新しい値やオブジェクトを代入する
mapやfrom

## 6. よくある疑問・間違い
* **Q. Too many re-renders. React limits the number of renders to prevent an infinite loop. というエラーが出ました。**
  * **A.** onClick={setCount(count + 1)} のように、関数の実行結果を渡してしまっています。これだとレンダリングのたびに更新関数が走り、無限ループになります。必ず onClick={() => setCount(count + 1)} とアロー関数で包んでください。
  onClick={setCount(count + 1)}と書くと、ボタンをクリックしたときではなく

「画面が描画された瞬間」にその場で関数が強制実行されてしまうから
レンダリング開始

⇒

JavaScriptのルールにのっとり、末尾に()がついているものは今すぐ実行せよという意味になる

⇒

ボタンがクリックされていなくても、その場でseCount(1)が実行

⇒

setCountが走りReactが値が更新されたことにより画面を再描画し始める

⇒

再度コンポーネントを上から実行し始める

⇒

結果onClickが呼ばれる
onClick=(2)が呼ばれる
の流れで無限ループになる


**解決策：アロー関数で包むと直る**

onclick={() => setCount(count + 1)}にする

予約の形になる。「まだ実行しない」という状態をonClickに渡したことになる

画面が描画されるときに予約券を置いておくだけ⇒ボタンをクリックしたとき予約をsetCountを確約（実行）にするという処理になる

* **Q. 更新関数（setCountなど）を使った直後に値を確認すると、古い値のままなのはなぜ？**
  * **A.** useState の更新は非同期（バックグラウンドでまとめて処理）で行われる。関数が終了し、次の再描画が走るまで変数の値自体は変わらない。最新の値を使いたい場合は、更新関数に渡した値そのものを変数に切り出して使い回す必要がある。
```js
  function MyComponent() {
  const [list, setList] = useState(['A', 'B']); // ① この回の list は ['A', 'B'] で固定

  const handleAdd = () => {
    const newList = [...list, 'C']; // ['A', 'B', 'C'] を作成
    setList(newList);              // ② Reactに「次、これで再描画してね」と依頼

    console.log(list);             // ③ ここで確認しても、この関数内の list はまだ ① の ['A', 'B'] のまま
    console.log(newList) //ここで作成された['A', 'B', 'C']が出る。スプレット構文のおかげで足された結果が表示されている
  };
}
```

  

## 7. 関連する技術
* **useReducer**：複数の状態が絡み合う複雑なロジックを、1つの状態管理にまとめるための上位フック。
* **Context API**：バケツリレー（Propsの多段渡し）をせずに、遠く離れたコンポーネント間で state を共有する仕組み。
