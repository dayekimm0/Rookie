import React, { useState } from "react";
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

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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

const PaginateProduct = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

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
