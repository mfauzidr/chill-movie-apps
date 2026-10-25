interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Content pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-md border border-text-light/23 px-3 py-2 text-sm font-bold text-text-light hover:bg-extra-background disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={`h-9 min-w-9 rounded-md px-2 text-sm font-bold transition-colors ${
            page === currentPage
              ? "bg-primary text-text-light"
              : "border border-text-light/23 text-greyscale-300 hover:bg-extra-background"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-md border border-text-light/23 px-3 py-2 text-sm font-bold text-text-light hover:bg-extra-background disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
