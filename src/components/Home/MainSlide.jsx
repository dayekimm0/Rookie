import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MainCard from "./MainCard";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "./NaviBtnStyles";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;
  overflow: hidden;

  .slider-container {
    position: relative;
  }
  .swiper {
    overflow: visible !important;
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

const MainSlide = () => {
  const [swiper, setSwiper] = useState();
  const [offset, setOffset] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };

  useEffect(() => {
    const updateOffset = () => {
      const width = window.innerWidth;

      if (width <= 500) {
        setOffset(15);
      } else if (width <= 1024) {
        setOffset(width * 0.03);
      } else {
        setOffset(width * 0.05);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <Container>
      <div className="slider-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
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
              spaceBetween: 1.1,
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
          <SwiperSlide>
            <MainCard />
          </SwiperSlide>
          <SwiperSlide>
            <MainCard />
          </SwiperSlide>
          <SwiperSlide>
            <MainCard />
          </SwiperSlide>
          <SwiperSlide>
            <MainCard />
          </SwiperSlide>
          <SwiperSlide>
            <MainCard />
          </SwiperSlide>
        </Swiper>
        <NaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={Arrow} alt="button" />
        </NaviLeftBtn>
        <NaviRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={Arrow} alt="button" />
        </NaviRightBtn>
      </div>

      <h6 className="timeLine inner">2025.04.19. 17:10 기준</h6>
    </Container>
  );
};

export default MainSlide;
