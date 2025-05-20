import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import styled from "styled-components";
import gosim from "../../images/banners/banner_gosim.jpg";
import gosim_m from "../../images/banners/banner_gosim_m.jpg";
import pokemon from "../../images/banners/banner-pokemon.jpg";
import pokemon_m from "../../images/banners/banner-pokemon-m.jpg";
import tiniping from "../../images/banners/banner-tiniping.jpg";
import tiniping_m from "../../images/banners/banner-tiniping-m.jpg";
import arrBtn from "../../images/icons/main_banner_arr.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Container = styled.div`
  position: relative;
  margin-top: 140px;
  width: 100%;
  height: auto;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure {
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      &:nth-of-type(1) {
        display: block;
      }
      &:nth-of-type(2) {
        display: none;
      }
    }
    @media screen and (max-width: 768px) {
      img {
        &:nth-of-type(1) {
          display: none;
        }
        &:nth-of-type(2) {
          display: block;
        }
      }
    }
  }

  .swiper-pagination {
    width: auto;
    top: 12%;
    right: 3%;
    left: auto;
    bottom: auto;
    .swiper-pagination-bullet {
      background: var(--light);
      width: 15px;
      height: 15px;
      border-radius: 100px;
      transition: width 0.3s;
      opacity: 0.5;
      &.swiper-pagination-bullet-active {
        width: 45px;
        opacity: 1;
      }
    }

    @media screen and (max-width: 1024px) {
      top: 10%;
      right: 2%;
      .swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        &.swiper-pagination-bullet-active {
          width: 30px;
        }
      }
    }
    @media screen and (max-width: 500px) {
      top: 7%;
      right: 2%;
      .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        &.swiper-pagination-bullet-active {
          width: 25px;
        }
      }
    }
  }

  .arrbtn {
    position: absolute;
    z-index: 2;
    width: 60px;
    aspect-ratio: 1;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.2s;
    cursor: pointer;
    img {
      display: inline-block;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    &.prev {
      left: 2%;
      img {
        transform: rotate(-180deg);
        margin-right: 3px;
      }
    }
    &.next {
      right: 2%;
      img {
        margin-left: 3px;
      }
    }
    &:hover {
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
      img {
        opacity: 1;
      }
    }

    @media screen and (max-width: 1024px) {
      width: 40px;
      img {
        width: 10px;
      }
    }
    @media screen and (max-width: 500px) {
      width: 30px;
      img {
        width: 8px;
      }
      &.prev {
        left: 2%;
        img {
          margin-right: 1px;
        }
      }
      &.next {
        right: 2%;
        img {
          margin-left: 1px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
  }
  @media screen and (max-width: 500px) {
    margin-top: 60px;
  }
`;

const CollaboBanner = () => {
  const [swiper, setSwiper] = useState();
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };
  return (
    <Container>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
        speed={400}
        onSwiper={(e) => {
          setSwiper(e);
        }}
      >
        <SwiperSlide>
          <figure>
            <img src={gosim} alt="choigosim" />
            <img src={gosim_m} alt="choigosim" />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <img src={tiniping} alt="tiniping" />
            <img src={tiniping_m} alt="tiniping" />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <img src={pokemon} alt="pokemon" />
            <img src={pokemon_m} alt="pokemon" />
          </figure>
        </SwiperSlide>
      </Swiper>
      <button onClick={handlePrev} className="arrbtn prev">
        <img src={arrBtn} alt="button" />
      </button>
      <button onClick={handleNext} className="arrbtn next">
        <img src={arrBtn} alt="button" />
      </button>
    </Container>
  );
};

export default CollaboBanner;
