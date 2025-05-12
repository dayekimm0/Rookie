import React from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import ProductBanner from "../components/ProductList/ProductBanner";
import ProductCategory from "../components/ProductList/ProductCategory";

const Container = styled.div`
  width: 1920px;
  height: 1000%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light);
`;

const ProductsList = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Products = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const ProductList = () => {
  return (
    <>
      <Container>
        <ProductBanner />
        <ProductCategory />
        <ProductsList>
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
        </ProductsList>
      </Container>
    </>
  );
};

export default ProductList;
