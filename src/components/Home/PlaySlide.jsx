import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import PlayCard from "./PlayCard";

const Title = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 3rem;
    font-weight: 700;
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
`;

const Container = styled.div`
  padding-top: 40px;

  overflow: hidden;

  .swiper {
    overflow: visible !important;
  }
`;

const PlaySlide = () => {
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
    <>
      <Title className="inner">
        <h3>하이라이트</h3>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </Title>
      <Container>
        <Swiper
          slidesPerView={5.5}
          spaceBetween={20}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
        >
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
          <SwiperSlide>
            <PlayCard />
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
};

export default PlaySlide;
