"use client";

import { CustomPagination } from "@/components";
import { TMeta } from "@/types/meta";
import calculateSiblingPages from "@/utils/calculateSiblingPages";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

type TProps = {
  meta: TMeta;
};

const UserPagination = ({ meta }: TProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { activePage: page, hasPreviousPage, hasNextPage, pageCount } = meta;
  const [activePage, setActivePage] = useState(page);

  const navigateToPage = (page: number) => {
    setActivePage(page);

    const params = new URLSearchParams(searchParams);
    params.set("activePage", page.toString());

    const query = params.toString();
    router.push(pathname + "?" + query);
  };

  const handlePrevBtnClick = () => navigateToPage(hasPreviousPage ? activePage - 1 : activePage);
  const handleNextBtnClick = () => navigateToPage(hasNextPage ? activePage + 1 : activePage);
  const handleFirstPageBtnClick = () => navigateToPage(1);
  const handleLastPageBtnClick = () => navigateToPage(pageCount);
  const handleItemClick = (number: number) => navigateToPage(number);

  const { startPage, endPage } = calculateSiblingPages(activePage, meta.pageCount, 9);

  return (
    <CustomPagination
      activePage={activePage}
      startPage={startPage}
      endPage={endPage}
      hasPreviousPage={hasPreviousPage}
      hasNextPage={hasNextPage}
      handleItemClick={handleItemClick}
      handlePrevBtnClick={handlePrevBtnClick}
      handleNextBtnClick={handleNextBtnClick}
      handleFirstPageBtnClick={handleFirstPageBtnClick}
      handleLastPageBtnClick={handleLastPageBtnClick}
    />
  );
};

export default UserPagination;
