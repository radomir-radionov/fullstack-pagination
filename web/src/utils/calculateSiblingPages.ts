function calculateSiblingPages(activePage: number, pageCount: number, siblingCount: number) {
  const halfSiblingCount = Math.floor(siblingCount / 2);
  let startPage = Math.max(1, activePage - halfSiblingCount);
  let endPage = Math.min(pageCount, activePage + halfSiblingCount);

  const pagesNeeded = siblingCount + 1;
  if (endPage - startPage + 1 < pagesNeeded) {
    if (activePage < pageCount / 2) {
      endPage = Math.min(pageCount, startPage + pagesNeeded - 1);
    } else {
      startPage = Math.max(1, endPage - pagesNeeded + 1);
    }
  }

  return { startPage, endPage };
}

export default calculateSiblingPages;
