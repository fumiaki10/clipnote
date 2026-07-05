## 1. Componentとは
ReactでUIを部品として管理する仕組み

画面全体ではなく、
HeaderやSidebarなど役割ごとに分けて作成する

## 2. なぜComponentを使うのか
再利用できる
保守しやすい
役割ごとに分けられる
複数人で開発しやすい

なぜ？
⇓
1つのファイルが大きくなりすぎないため
複数人で見た時、どの処理がどこにあるのかといった視認性、またそれぞれの役割を認識しやすい

役割を分けることで互いに干渉する状態を減らし、エラーやバグを未然に防げる
## 3. Componentの種類
親コンポーネント

子コンポーネント

共通コンポーネント

## 4. ClipNoteではどう使っているか
App

├── Header

├── Sidebar

├── SearchBar

├── NoteList

└── Footer　⇒　現在未実装


Header

↓

components/Header.jsx

役割

タイトル表示

--------------------

Sidebar

↓

components/Sidebar.jsx

役割

メニュー表示

## 5. 学んだこと
親コンポーネント＞子コンポーネントの関係
親が共通、子が分離

複数ファイルに分けることで役割の明確さ、修正のしやすさにつながる

## 6. よくある疑問
Propsの渡し方は？


いつComponentを分ける？

どこまで分割する？

Componentが増えすぎたら？

## 7. 関連する技術
コンポーネント
・Presentational
・Container

Props
State
useState
useEffect