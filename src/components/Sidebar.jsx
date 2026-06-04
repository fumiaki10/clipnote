function Sidebar({onClickNew}){
  return(
    <aside className="sidebar">
      <div className="sidebar-section">
        <h1 className="app-title">clipnote</h1>
        <button className="new-button" onClick={onClickNew}>
          +新規作成
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">ナビゲーション</h3>
          <ul className="nav-list">
            <li className="nav-item">ホーム</li>
            <li className="nav-item">新規作成</li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">フォルダー一覧</h3>
          <ul className="nav-list">
            <li className="nav-item">all</li>
            <li className="nav-item">資格勉強</li>
            <li className="nav-item">自己分析</li>
            <li className="nav-item">ゲーム開発</li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <span>設定</span>
      </div>
    </aside>
  )
}

export default Sidebar