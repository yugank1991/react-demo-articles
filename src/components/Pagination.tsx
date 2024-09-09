import React from "react";

import leftArrowDark from "../assets/img/svg/left-arrow-dark.svg";
import leftArrowLight from "../assets/img/svg/left-arrow-light.svg";
import rightArrowDark from "../assets/img/svg/right-arrow-dark.svg";
import rightArrowLight from "../assets/img/svg/right-arrow-light.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="pagination flex justify-end gap-4 flex-row items-center">
    <img
      src={currentPage > 1 ? leftArrowDark : leftArrowLight}
      className={`${currentPage > 1 ? "cursor-pointer" : "w"} w-4 h-4`}
      alt="left"
      onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
    />
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        className={
          currentPage === i + 1
            ? "bg-black rounded-full text-white font-bold px-3 py-1.5 text-sm"
            : ""
        }
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <img
      src={totalPages !== currentPage ? rightArrowDark : rightArrowLight}
      alt="right"
      className={`${totalPages !== currentPage ? "cursor-pointer" : ""} w-4 h-4`}
      onClick={() =>
        totalPages !== currentPage && onPageChange(currentPage + 1)
      }
    />
  </div>
);

export default React.memo(Pagination);
