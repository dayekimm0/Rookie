import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import ProductCard from "../ProductCard";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import BArrow from "../../images/icons/arrow_small_w.svg";
import { useCallback, useEffect, useState } from "react";
import InfProductCard from "./InfProductCard";

const SlideContainer = styled.div`
  width: 100%;
  position: relative;
  .btns {
    position: absolute;
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

const Cardwrap = styled.div`
  & > div {
    width: 100%;
    max-width: 100%;
    padding: 0;
    & > div:first-of-type {
      width: 100%;
      height: 310px;
    }

    .brandGo {
      svg {
        stroke: white;
      }
    }
    .name {
      font-size: 1.6rem;
      div {
        font-weight: 300;
      }
    }

    @media screen and (max-width: 1440px) {
      & > div:first-of-type {
        height: 270px;
      }
    }
    @media screen and (max-width: 1280px) {
      & > div:first-of-type {
        height: 250px;
        margin-bottom: 18px;
      }
    }

    @media screen and (max-width: 1024px) {
      & > div:first-of-type {
        height: 300px;
        margin-bottom: 15px;
      }
      .name {
        font-size: 1.5rem;
      }
    }
    @media screen and (max-width: 600px) {
      & > div:first-of-type {
        height: 280px;
      }
    }

    @media screen and (max-width: 500px) {
      & > div:first-of-type {
        height: 340px;
        margin-bottom: 12px;
      }
      .name {
        font-size: 1.4rem;
        height: 39px;
      }
    }
    @media screen and (max-width: 375px) {
      width: 100%;
      .name {
        font-size: 1.3rem;
        height: 35px;
      }
    }
  }
`;

const InfProducts = ({ products, name }) => {
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
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0);
      setIsBeginning(true);
      setIsEnd(swiper.slides.length <= swiper.params.slidesPerView);
    }
  }, [products, swiper]);

  return (
    <SlideContainer>
      <div className="btns">
        <UpNaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={BArrow} alt="button" />
        </UpNaviLeftBtn>
        <UpNaviRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={BArrow} alt="button" />
        </UpNaviRightBtn>
      </div>
      <Swiper
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={50}
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
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
          },
          1600: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
          },
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={`${item.team}-${item.id}`}>
            <Cardwrap className="cardwrap">
              <InfProductCard data={item} infname={name} />
            </Cardwrap>
          </SwiperSlide>
        ))}
      </Swiper>
    </SlideContainer>
  );
};

export default InfProducts;
