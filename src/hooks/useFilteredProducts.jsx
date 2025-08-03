import { useMemo } from 'react';

function useFilteredProducts(productsData, filters, sortType, currentPage, itemsPerPage) {
  const { searchTerm, activeCategory, selectedColors, priceRange } = filters;

  const filtered = useMemo(() => {
    return productsData
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
  }, [productsData, searchTerm, activeCategory, selectedColors, priceRange]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortType === 'ASC') return a.name.localeCompare(b.name);
      if (sortType === 'PRICE') return a.price - b.price;
      return 0;
    });
  }, [filtered, sortType]);

  const totalPages = useMemo(() => Math.ceil(sorted.length / itemsPerPage), [sorted, itemsPerPage]);

  const paginated = useMemo(() => {
    return sorted.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sorted, currentPage, itemsPerPage]);

  return { sorted, paginated, totalPages };
}

export default useFilteredProducts;
