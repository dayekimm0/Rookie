import React from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import ProductBanner from "../components/ProductList/ProductBanner";
import ProductCategory from "../components/ProductList/ProductCategory";

const Container = styled.div`
  width: 1920px;
  height: 1000%;
  position: relative;
`;

const Products = styled.div`
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  align-content: center;
  align-items: center;
`;

const ProductList = () => {
  return (
    <>
      <Container>
        <ProductBanner />
        <ProductCategory />
        <Products>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Products>
      </Container>
    </>
  );
};

export default ProductList;
