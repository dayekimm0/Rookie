import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  img {
    width: 240px;
    height: 320px;
    margin-bottom: 27px;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  .brand {
    margin-bottom: 4px;
  }
  .name {
    margin-bottom: 10px;
  }
  .price {
    font-size: 1.8rem;
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
