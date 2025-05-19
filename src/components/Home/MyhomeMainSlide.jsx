import { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MainCard from "./MainCard";
import MyhomeCard from "./MyhomeCard";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { MyhomeNaviLeftBtn, MyhomeNaviRightBtn } from "./NaviBtnStyles";
import { getTodayMatches, getTeamShortName } from "../../util";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;

  .slideWrap {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    /* overflow: hidden; */
  }

  .slideArrWrap {
    width: 520px;
    position: relative;
  }

  .slider-container {
    /* border: 1px solid #f00; */
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .swiper {
    /* border: 1px solid #fff; */
    width: 100%;
    height: 412.5px;
    overflow: visible !important;
  }

  .swiper-wrapper {
    /* border: 1px solid #ff0; */
    height: 100%;
  }

  .swiper-slide {
    /* border: 1px solid #0f0; */
    height: 100%;
  }

  .timeLine {
    margin-top: 20px;
    font-size: 1.6rem;
    color: var(--gray8);
  }

  @media screen and (max-width: 1440px) {
    overflow: hidden;
    position: relative;
    .slideArrWrap {
      width: 350px;
    }
    .swiper {
      height: 297px;
    }
  }

  @media screen and (max-width: 1024px) {
    .slideWrap {
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      gap: 14px;
      &.inner {
        margin: 0;
      }
    }
    .slideArrWrap {
      width: 100%;
    }
    .swiper {
      height: auto;
    }
    .timeLine {
      margin-top: 15px;
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 500px) {
    .timeLine {
      margin-top: 12px;
      font-size: 1.2rem;
    }
  }
`;

const MyhomeMainSlide = ({ isMyhome }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 500);
  const [timeString, setTimeString] = useState("");

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    if (!swiper) return;

    const applyOffsetIfHorizontal = () => {
      const width = window.innerWidth;

      const isHorizontal = width < 1024;

      if (isHorizontal) {
        const offsetValue =
          width <= 500 ? 15 : width <= 1024 ? width * 0.03 : width * 0.05;

        swiper.params.slidesOffsetBefore = offsetValue;
        swiper.params.slidesOffsetAfter = offsetValue;
      } else {
        swiper.params.slidesOffsetBefore = 0;
        swiper.params.slidesOffsetAfter = 0;
      }

      swiper.update();
    };

    applyOffsetIfHorizontal();
    window.addEventListener("resize", applyOffsetIfHorizontal);
    return () => window.removeEventListener("resize", applyOffsetIfHorizontal);
  }, [swiper]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTimeString(`${formatted} 기준`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const gameDay = getTodayMatches();

  const myhome = getTeamShortName(isMyhome);

  const matches = gameDay.matches;

  const myMatch = matches.find(
    (match) => match.homeTeam.name === myhome || match.awayTeam.name === myhome
  );
  const otherMatches = matches.filter(
    (match) => match.homeTeam.name !== myhome && match.awayTeam.name !== myhome
  );

  return (
    <Container>
      <div className="slideWrap inner">
        {!isMobile && (
          <MyhomeCard
            hometeam={myMatch.homeTeam.code}
            awayteam={myMatch.awayTeam.code}
            stadium={myMatch.stadium}
            date={gameDay.date}
            day={gameDay.day}
          />
        )}
        <div className="slideArrWrap">
          <div className="slider-container">
            <Swiper
              observer={true}
              observeParents={true}
              slidesPerView={1}
              spaceBetween={20}
              direction="vertical"
              mousewheel={true}
              onSlideChange={(e) => {
                setIsBeginning(e.isBeginning);
                setIsEnd(e.isEnd);
              }}
              onSwiper={(e) => {
                setSwiper(e);
              }}
              onReachEnd={() => setIsEnd(true)}
              onFromEdge={() => setIsEnd(false)}
              breakpoints={{
                0: {
                  direction: "horizontal",
                  slidesPerView: 1.1,
                  spaceBetween: 6,
                },
                500: {
                  direction: "horizontal",
                  slidesPerView: 1.7,
                  spaceBetween: 14,
                },
                768: {
                  direction: "horizontal",
                  slidesPerView: 2.5,
                  spaceBetween: 14,
                },
                1024: {
                  direction: "vertical",
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
              }}
            >
              {isMobile && (
                <SwiperSlide>
                  <MyhomeCard
                    hometeam={myMatch.homeTeam.code}
                    awayteam={myMatch.awayTeam.code}
                    stadium={myMatch.stadium}
                    date={gameDay.date}
                    day={gameDay.day}
                  />
                </SwiperSlide>
              )}
              {otherMatches.map((match, index) => (
                <SwiperSlide key={index}>
                  <MainCard
                    hometeam={match.homeTeam.code}
                    awayteam={match.awayTeam.code}
                    stadium={match.stadium}
                    date={gameDay.date}
                    day={gameDay.day}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <MyhomeNaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
            <img src={Arrow} alt="button" />
          </MyhomeNaviLeftBtn>
          <MyhomeNaviRightBtn onClick={handleNext} disabled={isEnd}>
            <img src={Arrow} alt="button" />
          </MyhomeNaviRightBtn>
        </div>
      </div>
      <h6 className="timeLine inner">{timeString}</h6>
    </Container>
  );
};

export default MyhomeMainSlide;
