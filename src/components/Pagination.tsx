"use client";

import { useMemo } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const currentBlock = Math.floor((currentPage - 1) / MAX_VISIBLE);
  const startPage = currentBlock * MAX_VISIBLE + 1;
  const endPage = Math.min(startPage + MAX_VISIBLE - 1, totalPages);

  const pages = useMemo(() => {
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [startPage, endPage]);

  return (
    <div className="flex items-center gap-2">
      {startPage > 1 && (
        <button
          onClick={() => onPageChange(startPage - 1)}
          className="px-3 py-2 border rounded-[12px] hover:bg-gray-100 cursor-pointer"
        >
          ◀
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border rounded-[12px] cursor-pointer ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(endPage + 1)}
          className="px-3 py-2 border rounded-[12px] hover:bg-gray-100 cursor-pointer"
        >
          ▶
        </button>
      )}
    </div>
  );
}
