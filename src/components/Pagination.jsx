const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <div
        className="button left"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        <img src="/icons/left-pagin-arrow.svg" alt="prev" />
      </div>
      <div className="pages">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i + 1}
            className={`page ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div
        className="button right"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        <img src="/icons/right-pagin-arrow.svg" alt="next" />
      </div>
    </div>
  );
};

export default Pagination;
