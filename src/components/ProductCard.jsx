import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getTeamJsonCode } from "../util";

const CardContainer = styled.div`
  width: 290px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  @media screen and (max-width: 1440px) {
    width: 270px;
  }
  @media screen and (max-width: 1024px) {
    width: 250px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ProductImg = styled.div`
  width: 290px;
  max-width: 100%;
  height: 310px;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    filter: brightness(0.95);
    cursor: pointer;
    transition: scale 0.3s;
    &:hover {
      scale: 1.08;
    }
  }
  @media screen and (max-width: 1440px) {
    width: 100%;
    height: 290px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 270px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 290px;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
    height: calc(230px + 25vw);
  }
`;

const ProductInfo = styled.div`
  width: 100%;
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
  }
  .name {
    height: 48px;
    cursor: pointer;
    font-size: 1.8rem;
    line-height: 1.3;
  }
  .price {
    font-size: 1.8rem;
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;

    .brand {
      font-size: 1.4rem;
    }
    .name {
      font-size: 1.5rem;
    }
    .price {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
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

  @media screen and (max-width: 375px) {
    width: 100%;

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
  const navigate = useNavigate();

  if (!data) return null;
  const { thumbnail, name, price, team, id } = data;

  const handleClick = () => {
    const teamCode = getTeamJsonCode(team); // ← 함수 호출로 수정!
    navigate(`/store/${team}/${id}`);
  };

  return (
    <CardContainer>
      <ProductImg onClick={handleClick}>
        <img src={thumbnail} alt={name} />
      </ProductImg>
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
