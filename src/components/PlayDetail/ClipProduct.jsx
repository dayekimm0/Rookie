import React, { memo } from "react";
import styled from "styled-components";

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: var(--light);
    font-size: 2rem;
  }

  @media screen and (max-width: 1280px) {
    h1 {
      font-size: 1.8rem;
    }
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.6rem;
    }
  }
`;

const ModalProducts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 20px;
  gap: 10px;
  /* border: 1px solid #0f0; */
  @media screen and (max-width: 768px) {
    padding: 20px 0 0 10px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
  }
`;

const ModalProduct = styled.div`
  width: 160px;
  width: 100%;
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    width: 130px;
  }
  @media screen and (max-width: 1024px) {
    width: 120px;
  }
  @media screen and (max-width: 500px) {
    width: 48%;
  }
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
  @media screen and (max-width: 1440px) {
    height: 130px;
  }
  @media screen and (max-width: 1024px) {
    height: 120px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: 100%;
    }
  }
  @media screen and (max-width: 375px) {
    height: 100px;
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
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ProductItem = memo(({ product, onClick }) => (
  <ModalProduct onClick={() => onClick(product)}>
    <ProductThumbnail>
      <img src={product.thumbnail} alt={product.name} />
    </ProductThumbnail>
    <ProductInfo>{product.name}</ProductInfo>
  </ModalProduct>
));

const ClipProduct = memo(({ products, onProductClick, likeButton }) => {
  return (
    <ModalProducts>
      <TitleRow>
        <h1>추천하는 ROOK{likeButton}</h1>
      </TitleRow>
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
