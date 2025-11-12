import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MainCard from "./MainCard";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "../Slides/NaviBtnStyles";
import useMatchedGameVideos from "../../hook/useMatchedGameVideos";
import Spinner from "../Spinner";
import SlideErrorFallback from "../Error/SlideErrorFallback";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    padding-top: 30px;
  }
  @media screen and (max-width: 500px) {
    padding-top: 15px;
  }

  .timeLine {
    margin-top: 20px;
    color: var(--gray8);
  }

  @media screen and (max-width: 1024px) {
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

const SliderContainerwrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  .swiper {
    overflow: visible !important;
  }
  @media screen and (max-width: 1024px) {
    width: 94%;
  }
  @media screen and (max-width: 500px) {
    width: calc(100% - 30px);
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

const MainSlide = () => {
  const queryClient = useQueryClient();
  const [retryKey, setRetryKey] = useState(0);

  return (
    <>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <SlideErrorFallback
            {...props}
            onRetry={() => {
              setFailMode(false);
              setRetryKey((k) => k + 1);
            }}
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
          <SlideContent key={retryKey} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const SlideContent = () => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // 데이터 패칭 (suspense 쿼리)
  const { data } = useMatchedGameVideos();
  const { date, day, matches } = data;

  // 슬라이드 이벤트
  const handlePrev = () => swiper?.slidePrev();
  const handleNext = () => swiper?.slideNext();

  return (
    <Container>
      <SliderContainerwrap>
        <SlideContainer>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            onSlideChange={(e) => {
              if (e.isBeginning !== isBeginning) setIsBeginning(e.isBeginning);
              if (e.isEnd !== isEnd) setIsEnd(e.isEnd);
            }}
            onSwiper={(e) => {
              setSwiper(e);
            }}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => setIsEnd(false)}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 1.1,
                spaceBetween: 6,
              },
              500: {
                slidesPerView: 1.5,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 2.3,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {matches.map((match, index) => (
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
        </SlideContainer>
        <NaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={Arrow} alt="button" />
        </NaviLeftBtn>
        <NaviRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={Arrow} alt="button" />
        </NaviRightBtn>
      </SliderContainerwrap>
    </Container>
  );
};

export default MainSlide;
