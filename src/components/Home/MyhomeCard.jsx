import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { getEmblem, getTeamName, getTeamColor } from "../../util";
import YouTube from "react-youtube";

const Myhome = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  width: calc(100% - 520px - 20px);
  aspect-ratio: 16 / 9;
  cursor: pointer;

  &:hover {
    .head {
      opacity: 1;
    }
  }

  .head {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    font-weight: 300;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    @media screen and (max-width: 1024px) {
      opacity: 1;
    }
    ul {
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
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
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    aspect-ratio: 16 / 9;
  }

  /* .video {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    overflow: hidden;
  } */

  .yt-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & > iframe {
      width: 100%;
      height: 100%;
    }
  }

  .transition-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    color: #fff;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    @media screen and (max-width: 1024px) {
      font-size: 1.4rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 1.3rem;
    }
  }

  @media screen and (max-width: 1440px) {
    width: calc(100% - 350px - 20px);
    .head {
      height: 100px;
      ul {
        width: 60%;
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

  @media screen and (max-width: 1024px) {
    width: 100%;
    aspect-ratio: auto;
    height: auto;
    padding: 0 3%;
    border-radius: 0px;
    .head {
      height: 100px;
      position: relative;
      border-radius: 8px 8px 0 0;
    }
    .video {
      position: relative;
      aspect-ratio: 16 / 9;
      border-radius: 0 0 8px 8px;
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

  @media screen and (max-width: 500px) {
    padding: 0;
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
    width: 20%;
  }
  .awayEmblem {
    left: 5%;
  }
  .homeEmblem {
    right: 5%;
  }
  @media screen and (max-width: 1024px) {
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    img {
      width: 28%;
    }
    .awayEmblem {
      left: 4%;
    }
    .homeEmblem {
      right: 4%;
    }
  }
  @media screen and (max-width: 500px) {
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
    /* border: 1px solid #fff; */
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

const SvgSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  .path {
    stroke: #fff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
const Spinner = () => (
  <SvgSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="5"
    />
  </SvgSpinner>
);

const MyhomeCard = React.memo(
  ({
    hometeam,
    awayteam,
    stadium,
    date,
    day,
    videoId,
    nextVideos,
    thumbnail,
    time,
  }) => {
    const [isReady, setIsReady] = useState(false);
    const [tryPlay, setTryPlay] = useState(false);
    const [videoQueue, setVideoQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const homeEmblem = useMemo(() => getEmblem(hometeam), [hometeam]);
    const awayEmblem = useMemo(() => getEmblem(awayteam), [awayteam]);
    const homeColor = useMemo(() => getTeamColor(hometeam), [hometeam]);
    const awayColor = useMemo(() => getTeamColor(awayteam), [awayteam]);
    const homeName = useMemo(() => getTeamName(hometeam), [awayteam]);
    const awayName = useMemo(() => getTeamName(awayteam), [awayteam]);

    const formattedDate = useMemo(() => {
      const d = new Date(date);
      return d.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
    }, [date]);

    //다음 영상 재생
    useEffect(() => {
      if (videoId || nextVideos?.length > 0) {
        const fullQueue = [
          ...(videoId
            ? [{ videoId, from: "highlight", title: "하이라이트", thumbnail }]
            : []),
          ...(nextVideos || []),
        ];
        setVideoQueue(fullQueue);
        setCurrentIndex(0);
      }
    }, [videoId, nextVideos]);

    const handleEnd = () => {
      if (currentIndex + 1 < videoQueue.length) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setTryPlay(true);
          setIsTransitioning(false);
          setIsReady(false);
        }, 2000);
      }
    };

    const handleReady = () => {
      setIsReady(true);
    };

    const handleError = () => {
      console.warn("YouTube player error 발생");
      setIsReady(false);
    };

    const currentVideo = videoQueue[currentIndex];

    return (
      <Myhome>
        <div className="head">
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
              {formattedDate} ({day})
            </p>
            <p className="time">{time}</p>
            <p className="ground">{stadium}</p>
          </div>
        </div>
        <div className="video">
          {currentVideo && tryPlay ? (
            <>
              {!isReady && !isTransitioning && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 3,
                  }}
                >
                  <Spinner />
                  <p style={{ marginTop: "10px", fontSize: "1.4rem" }}>
                    영상 로딩 중...
                  </p>
                </div>
              )}
              {isTransitioning && (
                <div className="transition-overlay">
                  <p>잠시 후 다음 컨텐츠가 이어집니다...</p>
                </div>
              )}
              <YouTube
                videoId={currentVideo.videoId}
                onReady={handleReady}
                onEnd={handleEnd}
                onError={handleError}
                opts={{
                  playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
                }}
                className="yt-player"
                style={{
                  visibility: isReady ? "visible" : "hidden",
                }}
              />
            </>
          ) : currentIndex === 0 && currentVideo?.thumbnail ? (
            <img
              src={`https://i.ytimg.com/vi/${currentVideo.videoId}/maxresdefault.jpg`}
              onError={(e) => {
                e.currentTarget.src = `https://i.ytimg.com/vi/${currentVideo.videoId}/hqdefault.jpg`;
              }}
              alt="thumbnail"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => setTryPlay(true)}
            />
          ) : (
            <VideoInner $bg={homeColor}>
              <HomeBg $bg={awayColor}>
                <svg
                  preserveAspectRatio="none"
                  width="277"
                  height="289"
                  viewBox="0 0 277 289"
                  fill="none"
                >
                  <path d="M0.5 0H276.5L195.35 289H0.5V0Z" />
                </svg>
                <img className="awayEmblem" src={awayEmblem} alt="emblem" />
              </HomeBg>
              <img className="homeEmblem" src={homeEmblem} alt="emblem" />
            </VideoInner>
          )}
        </div>
      </Myhome>
    );
  }
);

export default MyhomeCard;
