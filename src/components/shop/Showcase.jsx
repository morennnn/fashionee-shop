import SortAndCount from '../SortAndCount';
import ProductCard from '../ProductCard';
import Pagination from '../Pagination';

const Showcase = ({
  sortedProducts,
  paginatedProducts,
  sortType,
  setSortType,
  currentPage,
  totalPages,
  setCurrentPage,
  addToCart,
  toggleFavorite,
  favorites,
}) => {
    const favoritesSet = new Set(favorites);
    return (
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
                <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                />
            ))}
            </div>
        )}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
        </div>
    );
};

export default Showcase;
