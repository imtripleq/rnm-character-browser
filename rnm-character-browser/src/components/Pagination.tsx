// https://flowbite.com/docs/components/pagination/
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Help text */}
      <span className="text-sm text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-100">
          {(currentPage - 1) * 10 + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-100">{currentPage * 10}</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-100">{totalPages * 10}</span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        {/* Buttons */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-300 disabled:opacity-50"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0l4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-200 rounded-e hover:bg-gray-300 disabled:opacity-50"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0l-4-4m4 4l-4 4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
