import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";

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

const Card = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 9 / 12;
  border-radius: 8px;
  background: var(--grayC);
`;

const HighlightSlide = () => {
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
          slidesPerView={6.6}
          spaceBetween={20}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
        >
          <SwiperSlide>
            <Card>Slide 1</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>Slide 2</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>Slide 3</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>Slide 4</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>Slide 5</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>Slide 6</Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>Slide 7</Card>
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
};

export default HighlightSlide;
