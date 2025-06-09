import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MainCard from "./MainCard";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "../Slides/NaviBtnStyles";
import { useMatchedGameVideos } from "../../hook/useYoutubePlaylist";

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

const MainSlide = () => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [timeString, setTimeString] = useState("");

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

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

  const { date, day, matches, isLoading, isError } = useMatchedGameVideos();

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

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
                slidesPerView: 1.1,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 1.1,
                spaceBetween: 6,
              },
              500: {
                slidesPerView: 1.7,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 2.5,
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

      <h6 className="timeLine inner">{timeString} 이거 수정 들어가야함</h6>
    </Container>
  );
};

export default MainSlide;
