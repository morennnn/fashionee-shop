const SortAndCount = ({ total, sortType, onChangeSort }) => {
  return (
    <div className="sort-and-count">
      <div className="products-count">
        There are <span className="bold">{total}</span> products in this category
      </div>
      <div className="sort">
        <select
          className="input"
          value={sortType}
          onChange={(e) => onChangeSort(e.target.value)}
        >
          <option value="RELEVANCE">Relevance</option>
          <option value="ASC">A–Z</option>
          <option value="PRICE">Price</option>
        </select>
      </div>
    </div>
  );
};

export default SortAndCount;
