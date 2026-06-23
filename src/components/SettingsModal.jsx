function SettingsModal({
  onClose,
  onExport,
  onImport,
  onDeleteAll,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    onImport(file)

    e.target.value = ''

  }


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="settings-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-modal-header">
          <h2 className="settings-modal-title">設定</h2>
          <button className="close-button" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <div className="settings-modal-body">
          <div className="settings-section">
            <h3 className="settings-section-title">データ管理</h3>
            <p className="settings-section-text">
              ノートのバックアップや復元ができます。
            </p>


            <div className="settings-actions">
              <button className="settings-button primary" onClick={onExport}>
                JSONでエクスポート
              </button>

              <label className="settings-file-label">
                JSONをインポート
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="settings-file-input"
                />

              </label>
            </div>
          </div>

          <div className="settings-section danger-section">
            <h3 className="settings-section-title">危険な操作</h3>
            <p className="settings-section-text">
              保存済みのノートをすべて削除します。取り消しはできません。
            </p>

            <button className="settings-button danger" onClick={onDeleteAll}>
              全ノートを削除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal