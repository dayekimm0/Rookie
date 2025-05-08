import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  img {
    margin-bottom: 27px;
    width: 240px;
    height: 320px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  .brandGo {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    svg {
      padding-bottom: 1px;
      width: 6px;
      stroke-width: 2;
      stroke: var(--dark);
    }
  }

  .brand {
    font-size: 1.4rem;
  }
  .name {
    margin-bottom: 10px;
    font-size: 1.6rem;
    line-height: 1.3;
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
        <div className="brandGo">
          <div className="brand">LG 트윈스</div>
          <svg viewBox="0 0 8 15" fill="none">
            <path
              d="M1.48926 1.98944L6.99982 7.5L1.48926 13.0106"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
        <div className="price">99,000원</div>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;
