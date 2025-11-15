import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "./NaviBtnStyles";
import PlayCard from "./PlayCard";

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
    overflow: visible;
  }
  @media screen and (max-width: 1024px) {
    width: 94%;
  }
  @media screen and (max-width: 500px) {
    width: calc(100% - 30px);
  }
`;

const TabSlideRenderer = ({ items, onSwiperReady }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();

  const handleDetailClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

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

  const slides = useMemo(() => {
    return items.map((item) => {
      const videoId = item.snippet.resourceId?.videoId || item.id?.videoId;
      const { title, thumbnails } = item.snippet;

      return (
        <SwiperSlide key={videoId}>
          <PlayCard
            thumbnail={thumbnails?.high?.url || thumbnails?.medium?.url}
            title={title}
            onClick={() => handleDetailClick(videoId)}
          />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <Container>
      <SlideContainer>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
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
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              slidesPerGroup: 5,
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
  );
};

export default TabSlideRenderer;
