import { useState, useEffect } from 'react';
import '../styles/shop.css';
import productsJson from '../data/products.json';
import ProductCard from '../components/ProductCard';
import ReactSlider from 'react-slider';
import { useMemo } from 'react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('RELEVANCE');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 221]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const itemsPerPage = 12;
  const productsData = productsJson.products;

  const categoryMap = {
    'All': 'All',
    'Men': 'men',
    'Women': 'women',
    'Accessories': 'accessories',
    'New Arrivals': 'new'
  };

  const reviewedProducts = useMemo(() => {
    const shuffled = [...productsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  const [draftSearch, setDraftSearch] = useState('');
  const [draftCategory, setDraftCategory] = useState('All');
  const [draftColors, setDraftColors] = useState([]);
  const [draftPriceRange, setDraftPriceRange] = useState([0, 221]);

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortType, activeCategory]);

  useEffect(() => {
    setDraftSearch(searchTerm);
    setDraftCategory(activeCategory);
    setDraftColors(selectedColors);
    setDraftPriceRange(priceRange);
  }, []);

  const toggleFavorite = (id) => {
  const updated = favorites.includes(id)
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];
  setFavorites(updated);
  localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const filtered = productsData
  .filter(product =>
    (product.name || '').toLowerCase().includes(searchTerm.trim().toLowerCase())
  )
  .filter(product => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'New Arrivals') return product.isNew;
    return product.categories.includes(activeCategory);
  })
  .filter(product =>
    selectedColors.length === 0 || selectedColors.includes(product.color)
  )
  .filter(product =>
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortType === 'ASC') {
      return a.name.localeCompare(b.name);
    } else if (sortType === 'PRICE') {
      return a.price - b.price;
    } else {
      return 0; 
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const availableColors = Array.from(
    new Set(productsData.map(p => p.color).filter(Boolean))
  );

return (
  <div className="container">
    <div className="content">
      <div className="shop">

        {/* SIDEBAR */}
        <div className="sidebar">
          {/* Search */}
          <div className="search">
            <label>
              <input
                type="text"
                placeholder="Search"
                className="input search-raw"
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
              />
              <img src="/icons/search.svg" alt="search icon" className="search-icon" />
            </label>
          </div>

          {/* Categories */}
          <div className="sidebar-item">
            <div className="sidebar-title">Categories</div>
            <div className="sidebar-content">
              <ul className="custom-list">
                {['All', 'Men', 'Women', 'Accessories', 'New Arrivals'].map(category => (
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

          {/* Price Range */}
          <div className="sidebar-item">
            <div className="sidebar-title">Price</div>
            <div className="sidebar-content">
              <div className="price-bar">
                <ReactSlider
                  className="range-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  min={0}
                  max={221}
                  value={draftPriceRange}
                  onChange={setDraftPriceRange}
                  pearling
                  minDistance={10}
                  renderThumb={(props, state) => (
                    <div {...props} className="thumb">
                      <div className="thumb-label">${state.valueNow.toFixed(2)}</div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="sidebar-item">
            <div className="sidebar-title">Colors</div>
            <div className={`sidebar-content collapsible ${showColors ? 'expanded' : 'collapsed'}`}>
              <div className="colors">
                {availableColors.map(color => (
                  <div className="color" key={color}>
                    <input
                      type="checkbox"
                      className="color-checkbox"
                      id={color}
                      value={color}
                      checked={draftColors.includes(color)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDraftColors(prev =>
                          prev.includes(value)
                            ? prev.filter(c => c !== value)
                            : [...prev, value]
                        );
                      }}
                    />
                    <label htmlFor={color} className="color-name">{color}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collapse toggle */}
          <div
            className="deploy-toggle"
            onClick={() => setShowColors(prev => !prev)}
          >
            <img
              src="/icons/chevron-down.svg"
              alt="chevron"
              className={`deploy-icon ${showColors ? '' : 'rotated'}`}
            />
            <span className="deploy-text">Deploy</span>
          </div>

          {/* Apply Filter */}
          <div className="sidebar-item">
            <div className="button-wrapper">
              <button
                className="button"
                onClick={() => {
                  setSearchTerm(draftSearch);
                  setActiveCategory(draftCategory);
                  setSelectedColors(draftColors);
                  setPriceRange(draftPriceRange);
                }}
              >
                Apply Filter
              </button>
              <div className="vertical-line"></div>
            </div>
          </div>

          {/* Reviewed by you */}
          <div className="sidebar-item">
            <div className="sidebar-title">Reviewed by you</div>
            <div className="sidebar-content">
              <div className="reviewed-products">
                {reviewedProducts.map((product) => (
                  <div className="product" key={product.id}>
                    <div className="image">
                      <img src={product.image} alt={product.name.split('#')[0].trim()} />
                    </div>
                    <div className="info">
                      <div className="name">{product.name.split('#')[0].trim()}</div>
                      <div className="price">
                        <div className="current-price">${product.price}</div>
                        {product.oldPrice && (
                          <div className="old-price">${product.oldPrice}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="banner">
            <a href="#">
              <img src="/images/season-sale.svg" alt="season sale banner" />
            </a>
          </div>
        </div>

        {/* MAIN CONTENT: PRODUCTS */}
        <div className="products-wrapper">
          <div className="sort-and-count">
            <div className="products-count">
              There are <span className="bold">{sortedProducts.length}</span> products in this category
            </div>
            <div className="sort">
              <select
                className="input"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="RELEVANCE">Relevance</option>
                <option value="ASC">A–Z</option>
                <option value="PRICE">Price</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="no-results">No products found</div>
          ) : (
            <div className="products">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                />
              ))}
            </div>
          )}

          <div className="pagination">
            <div
              className="button left"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <img src="/icons/left-pagin-arrow.svg" alt="prev" />
            </div>
            <div className="pages">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i + 1}
                  className={`page ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div
              className="button right"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <img src="/icons/right-pagin-arrow.svg" alt="next" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* NEWSLETTER */}
    <div className="wrapper">
      <div className="newsletter">
        <div className="container-points">
          <img src="icons/points-mini.svg" alt="points" />
        </div>
        <div className="info">
          <div className="title">Newsletter</div>
          <div className="description">
            Be the first to hear about deals, offers and upcoming collections.
          </div>
        </div>
        <div className="entry-field">
          <input type="text" name="entry-field" className="input" placeholder="Enter your email" />
          <div className="button-wrapper">
            <button className="button">Subscribe</button>
            <div className="vertical-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Shop;