import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "./NaviBtnStyles";
import {
  useYoutubePlaylist,
  useYoutubeVideoDetails,
} from "../../hook/useYoutubePlaylist";
import Shortscard from "./Shortscard";
import Spinner from "../Spinner";

const Title = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: start;

  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }

  .more {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 2px;
    span {
      font-size: 2rem;
      font-weight: 300;
    }
  }

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
    .more {
      span {
        font-size: 1.6rem;
      }
      img {
        width: 18px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 60px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
    .more {
      span {
        font-size: 1.1rem;
      }
      img {
        width: 13px;
      }
    }
  }
`;

const Container = styled.div`
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

  @media screen and (max-width: 1024px) {
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
  }
`;

const ShortsSlide = React.memo(({ playlistId, title, max }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  //유튜브 리스트 설정
  const {
    data: shorts = [],
    isLoading,
    isError,
  } = useYoutubePlaylist(playlistId, max);

  const videoIds = useMemo(() => {
    return shorts
      .map((item) => item.snippet.resourceId?.videoId || item.id?.videoId)
      .filter(Boolean)
      .join(",");
  }, [shorts]);

  const { data: details = [] } = useYoutubeVideoDetails(videoIds, !!videoIds);

  const slides = useMemo(() => {
    return details.map((video) => {
      const { id, snippet, statistics } = video;

      return (
        <SwiperSlide key={id}>
          <Shortscard
            thumbnail={
              snippet.thumbnails?.maxres?.url || snippet.thumbnails?.medium?.url
            }
            title={snippet.title}
            channelTitle={snippet.channelTitle}
            views={statistics.viewCount}
            likes={statistics.likeCount}
            onClick={() => console.log("Clicked:", id)}
          />
        </SwiperSlide>
      );
    });
  }, [details]);

  if (isLoading)
    return (
      <SlideLoaderWrapper>
        <Spinner />
      </SlideLoaderWrapper>
    );
  if (isError)
    return (
      <SlideLoaderWrapper>
        <div>문제가 발생하였습니다.</div>
      </SlideLoaderWrapper>
    );

  // console.log("shorts", shorts);

  return (
    <>
      <Title className="inner">
        <h3>{title}</h3>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </Title>
      <Container>
        <SlideContainer>
          <Swiper
            slidesPerView={7}
            slidesPerGroup={7}
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
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 2,
                slidesPerGroup: 3,
                spaceBetween: 6,
              },
              500: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 7,
                slidesPerGroup: 7,
                spaceBetween: 20,
              },
            }}
          >
            {slides}
          </Swiper>
        </SlideContainer>
        <NaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={Arrow} alt="button" />
        </NaviLeftBtn>
        <NaviRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={Arrow} alt="button" />
        </NaviRightBtn>
      </Container>
    </>
  );
});

export default ShortsSlide;
