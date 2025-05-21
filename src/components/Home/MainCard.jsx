import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { getEmblem, getTeamName, getTeamColor } from "../../util";

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;

  .head {
    padding: 10px;
    height: 120px;
    font-weight: 300;
    background: var(--dark);
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
  }
  .video {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    overflow: hidden;
  }

  @media screen and (max-width: 1440px) {
    .head {
      padding: 8px;
      height: 100px;
      ul {
        width: 75%;
        li {
          font-size: 1.4rem;
          figure {
            width: 60px;
            height: 50px;
          }
        }
      }
      .timetable {
        font-size: 1.4rem;
        .ground {
          font-size: 1.3rem;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .head {
      padding: 8px;
      height: 80px;
      ul {
        width: 75%;
        li {
          font-size: 1.1rem;
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
  }
`;

const VideoInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 0;
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 95%;
    right: 0;
    top: 0;
    background: ${({ $bg }) => $bg};
  }
  img {
    position: absolute;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    width: 125px;
  }
  .homeEmblem {
    left: 5%;
  }
  .awayEmblem {
    right: 5%;
  }
  @media screen and (max-width: 1024px) {
    img {
      width: 110px;
    }
    .homeEmblem {
      left: 4%;
    }
    .awayEmblem {
      right: 4%;
    }
  }
  @media screen and (max-width: 768px) {
    img {
      width: 100px;
    }
  }
`;

const HomeBg = styled.div`
  position: absolute;
  width: 100%;
  height: 101%;
  left: 0;
  top: 0;
  font-size: 0;
  svg {
    height: 100%;
    width: 60%;
    position: absolute;
    left: 0;
    top: 0;
    path {
      height: 100%;
      fill: ${({ $bg }) => $bg};
    }
  }
`;

const MainCard = React.memo(({ hometeam, awayteam, stadium, date, day }) => {
  const [isVideo, setIsVideo] = useState(false);
  const homeEmblem = useMemo(() => getEmblem(hometeam), [hometeam]);
  const awayEmblem = useMemo(() => getEmblem(awayteam), [awayteam]);
  const homeColor = useMemo(() => getTeamColor(hometeam), [hometeam]);
  const awayColor = useMemo(() => getTeamColor(awayteam), [awayteam]);
  const homeName = useMemo(() => getTeamName(hometeam), [hometeam]);
  const awayName = useMemo(() => getTeamName(awayteam), [awayteam]);

  const formattedDate = useMemo(() => {
    const d = new Date(date);
    return d.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  }, [date]);

  return (
    <Card>
      <div className="head">
        <ul>
          <li className="teams">
            <figure>
              <img src={homeEmblem} alt="emblem" />
            </figure>
            <p>{homeName}</p>
          </li>
          <li className="teams">
            <figure>
              <img src={awayEmblem} alt="emblem" />
            </figure>
            <p>{awayName}</p>
          </li>
        </ul>
        <div className="timetable">
          <p className="date">
            {formattedDate} ({day})
          </p>
          <p className="time">18:30</p>
          <p className="ground">{stadium}</p>
        </div>
      </div>
      <div className="video">
        {" "}
        {isVideo ? (
          ""
        ) : (
          <VideoInner $bg={awayColor}>
            <HomeBg $bg={homeColor}>
              <svg
                preserveAspectRatio="none"
                width="277"
                height="289"
                viewBox="0 0 277 289"
                fill="none"
              >
                <path d="M0.5 0H276.5L195.35 289H0.5V0Z" />
              </svg>
              <img className="homeEmblem" src={homeEmblem} alt="emblem" />
            </HomeBg>
            <img className="awayEmblem" src={awayEmblem} alt="emblem" />
          </VideoInner>
        )}
      </div>
    </Card>
  );
});

export default MainCard;
