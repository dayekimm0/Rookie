import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 240px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  img {
    margin-bottom: 27px;
    width: 240px;
    max-width: 100%;
    height: 320px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 8px;
  }
  @media (max-width: 1024px) {
    width: 200px;

    img {
      width: 200px;
      height: 280px;
    }
  }

  @media (max-width: 500px) {
    width: 100%;

    img {
      width: 100%;
      height: auto;
    }
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
    cursor: pointer;
    font-size: 1.6rem;
    line-height: 1.3;
  }
  .price {
    font-size: 1.8rem;
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    .brand {
      font-size: 1.3rem;
    }
    .name {
      font-size: 1.5rem;
    }
    .price {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 500px) {
    .brand {
      font-size: 1.2rem;
    }
    .name {
      font-size: 1.4rem;
    }
    .price {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 375px) {
    .brand {
      font-size: 1.1rem;
    }
    .name {
      font-size: 1.3rem;
    }
    .price {
      font-size: 1.4rem;
    }
  }
`;

const ProductCard = ({ data }) => {
  const { thumbnail, name, price, team, link } = data;
  return (
    <CardContainer>
      <img src={thumbnail} alt={name} />
      <ProductInfo>
        <div className="brandGo">
          <div className="brand">{team}</div>
          <svg viewBox="0 0 8 15" fill="none">
            <path
              d="M1.48926 1.98944L6.99982 7.5L1.48926 13.0106"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="name">{name}</div>
        <div className="price">{price}</div>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;
