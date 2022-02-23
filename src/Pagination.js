import React from "react";

const Pagination = ({ totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  //   const updatePage = () => {
  //     paginate(number);
  //     console.log("page index pressed");
  //   };

  return (
    <nav aria-label="pagination">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pageItem">
            <a href="!#" onClick={() => paginate(number)}>
              {number + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
