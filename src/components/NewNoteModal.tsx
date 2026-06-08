import { useState } from 'react'

function NewNoteModal({ onClose, onSave }) {
  const [inputText, setInputText] = useState('')

  const handleSave = () => {
    if (!inputText.trim()) {
      alert('テキストを入力してください')
      return
    }

    // デフォルト値の設定
    let extractedTitle = '無題のノート'
    let extractedTags = ['未分類']
    let extractedSummary = ''
    let extractedQuestions = null
    let extractedImportant = null

    try {
      // 1. フロントマター（---で囲まれた部分）からタイトルとタグを抽出
      const frontMatterMatch = inputText.match(/---\n([\s\S]*?)\n---/);
      if (frontMatterMatch) {
        const frontMatter = frontMatterMatch[1];

        // タイトルの抽出（title: の後の文字列）
        const titleMatch = frontMatter.match(/title:\s*(.*)/);
        if (titleMatch) extractedTitle = titleMatch[1].trim();

        // タグの抽出（[タグ1, タグ2] の形式）
        const tagsMatch = frontMatter.match(/tags:\s*\[(.*?)\]/);
        if (tagsMatch) {
          extractedTags = tagsMatch[1].split(',').map(tag => tag.trim());
        }
      }

      // 2. 本文セクションの解析
      // ## 要約 の下の内容を抽出
      const summaryMatch = inputText.match(/##\s*要約\n([\s\S]*?)(?=\n##|$)/);
      if (summaryMatch) {
        extractedSummary = summaryMatch[1].trim();
      } else {
        // 要約セクションがない場合は最初の100文字を使用
        extractedSummary = inputText.substring(0, 100) + '...';
      }

      // ## チャット中に出た疑問点 の下の内容を抽出
      const questionsMatch = inputText.match(/##\s*チャット中に出た疑問点\n([\s\S]*?)(?=\n##|$)/);
      if (questionsMatch) extractedQuestions = questionsMatch[1].trim();

      // ## 重要な点 の下の内容を抽出
      const importantMatch = inputText.match(/##\s*重要な点\n([\s\S]*?)(?=\n##|$)/);
      if (importantMatch) extractedImportant = importantMatch[1].trim();

    } catch (error) {
      console.error("Markdownの解析でエラーが発生しました:", error);
      // エラーが発生しても最低限の情報で保存を続行
      extractedSummary = inputText.substring(0, 100) + '...';
    }

    // 解析結果で新しいノートを作成
    const newNote = {
      id: Date.now(),
      title: extractedTitle,
      tags: extractedTags,
      summary: extractedSummary,
      questions: extractedQuestions,
      important: extractedImportant
    }

    onSave(newNote)
    setInputText('')
  }


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">ファイルをアップロードしてください</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            ChatGPTで作成したMarkdownテンプレートを<br />
            ここにペーストしてください
          </p>

          <textarea
            className="markdown-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`---
title: タイトルを入力
date: 2024-12-19
folder: 資格勉強
tags: [基本情報, セキュリティ]
chat_url: https://chat.openai.com/c/xxxxxxxx
---

## 要約
・ここに要約を書く

## チャット中に出た疑問点
・疑問点があれば書く

## 重要な点
・重要なポイントを箇条書き`}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            キャンセル
          </button>
          <button className="save-button" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewNoteModal
