import React, { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BArrow from "../../images/icons/Bmain_banner_arr.svg";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import {
  useYoutubePlaylist,
  useYoutubeVideoDetails,
} from "../../hook/useYoutubePlaylist";
import Shortscard from "../Slides/Shortscard";

const Container = styled.div`
  position: relative;
  width: 100%;
  .btns {
    position: absolute;
    display: flex;
    gap: 16px;
    top: -34px;
    right: 0;
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .swiper {
    overflow: visible !important;
    h5 {
      color: var(--gray1);
    }
  }
`;

const MyShortsSlide = React.memo(({ playlistId, max }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  useEffect(() => {
    const handleResize = () => {
      if (swiper) {
        swiper.update(); // Swiper 인스턴스를 강제로 업데이트
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  // console.log("shorts", shorts);

  return (
    <>
      <Container>
        <div className="btns">
          <UpNaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
            <img src={BArrow} alt="button" />
          </UpNaviLeftBtn>
          <UpNaviRightBtn onClick={handleNext} disabled={isEnd}>
            <img src={BArrow} alt="button" />
          </UpNaviRightBtn>
        </div>
        <SlideContainer>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
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
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 6,
              },
              500: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
            }}
          >
            {slides}
          </Swiper>
        </SlideContainer>
      </Container>
    </>
  );
});

export default MyShortsSlide;
