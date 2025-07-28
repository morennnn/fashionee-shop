const SearchFilter = ({
  draftSearch,
  setDraftSearch,
  applyFilters,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFilters();
    }
  };

  return (
    <div className="search">
      <label>
        <input
          type="text"
          placeholder="Search"
          className="input search-raw"
          value={draftSearch}
          onChange={(e) => setDraftSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src="/icons/search.svg"
          alt="search icon"
          className="search-icon"
          style={{ cursor: 'pointer' }}
          onClick={applyFilters}
        />
      </label>
    </div>
  );
};

export default SearchFilter;
