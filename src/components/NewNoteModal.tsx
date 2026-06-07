type NewNoteModalProps = {
  onClose: () => void;
};


function NewNoteModal({ onClose }: NewNoteModalProps) {
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
          <button className="save-button">
            保存（v1では表示のみ）
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewNoteModal
