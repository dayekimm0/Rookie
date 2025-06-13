import { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BArrow from "../../images/icons/arrow_small_w.svg";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import InfPlayCard from "./InfPlayCard";
import {
  useYoutubePlaylist,
  useYoutubeVideoDetails,
} from "../../hook/useYoutubePlaylist";

const Container = styled.div`
  position: relative;
  width: 100%;
  .btns {
    position: absolute;
    z-index: 2;
    display: flex;
    gap: 16px;
    top: -40px;
    right: 0;
    @media screen and (max-width: 1024px) {
      top: -35px;
      img {
        width: 8px;
      }
    }
    @media screen and (max-width: 500px) {
      top: -28px;
      img {
        width: 7px;
      }
    }
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
  }
`;

const InfSlide = ({ playlistId, max }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const {
    data: plays = [],
    isLoading,
    isError,
  } = useYoutubePlaylist(playlistId, max);

  const videoIds = useMemo(() => {
    return plays
      .map((item) => item.snippet.resourceId?.videoId || item.id?.videoId)
      .filter(Boolean)
      .join(",");
  }, [plays]);

  const { data: details = [] } = useYoutubeVideoDetails(videoIds, !!videoIds);

  const slides = useMemo(() => {
    return details.map((video) => {
      const { id, snippet, statistics } = video;

      return (
        <SwiperSlide key={id}>
          <InfPlayCard
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

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, [swiper, details]);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

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
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 6,
            },
            400: {
              slidesPerView: 1,
              slidesPerGroup: 1,
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

export default InfSlide;
