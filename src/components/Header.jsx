function Header({
    searchTerm,
    setSearchTerm,
    selectedTag,
    setSelectedTag,
    visibleHeaderTags,
    hiddenHeaderTagCount,
}) {
    return (
        <header className="header">
            <div className="header-top">
                <input
                    type="text"
                    className="search-input"
                    placeholder="ノートを検索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="header-tags">
                {visibleHeaderTags.map(({ tag, count }) => (
                    <button
                        key={tag}
                        className={`header-tag-button ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                    >
                        <span className="header-tag-label">#{tag}</span>
                        <span className="header-tag-count">{count}</span>
                    </button>
                ))}

                {hiddenHeaderTagCount > 0 && (
                    <span className="header-tag-more">+{hiddenHeaderTagCount}</span>
                )}
            </div>
        </header>
    )
}

export default Header
