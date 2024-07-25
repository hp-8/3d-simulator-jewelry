export const paginate = (totalItems: number, currentPage: number, pageSize: number): number[] => {
  const totalPages = Math.ceil(totalItems / pageSize);
  let startPage: number, endPage: number;

  if (totalPages <= 5) {
    // Less than 5 pages, display all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 5 pages, calculate start and end pages
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 1 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  // Create an array of page numbers to iterate over in the pagination component
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(i => startPage + i);

  return pages;
};
