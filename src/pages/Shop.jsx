import productsJson from '../data/products.json';
import Sidebar from '../components/shop/Sidebar';
import Showcase from '../components/shop/Showcase';
import Newsletter from '../components/Newsletter';
import { useState, useEffect, useMemo, useCallback } from 'react';

import {
  ITEMS_PER_PAGE,
  DEFAULT_PRICE_RANGE,
  DEFAULT_CATEGORY,
  DEFAULT_SORT,
} from '../constants/shopConstants';

import { useCartFavorites } from '../context/CartFavoritesContext'; 

import useFilteredProducts from '../hooks/useFilteredProducts';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(DEFAULT_SORT);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [selectedColors, setSelectedColors] = useState([]);

  const [draftSearch, setDraftSearch] = useState('');
  const [draftCategory, setDraftCategory] = useState(DEFAULT_CATEGORY);
  const [draftColors, setDraftColors] = useState([]);
  const [draftPriceRange, setDraftPriceRange] = useState(DEFAULT_PRICE_RANGE);

  const { favorites, toggleFavorite, addToCart } = useCartFavorites();

  const productsData = productsJson.products;

  const applyFilters = useCallback(() => {
    setSearchTerm(draftSearch);
    setActiveCategory(draftCategory);
    setSelectedColors(draftColors);
    setPriceRange(draftPriceRange);
    setCurrentPage(1);
  }, [draftSearch, draftCategory, draftColors, draftPriceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortType, activeCategory]);

  const filters = useMemo(() => ({
    searchTerm,
    activeCategory,
    selectedColors,
    priceRange,
  }), [searchTerm, activeCategory, selectedColors, priceRange]);

  const {
    sorted,
    paginated,
    totalPages
  } = useFilteredProducts(productsData, filters, sortType, currentPage, ITEMS_PER_PAGE);

  const availableColors = useMemo(
    () => Array.from(new Set(productsData.map(p => p.color).filter(Boolean))),
    [productsData]
  );

  return (
    <div className="container">
      <div className="content">
        <div className="shop">
          <Sidebar
            draftSearch={draftSearch}
            setDraftSearch={setDraftSearch}
            draftCategory={draftCategory}
            setDraftCategory={setDraftCategory}
            draftColors={draftColors}
            setDraftColors={setDraftColors}
            draftPriceRange={draftPriceRange}
            setDraftPriceRange={setDraftPriceRange}
            applyFilters={applyFilters}
            availableColors={availableColors}
          />
          <Showcase
            sortedProducts={sorted}
            paginatedProducts={paginated}
            sortType={sortType}
            setSortType={setSortType}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

export default Shop;
