import { useMemo } from "react";
import styled from "styled-components";
import { getTeamName, getEmblem, getTeamNameShortEng } from "../../util";

const CardWrap = styled.div`
  &:first-of-type {
    .day {
      color: var(--main);
    }
    .card {
      background: linear-gradient(
          90deg,
          rgba(255, 236, 0, 0.3) 14.42%,
          rgba(0, 0, 0, 0) 100%
        ),
        #111;
    }
  }

  width: 33.333%;
  padding: 25px;
  border-right: 1px solid var(--gray2);
  &:last-of-type {
    border-right: none;
  }

  .day {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 25px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 10px;
    .day {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    border-right: none;
    &:first-of-type {
      padding-top: 15px;
    }
    .day {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
  }
`;

const Card = styled.div`
  padding: 10px;
  height: 140px;
  font-weight: 300;
  background: var(--gray1);
  border: 1px solid var(--gray3);
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  ul {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      figure {
        width: 80px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          transform: translateY(-5px);
        }
      }
    }
  }
  .timetable {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 1.3;
    font-size: 1.6rem;
    .ground {
      font-size: 1.4rem;
      color: var(--grayD);
    }
  }

  @media screen and (max-width: 1440px) {
    padding: 8px;
    height: 100px;
    ul {
      width: 92%;
      li {
        font-size: 1.4rem;
        figure {
          width: 60px;
          height: 50px;
        }
      }
    }
    .timetable {
      font-size: 1.3rem;
      .ground {
        font-size: 1.2rem;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    height: 90px;
    ul {
      width: 95%;
      li {
        font-size: 1.2rem;
        figure {
          width: 50px;
          height: 40px;
        }
      }
    }
    .timetable {
      font-size: 1.3rem;
      .ground {
        font-size: 1.2rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 8px;
    ul {
      width: 70%;
      li {
        figure {
          width: 55px;
          height: 45px;
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    padding: 8px;
    height: 90px;
    ul {
      width: 85%;
      li {
        font-size: 1.2rem;
        figure {
          width: 50px;
          height: 40px;
        }
      }
    }
    .timetable {
      font-size: 1.2rem;
      .ground {
        font-size: 1rem;
      }
    }
  }
`;

const MatchCard = ({ match, teamCode }) => {
  const matchDay = match;

  const homeMatch = matchDay.matches.find(
    (match) =>
      match.awayTeam.name === getTeamNameShortEng(teamCode) ||
      match.homeTeam.name === getTeamNameShortEng(teamCode)
  );

  const homeCode = homeMatch.awayTeam.code;
  const awayCode = homeMatch.homeTeam.code;

  const homeEmblem = useMemo(() => getEmblem(homeCode), [homeCode]);
  const awayEmblem = useMemo(() => getEmblem(awayCode), [awayCode]);
  const homeName = useMemo(() => getTeamName(homeCode), [homeCode]);
  const awayName = useMemo(() => getTeamName(awayCode), [awayCode]);

  const formattedDate = useMemo(() => {
    const d = new Date(matchDay.date);
    return d.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  }, [matchDay]);
  const formattedDay = useMemo(() => {
    const d = new Date(matchDay.date);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }, [matchDay]);

  return (
    <CardWrap>
      <h4 className="day">{formattedDay.toUpperCase()}</h4>
      <Card className="card">
        <ul>
          <li className="teams">
            <figure>
              <img src={awayEmblem} alt="emblem" />
            </figure>
            <p>{awayName}</p>
          </li>
          <li className="teams">
            <figure>
              <img src={homeEmblem} alt="emblem" />
            </figure>
            <p>{homeName}</p>
          </li>
        </ul>
        <div className="timetable">
          <p className="date">
            {formattedDate} ({matchDay.day})
          </p>
          <p className="time">{homeMatch.time}</p>
          <p className="ground">{homeMatch.stadium}</p>
        </div>
      </Card>
    </CardWrap>
  );
};

export default MatchCard;
