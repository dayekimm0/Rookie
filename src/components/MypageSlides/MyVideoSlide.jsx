import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { useYoutubeVideoDetails } from "../../hook/useYoutubePlayList";
import { parseISO8601Duration } from "../../utils/youtube";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import { useVideoStore } from "../../stores/videoStore";

import PlayCard from "../Slides/PlayCard";
import BArrow from "../../images/icons/Bmain_banner_arr.svg";

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
  margin-bottom: 56px;
  .swiper {
    overflow: visible !important;
    h5 {
      color: var(--gray1);
    }
  }
`;

const SlideLoaderWrapper = styled.div`
  height: 800px;
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

const SvgSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  .path {
    stroke: var(--main);
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

const MyVideoSlide = ({ onSwiperReady }) => {
  const { videoIds, likesLoading, fetchVideoIds } = useVideoStore();
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();

  const handleDetailClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

  // 좋아요 목록 fetch
  useEffect(() => {
    fetchVideoIds();
  }, [fetchVideoIds]);

  const idsParam = useMemo(() => {
    return videoIds.length ? videoIds.join(",") : null;
  }, [videoIds]);

  const { data: videos = [], isLoading: videosLoading } =
    useYoutubeVideoDetails(idsParam, !likesLoading && !!idsParam > 0);

  // 슬라이드
  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  useEffect(() => {
    if (swiper && onSwiperReady) {
      onSwiperReady(swiper);
    }
  }, [swiper]);

  // 영상 디테일
  const slides = useMemo(() => {
    return videos
      .filter(
        (video) => parseISO8601Duration(video.contentDetails.duration) > 99
      )
      .map((video) => {
        const vid = video.id;
        const { title, thumbnails } = video.snippet;
        const thumbUrl = thumbnails.maxres?.url || thumbnails.medium?.url;

        return (
          <SwiperSlide key={vid}>
            <PlayCard
              thumbnail={thumbUrl}
              title={title}
              onClick={() => handleDetailClick(vid)}
            />
          </SwiperSlide>
        );
      });
  }, [videos]);

  if (likesLoading || videosLoading) {
    return (
      <SlideLoaderWrapper>
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
      </SlideLoaderWrapper>
    );
  }

  if (slides.length === 0) {
    return <></>;
  }

  return (
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
          slidesPerView={3}
          slidesPerGroup={3}
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
            500: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 14,
            },
            1440: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
          }}
        >
          {slides}
        </Swiper>
      </SlideContainer>
    </Container>
  );
};

export default MyVideoSlide;
