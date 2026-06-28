function Header({
    searchTerm,
    onChangeSearch,
    tags = [],
    selectedTag,
    onSelectTag
}) {
    return (
        <header className="header">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="タイトル・要約・タグ・フォルダーで検索"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => onChangeSearch(e.target.value)}
                />
            </div>

            <div className="tag-filter">
                <span className="tag-label">タグ絞り込み</span>

                <button
                    className={`tag-button ${selectedTag === 'all' ? 'active' : ''}`}
                    onClick={() => onSelectTag('all')}
                >
                    すべて
                </button>

                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => onSelectTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </header>
    )
}

export default Header