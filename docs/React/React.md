1. Reactとは
JSのライブラリ
画面をコンポーネント（部品）に分けて管理できる
(state)が変わると必要な部分だけ再描画する

2. なぜReactを使うのか
コンポーネントとして部品化できる
コードの再利用がしやすい
状態管理がしやすい
SPAを作りやすい
企業で採用されやすい、モダンな言語である

3. Reactの特徴
Component
拡張子のjsx
props
State
Hooks
Virtual DOM

4. Reactの考え方
データ(State)
⇓
UI
という考え方で作る

画面を直接操作ではなく
Stateを更新するとUIが変わる

5. ClipNoteでReactをどう使っているか
Header

↓

components/Header.jsx

Sidebar

↓

components/Sidebar.jsx

一覧

↓

components/NoteList.jsx

検索

↓

components/SearchBar.jsx



useState

⇓

検索文字

⇓ 

入力欄

⇓

画面更新

6. 学んだこと
HTMLを記載しているようでjsxという独自の形
stateを書き換えると画面が更新される仕組み

7. Reactで重要だと思った考え方
・コンポーネント単位で考える

・Stateを中心にUIを考える

・Propsでデータを渡す

・状態はできるだけ親で管理する

・画面よりデータを先に考える

8. 今後学ぶこと
Context API
React Router
カスタムHooks
パフォーマンス最適化
TypeScript

9. 疑問
・Context APIはいつ使う？

・Reduxとの違いは？

・useMemoはどんな時必要？

・Virtual DOMは実際どう比較している？

・Server Componentとは？