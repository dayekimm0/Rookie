import styled from "styled-components";
import scheduleData from "../../data/gameList_final.json";
import MatchCard from "./MatchCard";

const Container = styled.div`
  padding-top: 110px;
  .title {
    font-size: 3rem;
    font-weight: bold;
    padding-bottom: 40px;
  }

  @media screen and (max-width: 1024px) {
    padding-top: 90px;
    .title {
      font-size: 2.5rem;
      padding-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    padding-top: 80px;
    .title {
      font-size: 2rem;
      padding-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    padding-top: 60px;
    .title {
      font-size: 1.6rem;
      padding-bottom: 15px;
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
  const safeIndex = baseIndex !== -1 ? baseIndex : scheduleData.length - 1;

  // 첫째날, 마지막날 일정 체크
  const isFirstDay = safeIndex === 0;
  const isLastDay = safeIndex === scheduleData.length - 1;

  // const threeDaySlice = [
  //   scheduleData[safeIndex],
  //   scheduleData[safeIndex + 1],
  //   scheduleData[safeIndex + 2],
  // ].filter(Boolean);

  // 보여줄 3일 계산
  const displayedDays = isLastDay
    ? [
        scheduleData[safeIndex - 2],
        scheduleData[safeIndex - 1],
        scheduleData[safeIndex],
      ]
    : isFirstDay
    ? [
        scheduleData[safeIndex],
        scheduleData[safeIndex + 1],
        scheduleData[safeIndex + 2],
      ]
    : [
        scheduleData[safeIndex - 1],
        scheduleData[safeIndex],
        scheduleData[safeIndex + 1],
      ];

  const threeDaySlice = displayedDays.filter(Boolean);

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
