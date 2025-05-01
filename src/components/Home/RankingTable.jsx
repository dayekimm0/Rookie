import styled from "styled-components";
import { getEmblem } from "../../util";

const Section = styled.section`
  margin-top: 40px;
  color: #fff;
  h3 {
    font-size: 3rem;
    font-weight: bold;
  }
`;

console.log(getEmblem(3));

const RankingTable = () => {
  return (
    <Section>
      <div className="inner">
        <h3>리그 순위표</h3>
        <table>
          <thead>
            <tr>
              <th>팀순위</th>
              <th>경기</th>
              <th>승</th>
              <th>패</th>
              <th>무</th>
              <th>승률</th>
              <th>게임차</th>
              <th>연속</th>
              <th>타율</th>
              <th>평균자책</th>
              <th>최근 10경기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <span>1</span>
                <img src={getEmblem(3)} alt="" />
              </th>
              <th>경기</th>
              <th>승</th>
              <th>패</th>
              <th>무</th>
              <th>승률</th>
              <th>게임차</th>
              <th>연속</th>
              <th>타율</th>
              <th>평균자책</th>
              <th>최근 10경기</th>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
};

export default RankingTable;
