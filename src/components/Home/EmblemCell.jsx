import { getEmblem } from "../../util";
import styled from "styled-components";

const Rank = styled.div`
  display: flex;
  align-items: center;
  color: var(--light);
  background: var(--dark);
  padding-left: 20px;
  width: 100%;
  height: 100%;
  gap: 8px;
  overflow: hidden;
  white-space: nowrap;
  h4 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  @media screen and (max-width: 1440px) {
    padding-left: 16px;
    h4 {
      font-size: 1.6rem;
    }
  }
  @media screen and (max-width: 1024px) {
    gap: 5px;
    padding-left: 16px;
    h4 {
      font-size: 1.5rem;
    }
  }
`;

const Team = styled.div`
  display: flex;
  align-items: center;
  h5 {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 1440px) {
    h5 {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 1024px) {
    h5 {
      font-size: 1.3rem;
    }
  }
`;

const Emblem = styled.img`
  width: 44px;
  @media screen and (max-width: 1440px) {
    width: 36px;
  }
  @media screen and (max-width: 1024px) {
    width: 32px;
  }
`;

const EmblemCell = ({ rank, teamId, name }) => {
  return (
    <Rank>
      <h4>{rank}</h4>
      <Team>
        <Emblem src={getEmblem(teamId)} alt={`${name} Emblem`} />
        <h5>{name}</h5>
      </Team>
    </Rank>
  );
};

export default EmblemCell;
