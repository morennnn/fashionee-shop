const CategoryFilter = ({ draftCategory, setDraftCategory }) => {
  const categories = ['All', 'Men', 'Women', 'Accessories', 'New Arrivals'];

  return (
    <div className="sidebar-item">
      <div className="sidebar-title">Categories</div>
      <div className="sidebar-content">
        <ul className="custom-list">
          {categories.map(category => (
            <li
              key={category}
              className={`item ${draftCategory === category ? 'active' : ''}`}
              onClick={() => setDraftCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
