import { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BArrow from "../../images/icons/Bmain_banner_arr.svg";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import PlayCard from "../Slides/PlayCard";

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
  margin-bottom: 80px;
  .swiper {
    overflow: visible !important;
    h5 {
      color: var(--gray1);
    }
  }
`;

const MyTabSlideRenderer = ({ items, onSwiperReady }) => {
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
            thumbnail={thumbnails?.maxres?.url || thumbnails?.medium?.url}
            title={title}
            onClick={() => console.log("Clicked:", videoId)}
          />
        </SwiperSlide>
      );
    });
  }, [items]);

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

export default MyTabSlideRenderer;
