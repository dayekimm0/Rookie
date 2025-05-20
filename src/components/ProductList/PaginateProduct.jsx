import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import ProductCard from "../ProductCard";

const ProductsList = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    justify-content: end;
    margin-top: 20px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 80px;
  }
`;

const Products = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  gap: 8px;

  li {
    padding: 0 12px;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--gray8);
    transition: 0.3s ease;
    &.active {
      color: var(--bg);
      font-weight: 600;
    }
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

const PaginateProduct = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  // ✅ 반응형 itemsPerPage 계산
  const calculateItemsPerPage = () => {
    const width = window.innerWidth;

    let columns = 4;
    if (width <= 375) columns = 1;
    else if (width <= 500) columns = 2;
    else if (width <= 768) columns = 2;
    else if (width <= 1024) columns = 3;
    else if (width <= 1440) columns = 3;

    // 화면 세로 방향 기준으로 2줄 고정 (원하면 가변 처리 가능)
    const rows = 4;
    setItemsPerPage(columns * rows);
  };

  useEffect(() => {
    calculateItemsPerPage(); // 초기 계산
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  // ✅ 페이지 계산
  const offset = currentPage * itemsPerPage;
  const currentItems = (items || []).slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil((items?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <ProductsList>
        <Products>
          {currentItems.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </Products>
      </ProductsList>
      <PaginationWrapper>
        <StyledPaginate
          previousLabel={"< PREV"}
          nextLabel={"NEXT >"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"prev"}
          nextClassName={"next"}
          disabledClassName={"disabled"}
        />
      </PaginationWrapper>
    </>
  );
};

export default PaginateProduct;
