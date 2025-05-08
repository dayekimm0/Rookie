import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getEmblem } from "../../util";
import MainCard from "./MainCard";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;
  overflow: hidden;

  .swiper {
    overflow: visible !important;
  }

  h6 {
    margin-top: 20px;
    color: var(--gray8);
  }
`;

const MainSlide = () => {
  const [offset, setOffset] = useState(0);

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
          slidesPerView={3.5}
          spaceBetween={20}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
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
      </div>
      <h6 className="inner">2025.04.19. 17:10 기준</h6>
    </Container>
  );
};

export default MainSlide;
