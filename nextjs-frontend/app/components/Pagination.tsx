export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-12">
    <div className="join shadow-md rounded-box">
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        «
      </button>
      <button className="join-item btn">
        Page {currentPage} of {totalPages}
      </button>
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        »
      </button>
    </div>
  </div>
);
