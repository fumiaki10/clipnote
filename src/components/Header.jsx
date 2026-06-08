function Header(){
    const tags = ['基本情報','セキュリティ','自己分析','もっと見る']

    return(
        <header className="header">
            <div className="search-container">
                <input 
                type="text"
                placeholder="検索"
                className="search-input"
                />
            </div>

            <div className="tag-filter">
                <span className="tag-label">検索用のタグ</span>
                {tags.map((tag) =>(
                    <button key={tag} className="tag-button">
                        {tag}
                    </button>
                ))}
            </div>
        </header>
    )
}

export default Header