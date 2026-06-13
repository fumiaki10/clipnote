# ClipNote

## 概要
Markdownで作成したノートを効率的に管理・整理するWebアプリケーションです。
学習記録や技術メモの検索性向上を目的に、React + TypeScriptで開発しました。

## 制作の背景・目的
プログラミング学習でMarkdownを使ってメモを取っていましたが、ファイル数が増えるにつれて「あのメモはどこに書いたっけ？」と探す時間が増加していました。

自分の学習効率を向上させるため、以下の機能を持つノート管理ツールを制作しました：
- ノートの一元管理
- 直感的な一覧・詳細表示
- ブラウザを閉じてもデータが保持される永続化

## 使用技術
- **フロントエンド:** React 18, TypeScript
- **ビルドツール:** Vite
- **データ保存:** LocalStorage API
- **デプロイ:** Vercel

## 主な機能
- ノートの新規作成・編集・削除
- 一覧表示とモーダルによる詳細表示
- LocalStorageによる自動データ保存
- レスポンシブ対応のUI

### ユーザー体験への配慮
初回アクセス時やノートを全削除した際に、ユーザーが「次に何をすればいいか」迷わないよう、空状態での案内メッセージを実装しました。


## 工夫した点・苦労した点

### LocalStorageを活用したデータ永続化
ユーザーがブラウザを閉じても作成したノートが失われないよう、LocalStorageと連携した状態管理を実装しました。

```javascript
const [notes, setNotes] = useState(() => {
  try {
    const savedNotes = localStorage.getItem('clipnote-notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  } catch (error) {
    console.error('データの読み込みでエラーが発生しました', error)
    return []
  }
})

useEffect(() => {
  try {
    localStorage.setItem('clipnote-notes', JSON.stringify(notes))
  } catch (error) {
    console.error('データの保存でエラーが発生しました', error)
  }
}, [notes])


本番環境でのデバッグ体験
Vercelへのデプロイ時に画面が真っ白になる問題が発生しました。

問題: ReferenceError: initialNotes is not defined

原因の特定プロセス:

ブラウザのConsole（開発者ツール）でエラーログを確認
未定義のinitialNotes変数を参照していることを発見
ローカル環境では既存のLocalStorageデータにより問題が隠蔽されていたが、本番環境（初回アクセス）では空の状態のため問題が表面化
解決策: 初期値の処理を見直し、LocalStorageにデータが存在しない場合は空配列を返すように修正しました。

この経験を通じて、ローカル環境と本番環境の差異を意識した堅牢なコード設計の重要性を学びました。

TypeScriptによる型安全性の確保
ノートデータの構造を型定義することで、開発中のバグを未然に防ぎ、保守性の高いコードを実現しました。

今後の改善予定
キーワード検索機能の実装
タグ付け・カテゴリ分類機能
Markdownプレビュー表示の強化
ダークモード対応
モバイル表示の最適化
デモ
🔗 Live Demo: https://clipnote-six.vercel.app

ローカル環境での動作方法
Copygit clone https://github.com/[あなたのユーザー名]/clipnote.git
cd clipnote
npm install
npm run dev
ブラウザで http://localhost:5173 にアクセスしてください。

制作者について
フロントエンドエンジニア・クリエイター志望として、「自分が本当に使いたいツール」を形にすることを大切にしています。ゲーム・アニメ・漫画などのオタク文化を愛し、エンターテイメントとテクノロジーを融合させた体験作りを目指しています。

Copy
**ステップ2：GitHubへの反映**

```bash
git add README.md
git commit -m "docs: Add comprehensive README with project details and debugging experience"
git push origin main