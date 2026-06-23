function Sidebar({
  onClickNew,
  folders,
  selectedFolder,
  onSelectFolder,
  onResetFilters,
  onClickSettings
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h1 className="app-title">clipNote</h1>
        <button className="new-button" onClick={onClickNew}>
          +新規作成
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">ナビゲーション</h3>
          <ul className="nav-list">
            <li>
              <button className="nav-item nav-button" onClick={onResetFilters}>
                ホーム
              </button>
            </li>
            <li>
              <button className="nav-item nav-button" onClick={onClickNew}>
                新規作成
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">フォルダー一覧</h3>
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item nav-button ${selectedFolder === 'all' ? 'active' : ''
                  }`}
                onClick={() => onSelectFolder('all')}
              >
                すべて
              </button>
            </li>

            {folders.length > 0 ? (
              folders.map((folder) => (
                <li key={folder}>
                  <button
                    className={`nav-item nav-button ${selectedFolder === folder ? 'active' : ''
                      }`}
                    onClick={() => onSelectFolder(folder)}
                  >
                    {folder}
                  </button>
                </li>
              ))
            ) : (
              <li className="nav-empty">フォルダーはまだありません</li>
            )}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-settings-button" onClick={onClickSettings}>
          設定
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
