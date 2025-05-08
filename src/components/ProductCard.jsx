import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  img {
    width: 240px;
    height: 320px;
    margin-bottom: 27px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  .brand {
    font-size: 1.4rem;
    margin-bottom: 4px;
  }
  .name {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .price {
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const ProductCard = () => {
  return (
    <CardContainer>
      <img
        src="https://www.twinscorestore.co.kr/web/product/medium/202504/02d39da816205124f12937d598399de4.jpg"
        alt="lgtwins"
      />
      <ProductInfo>
        <div className="brand">LG 트윈스</div>
        <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
        <div className="price">99,000원</div>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;
