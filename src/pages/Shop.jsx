import { useState, useEffect } from 'react';
import '../styles/shop.css';
import productsJson from '../data/products.json';
import ProductCard from '../components/ProductCard';
import SortAndCount from '../components/SortAndCount';
import SearchFilter from '../components/filters/SearchFilter';
import CategoryFilter from '../components/filters/CategoryFilter';
import PriceFilter from '../components/filters/PriceFilter';
import ColorFilter from '../components/filters/ColorFilter';
import ApplyFilter from '../components/filters/ApplyFilter';
import ReviewedByYou from '../components/ReviewedByYou';
import Newsletter from '../components/Newsletter';
import Pagination from '../components/Pagination';
import ReactSlider from 'react-slider';
import { useMemo } from 'react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('RELEVANCE');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 221]);
  const [selectedColors, setSelectedColors] = useState([]);
  const applyFilters = () => {
    setSearchTerm(draftSearch);
    setActiveCategory(draftCategory);
    setSelectedColors(draftColors);
    setPriceRange(draftPriceRange);
    setCurrentPage(1);
  };
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

  const addToCart = (product) => {
  const stored = localStorage.getItem('cart');
  const cart = stored ? JSON.parse(stored) : [];

  const index = cart.findIndex(item => item.id === product.id);
  if (index >= 0) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
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
          <SearchFilter
            draftSearch={draftSearch}
            setDraftSearch={setDraftSearch}
            applyFilters={applyFilters}
          />

          {/* Categories */}
          <CategoryFilter
            draftCategory={draftCategory}
            setDraftCategory={setDraftCategory}
          />

          {/* Price Range */}
          <PriceFilter
            draftPriceRange={draftPriceRange}
            setDraftPriceRange={setDraftPriceRange}
          />

          {/* Colors */}
          <ColorFilter
            availableColors={availableColors}
            draftColors={draftColors}
            setDraftColors={setDraftColors}
            showColors={showColors}
            setShowColors={setShowColors}
          /> 

          {/* Apply Filter */}
          <ApplyFilter
            onApply={() => {
              setSearchTerm(draftSearch);
              setActiveCategory(draftCategory);
              setSelectedColors(draftColors);
              setPriceRange(draftPriceRange);
            }}
          />

          {/* Reviewed by you */}
          <ReviewedByYou reviewedProducts={reviewedProducts} />

          {/* Banner */}
          <div className="banner">
            <a href="#">
              <img src="/images/season-sale.svg" alt="season sale banner" />
            </a>
          </div>
        </div>

        {/* MAIN CONTENT: PRODUCTS */}
        <div className="products-wrapper">
          <SortAndCount
            total={sortedProducts.length}
            sortType={sortType}
            onChangeSort={setSortType}
          />

          {sortedProducts.length === 0 ? (
            <div className="no-results">No products found</div>
          ) : (
            <div className="products">
              {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>

    {/* NEWSLETTER */}
    <Newsletter />
  </div>
);
}

export default Shop;