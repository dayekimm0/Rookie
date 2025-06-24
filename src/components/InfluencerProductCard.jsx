import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  width: 290px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  @media screen and (max-width: 1440px) {
    width: 270px;
  }
  @media screen and (max-width: 1024px) {
    /* width: 250px; */
    width: 100%;
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
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.95);
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.06);
    }
  }
  @media screen and (max-width: 1440px) {
    width: 100%;
    height: 290px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    /* height: 250px; */
    height: auto;
    aspect-ratio: 4/5;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 450px) {
    width: 100%;
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
    font-size: 1.6rem;
  }
  .name {
    height: 48px;
    font-size: 1.8rem;
    div {
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
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
      height: 38px;
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
      height: 35px;
    }
    .price {
      font-size: 1.4rem;
    }
  }
`;

const InfluencerProductCard = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const { thumbnail, name, price, product_price, team, id, influencer } = data;

  const handleClick = () => {
    navigate(`/store/${team}/${id}`);
  };

  {
    console.log("influencer:", influencer);
  }

  const displayPrice = price || product_price || "가격 정보 없음";

  return (
    <CardContainer onClick={handleClick}>
      <ProductImg>
        <img src={thumbnail} alt={name} />
      </ProductImg>
      <ProductInfo>
        <div className="brandGo">
          <div className="brand">{influencer}</div>
          <svg viewBox="0 0 8 15" fill="none">
            <path
              d="M1.48926 1.98944L6.99982 7.5L1.48926 13.0106"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="name">
          <div>{name}</div>
        </div>
        <div className="price">{displayPrice}</div>
      </ProductInfo>
    </CardContainer>
  );
};

export default InfluencerProductCard;
