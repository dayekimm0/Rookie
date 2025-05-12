import { getEmblem } from "../../util";
import styled from "styled-components";

const Rank = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  background: var(--dark);
  padding-left: 20px;
  width: 100%;
  height: 100%;
  gap: 10px;
  h4 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Team = styled.div`
  display: flex;
  align-items: center;
  h5 {
    font-size: 1.6rem;
  }
`;

const Emblem = styled.img`
  width: 45px;
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
