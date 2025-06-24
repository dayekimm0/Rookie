// ProductList.jsx
import React, { memo } from "react";
import styled from "styled-components";

const ModalProducts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  gap: 10px;

  h1 {
    width: 100%;
    color: var(--light);
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const ModalProduct = styled.div`
  width: 160px;
  cursor: pointer;
`;

const ProductThumbnail = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
  background: var(--light);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  font-size: 1.4rem;
  color: var(--light);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const ProductItem = memo(({ product, onClick }) => (
  <ModalProduct onClick={() => onClick(product)}>
    <ProductThumbnail>
      <img src={product.thumbnail} alt={product.name} />
    </ProductThumbnail>
    <ProductInfo>{product.name}</ProductInfo>
  </ModalProduct>
));

const ClipProduct = memo(({ products, onProductClick }) => {
  return (
    <ModalProducts>
      <h1>추천하는 ROOK</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={onProductClick}
          />
        ))
      ) : (
        <p style={{ color: "#888", fontSize: "1.4rem" }}>
          추천 상품이 없습니다.
        </p>
      )}
    </ModalProducts>
  );
});

export default ClipProduct;
