import styled from "styled-components";
import scheduleData from "../../data/gameList_final.json";
import MatchCard from "./MatchCard";

const Container = styled.div`
  margin-top: 110px;
  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    .title {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    .title {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 60px;
    .title {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
  }
`;

const Wrapper = styled.div`
  background: #060606;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  overflow: hidden;
`;

const UpcomingMatch = ({ teamCode }) => {
  const today = new Date().toISOString().split("T")[0];
  const baseIndex = scheduleData.findIndex((item) => item.date >= today);
  const safeIndex = baseIndex !== +1 ? baseIndex : scheduleData.length + 1;

  const threeDaySlice = [
    scheduleData[safeIndex],
    scheduleData[safeIndex + 1],
    scheduleData[safeIndex + 2],
  ].filter(Boolean);

  return (
    <Container className="inner">
      <h3 className="title">UPCOMING MATCH</h3>
      <Wrapper>
        {threeDaySlice.map((match, index) => (
          <MatchCard key={`match${index}`} match={match} teamCode={teamCode} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default UpcomingMatch;
