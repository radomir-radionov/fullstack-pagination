"use client";

import { Pagination } from "react-bootstrap";

type TProps = {
  activePage: number;
  startPage: number;
  endPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  handleItemClick: (number: number) => void;
  handlePrevBtnClick: () => void;
  handleNextBtnClick: () => void;
  handleFirstPageBtnClick: () => void;
  handleLastPageBtnClick: () => void;
};

const CustomPagination = ({
  activePage,
  startPage,
  endPage,
  hasPreviousPage,
  hasNextPage,
  handleItemClick,
  handlePrevBtnClick,
  handleNextBtnClick,
  handleFirstPageBtnClick,
  handleLastPageBtnClick,
}: TProps) => {
  let items = [];
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => handleItemClick(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={handleFirstPageBtnClick} />
      <Pagination.Prev disabled={!hasPreviousPage} onClick={handlePrevBtnClick} />
      {items.map((item) => item)}
      <Pagination.Next disabled={!hasNextPage} onClick={handleNextBtnClick} />
      <Pagination.Last onClick={handleLastPageBtnClick} />
    </Pagination>
  );
};

export default CustomPagination;
