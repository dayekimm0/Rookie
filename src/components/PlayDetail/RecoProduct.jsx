import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getTeamNameKor } from "../../util";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const RecoProductImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 500px) {
    width: 120px;
    height: 120px;
  }
`;

const RecoProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .brandGo {
    width: 100%;
    margin-bottom: 4px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    .brand {
      color: var(--light);
    }
    svg {
      padding-bottom: 1px;
      width: 6px;
      stroke-width: 2;
      stroke: var(--light);
    }
  }
  .name {
    margin-bottom: 18px;
    font-size: 1.6rem;
    color: var(--light);
    line-height: 1.3;
  }
  .price {
    color: var(--light);
    font-size: 1.8rem;
  }
  @media screen and (max-width: 1024px) {
    .brandGo {
      .brand {
        font-size: 1.2rem;
      }
    }
    .name {
      font-size: 1.4rem;
    }
    .price {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 500px) {
    .brandGo {
      .brand {
        font-size: 1.4rem;
      }
    }
    .name {
      font-size: 1.6rem;
    }
    .price {
      font-size: 1.6rem;
    }
  }
`;

const RecoProduct = ({ thumbnail, name, price, team, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (team && id) {
      navigate(`/store/${team}/${id}`);
    }
  };

  return (
    <Container onClick={handleClick}>
      <RecoProductImg>
        <img src={thumbnail} alt={name} />
      </RecoProductImg>
      <RecoProductInfo>
        <div className="brandGo">
          <div className="brand">{getTeamNameKor(team)}</div>
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
      </RecoProductInfo>
    </Container>
  );
};

export default RecoProduct;
