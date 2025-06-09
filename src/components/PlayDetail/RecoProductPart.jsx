import styled from "styled-components";
import RecoProduct from "./RecoProduct";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Scrollbar } from "swiper/modules";
import "swiper/css/scrollbar";
import "swiper/css";

const RecoProductWrapper = styled.div`
  width: 100%;
  margin-top: 26px;
`;

const RecoProductTitle = styled.h1`
  font-size: 2.2rem;
  color: var(--light);
  font-weight: 600;
  margin-bottom: 26px;
`;

const RecoProductPart = () => {
  const slideCount = 7;
  const slides = Array.from({ length: slideCount }, (_, i) => (
    <SwiperSlide key={i}>
      <RecoProduct />
    </SwiperSlide>
  ));
  return (
    <RecoProductWrapper>
      <RecoProductTitle>여기서 추천하는 ROOK</RecoProductTitle>
      <Swiper
        // modules={Scrollbar}
        // scrollbar={{ draggable: true }}
        slidesPerView={3}
        slidesPerGroup={2}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 2,
            spaceBetween: 6,
          },
          400: {
            slidesPerView: 1,
            slidesPerGroup: 3,
            spaceBetween: 6,
          },
          500: {
            slidesPerView: 1,
            slidesPerGroup: 3,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 4,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 5,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 3,
            slidesPerGroup: 7,
            spaceBetween: 20,
          },
        }}
      >
        {slides}
      </Swiper>
    </RecoProductWrapper>
  );
};

export default RecoProductPart;
