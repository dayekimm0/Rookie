import { useState, useEffect, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MainCard from "./MainCard";
import MyhomeCard from "./MyhomeCard";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { MyhomeNaviLeftBtn, MyhomeNaviRightBtn } from "../Slides/NaviBtnStyles";
import { getTeamShortName } from "../../util";
import useMatchedGameVideos from "../../hook/useMatchedGameVideos";
import Spinner from "../Spinner";
import SlideErrorFallback from "../Error/SlideErrorFallback";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;

  @media screen and (max-width: 1024px) {
    padding-top: 30px;
  }
  @media screen and (max-width: 500px) {
    padding-top: 15px;
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

const SlideContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  .swiper {
    overflow: visible !important;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    gap: 14px;
    .swiper {
      width: 94%;
    }
  }
  @media screen and (max-width: 500px) {
    .swiper {
      width: calc(100% - 30px);
    }
  }
`;

const SlideLoaderWrapper = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  @media screen and (max-width: 1024px) {
    height: 320px;
    margin-top: 30px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
    margin-top: 15px;
  }
`;

// 외부 컴포넌트
const MyhomeMainSlide = ({ isMyhome }) => {
  const queryClient = useQueryClient();
  const [retryKey, setRetryKey] = useState(0);

  return (
    <>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <SlideErrorFallback
            {...props}
            onRetry={() => setRetryKey((k) => k + 1)}
          />
        )}
        onReset={() => {
          queryClient.invalidateQueries({
            queryKey: ["matchedGameVideos"],
            exact: false,
          });
        }}
        resetKeys={[retryKey]}
      >
        <Suspense
          fallback={
            <SlideLoaderWrapper>
              <Spinner />
            </SlideLoaderWrapper>
          }
        >
          <SlideContent isMyhome={isMyhome} key={retryKey}></SlideContent>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

// 내부 컴포넌트
const SlideContent = ({ isMyhome }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 500);

  // 데이터 패칭 (suspense)
  const { data } = useMatchedGameVideos();
  const { date, day, matches } = data;

  const myhome = getTeamShortName(isMyhome);
  const myMatch = matches.find(
    (match) => match.homeTeam.name === myhome || match.awayTeam.name === myhome
  );
  const otherMatches = matches.filter(
    (match) => match.homeTeam.name !== myhome && match.awayTeam.name !== myhome
  );

  // 슬라이드 이벤트
  const handlePrev = () => swiper?.slidePrev();
  const handleNext = () => swiper?.slideNext();
  // 반응형
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Container>
      <SlideContainer>
        {!isMobile && (
          <MyhomeCard
            hometeam={myMatch.homeTeam.code}
            awayteam={myMatch.awayTeam.code}
            stadium={myMatch.stadium}
            date={date}
            day={day}
            videoId={myMatch.videoId}
            thumbnail={myMatch.thumbnail}
            nextVideos={myMatch.nextVideos}
            time={myMatch.time}
          />
        )}
        <div className="slideArrWrap">
          <div className="slider-container">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              direction="vertical"
              mousewheel={true}
              onSlideChange={(e) => {
                if (e.isBeginning !== isBeginning)
                  setIsBeginning(e.isBeginning);
                if (e.isEnd !== isEnd) setIsEnd(e.isEnd);
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
                400: {
                  direction: "horizontal",
                  slidesPerView: 1.1,
                  spaceBetween: 6,
                },
                500: {
                  direction: "horizontal",
                  slidesPerView: 1.5,
                  spaceBetween: 14,
                },
                768: {
                  direction: "horizontal",
                  slidesPerView: 2.3,
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
                    date={date}
                    day={day}
                    videoId={myMatch.videoId}
                    thumbnail={myMatch.thumbnail}
                    nextVideos={myMatch.nextVideos}
                    time={myMatch.time}
                  />
                </SwiperSlide>
              )}
              {otherMatches.map((match, index) => (
                <SwiperSlide key={index}>
                  <MainCard
                    hometeam={match.homeTeam.code}
                    awayteam={match.awayTeam.code}
                    stadium={match.stadium}
                    date={date}
                    day={day}
                    videoId={match.videoId}
                    thumbnail={match.thumbnail}
                    nextVideos={match.nextVideos}
                    time={match.time}
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
      </SlideContainer>
    </Container>
  );
};

export default MyhomeMainSlide;
