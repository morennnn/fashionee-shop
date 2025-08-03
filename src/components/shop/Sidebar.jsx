import { useState } from 'react';
import SearchFilter from '../filters/SearchFilter';
import CategoryFilter from '../filters/CategoryFilter';
import PriceFilter from '../filters/PriceFilter';
import ColorFilter from '../filters/ColorFilter';
import ApplyFilter from '../filters/ApplyFilter';
import ReviewedByYou from '../ReviewedByYou';

const Sidebar = ({
  draftSearch,
  setDraftSearch,
  draftCategory,
  setDraftCategory,
  draftColors,
  setDraftColors,
  draftPriceRange,
  setDraftPriceRange,
  applyFilters,
  reviewedProducts,
  availableColors,
}) => {
  const [showColors, setShowColors] = useState(true);

  return (
    <div className="sidebar">
      <SearchFilter
        draftSearch={draftSearch}
        setDraftSearch={setDraftSearch}
        applyFilters={applyFilters}
      />
      <CategoryFilter
        draftCategory={draftCategory}
        setDraftCategory={setDraftCategory}
      />
      <PriceFilter
        draftPriceRange={draftPriceRange}
        setDraftPriceRange={setDraftPriceRange}
      />
      <ColorFilter
        availableColors={availableColors}
        draftColors={draftColors}
        setDraftColors={setDraftColors}
        showColors={showColors}        
        setShowColors={setShowColors}  
      />
      <ApplyFilter onApply={applyFilters} />
      <ReviewedByYou reviewedProducts={reviewedProducts} />
      <div className="banner">
        <a href="#">
          <img src="/images/season-sale.svg" alt="season sale banner" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
