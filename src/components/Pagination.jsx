import React from "react";

const Pagination = ({ page, pageHandler, dynamicPage }) => {

  const getPages = (current, total) => {
    const pages = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } 
      else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } 
      else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-10">

      {/* Prev Button */}
      <button
        disabled={page === 1}
        onClick={() => pageHandler(page - 1)}
        className={`px-4 py-1 rounded-md font-semibold transition 
        ${page === 1 
          ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
          : "bg-rose-500 hover:bg-rose-600 text-white"}
        `}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {getPages(page, dynamicPage).map((item, index) => (
        <button
          key={index}
          disabled={item === "..."}
          onClick={() => typeof item === "number" && pageHandler(item)}
          className={`px-3 py-1 rounded-md font-medium transition
          ${
            item === page
              ? "bg-rose-500 text-white shadow"
              : item === "..."
              ? "cursor-default text-gray-500"
              : "hover:bg-gray-200"
          }`}
        >
          {item}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={page === dynamicPage}
        onClick={() => pageHandler(page + 1)}
        className={`px-4 py-1 rounded-md font-semibold transition
        ${page === dynamicPage
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-rose-500 hover:bg-rose-600 text-white"}
        `}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;