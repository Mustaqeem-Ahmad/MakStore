import React from "react";

const Pagination = ({ page, pageHandler, dynamicPage }) => {
  const getPages = (current, total) => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  return (
    <div className="mt-10 space-x-4">
      <button
        disabled={page === 1}
        className={`${
          page === 1 ? "bg-rose-400" : "bg-rose-500"
        } px-3 mt-2 cursor-pointer py-1 rounded-md font-semibold text-white `}
        onClick={()=> pageHandler(page-1)}
      >
        Prev
      </button>
      {getPages(page, dynamicPage)?.map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => typeof item === "number" && pageHandler(item)}
            className={` cursor-pointer ${
              item === page ? "font-bold text-rose-700" : "text-black"
            }`}
          >
            {item}
          </span>
        );
      })}
      <button
        disabled={page === dynamicPage}
        className={`${
          page === dynamicPage ? "bg-rose-400" : "bg-rose-500"
        } px-3 mt-2 cursor-pointer py-1 rounded-md font-semibold text-white `}
        onClick={()=> pageHandler(page+1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
