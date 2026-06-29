import { useState } from 'react'

function NewNoteModal({ onClose, onSave }) {
  const [inputText, setInputText] = useState('')

  const handleSave = () => {
    if (!inputText.trim()) {
      alert('テキストを入力してください')
      return
    }

    // デフォルト値
    let extractedTitle = '無題のノート'
    let extractedDate = ''
    let extractedFolder = '未分類'
    let extractedTags = ['未分類']
    let extractedChatUrl = ''
    let extractedSummary = ''
    let extractedQuestions = ''
    let extractedImportant = ''
    let extractedSupplement = ''


    try {
      // フロントマター抽出
      const frontMatterMatch = inputText.match(/---\n([\s\S]*?)\n---/)
      if (frontMatterMatch) {
        const frontMatter = frontMatterMatch[1]

        const titleMatch = frontMatter.match(/title:\s*(.*)/)
        if (titleMatch) extractedTitle = titleMatch[1].trim()

        const dateMatch = frontMatter.match(/date:\s*(.*)/)
        if (dateMatch) extractedDate = dateMatch[1].trim()

        const folderMatch = frontMatter.match(/folder:\s*(.*)/)
        if (folderMatch) extractedFolder = folderMatch[1].trim()

        const tagsMatch = frontMatter.match(/tags:\s*\[(.*?)\]/)
        if (tagsMatch) {
          const parsedTags = tagsMatch[1]
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '')

          if (parsedTags.length > 0) {
            extractedTags = parsedTags
          }
        }

        const chatUrlMatch = frontMatter.match(/chat_url:\s*(.*)/)
        if (chatUrlMatch) extractedChatUrl = chatUrlMatch[1].trim()
      }

      // 本文抽出
      const summaryMatch = inputText.match(/##\s*要約\s*\n([\s\S]*?)(?=\n##|$)/)
      if (summaryMatch) {
        extractedSummary = summaryMatch[1].trim()
      } else {
        extractedSummary = inputText.substring(0, 100) + '...'
      }

      const questionsMatch = inputText.match(/##\s*チャット中に出た疑問点\s*\n([\s\S]*?)(?=\n##|$)/)
      if (questionsMatch) extractedQuestions = questionsMatch[1].trim()

      const importantMatch = inputText.match(/##\s*重要な点\s*\n([\s\S]*?)(?=\n##|$)/)
      if (importantMatch) extractedImportant = importantMatch[1].trim()
      const supplementMatch = inputText.match(/##\s*補足\s*\n([\s\S]*?)(?=\n##|$)/)
      if (supplementMatch) extractedSupplement = supplementMatch[1].trim()
    } catch (error) {
      console.error('Markdownの解析でエラーが発生しました:', error)
      extractedSummary = inputText.substring(0, 100) + '...'
    }

    const newNote = {
      id: Date.now(),
      title: extractedTitle,
      date: extractedDate,
      folder: extractedFolder,
      tags: extractedTags,
      chat_url: extractedChatUrl,
      summary: extractedSummary,
      questions: extractedQuestions,
      important: extractedImportant,
      supplement: extractedSupplement,
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
            ChatGPTで作成したMarkdownテンプレートを
            <br />
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
・重要なポイントを箇条書き

## 補足
・補足が必要ならここに追記
`}
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
