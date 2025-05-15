import React from "react";
import styled from "styled-components";
import ProductBanner from "../components/ProductList/ProductBanner";
import ProductCategory from "../components/ProductList/ProductCategory";
import PaginateProduct from "../components/ProductList/PaginateProduct";

const Container = styled.div`
  width: 1920px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light);
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const ProductList = () => {
  const dummyProducts = Array.from({ length: 32 }, (_, index) => ({
    id: index,
    name: `상품 ${index + 1}`,
  }));

  return (
    <>
      <Container>
        <ProductBanner />
        <ProductCategory />
        <PaginateProduct items={dummyProducts} itemsPerPage={8} />
      </Container>
    </>
  );
};

export default ProductList;
