import styled from "styled-components";

const Box = styled.div`
  width: 33.33%;
  padding: 22px 0;
  border-left: 1px solid var(--gray6);
  @media screen and (max-width: 1700px) {
    padding: 22px 0;
  }
  @media screen and (max-width: 1440px) {
    width: 50%;
    padding: 22px 0;
  }
  @media screen and (max-width: 1024px) {
    padding: 18px 0;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 16px 0;
  }
  @media screen and (max-width: 500px) {
    padding: 14px 0;
  }
`;

const BoxWrap = styled.dl`
  width: 410px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1700px) {
    width: calc(350px + 3vw);
  }
  @media screen and (max-width: 1440px) {
    width: calc(300px + 6vw);
  }
  @media screen and (max-width: 1024px) {
    width: calc(250px + 6vw);
  }
  @media screen and (max-width: 768px) {
    width: calc(280px + 10vw);
  }
  @media screen and (max-width: 500px) {
    width: calc(230px + 10vw);
  }
`;

const Boxdate = styled.dt`
  width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h4 {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.3;
  }
  h5 {
    font-size: 1.6rem;
    color: var(--gray8);
    font-weight: 600;
  }
  @media screen and (max-width: 1024px) {
    h4 {
      font-size: 2.4rem;
    }
    h5 {
      font-size: 1.4rem;
    }
  }
`;

const BoxTeams = styled.dd`
  width: 95%;
  position: relative;
  .teamWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li {
      width: 45%;
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: end;
      .teamList {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        h5 {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.4;
          @media screen and (max-width: 1024px) {
            font-size: 1.3rem;
            line-height: 1.3;
          }
          @media screen and (max-width: 500px) {
            font-size: 1.2rem;
            line-height: 1.3;
          }
        }
        .vs {
          font-size: 1.2rem;
          color: var(--gray8);
          position: absolute;
          line-height: 1.3;
          left: 50%;
          top: 45%;
          transform: translate(-50%, -50%);
          @media screen and (max-width: 1024px) {
            font-size: 1rem;
          }
          @media screen and (max-width: 500px) {
            font-size: 0.9rem;
          }
        }
      }
      h6 {
        font-size: 1.2rem;
        line-height: 1.4;
        color: var(--gray8);
        @media screen and (max-width: 1024px) {
          font-size: 1rem;
        }
        @media screen and (max-width: 500px) {
          font-size: 0.9rem;
        }
      }
    }
  }
  .timeStart {
    font-size: 1.2rem;
    color: var(--main);
    position: absolute;
    bottom: 0;
    right: 0;
    @media screen and (max-width: 1024px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 0.9rem;
    }
  }
`;

const ScheduleBox = ({ schedule }) => {
  if (!schedule) return null;
  const { date, day, matches } = schedule;
  const dateObj = new Date(date);
  const dayNum = dateObj.getDate();
  const monthNum = dateObj.getMonth() + 1;
  return (
    <Box>
      <BoxWrap>
        <Boxdate>
          <h4>{dayNum}</h4>
          <h5>{monthNum}월</h5>
        </Boxdate>
        <BoxTeams>
          <ul className="teamWrap">
            {matches.map((match, index) => (
              <li key={index}>
                <div className="teamList">
                  <h5>{match.awayTeam.name}</h5>
                  <span className="vs">vs</span>
                  <h5>{match.homeTeam.name}</h5>
                </div>
                <h6>{match.stadium}</h6>
              </li>
            ))}
          </ul>
          <p className="timeStart">
            {day}요일 {matches[0]?.time} PM
          </p>
        </BoxTeams>
      </BoxWrap>
    </Box>
  );
};

export default ScheduleBox;
