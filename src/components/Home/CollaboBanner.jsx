import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import styled from "styled-components";
import gosim from "../../images/banners/banner_gosim.jpg";
import gosim_M from "../../images/banners/banner_gosim_m.jpg";
import pokemon from "../../images/banners/banner-pokemon.jpg";
import pokemon_M from "../../images/banners/banner-pokemon-m.jpg";
import tiniping from "../../images/banners/banner-tiniping.jpg";
import tiniping_M from "../../images/banners/banner-tiniping-m.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Container = styled.div`
  padding-top: 140px;
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

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const CollaboBanner = () => {
  return (
    <Container>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        loop={true}
        speed={400}
      >
        <SwiperSlide>
          <figure>
            <img src={gosim} alt="choigosim" />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <img src={tiniping} alt="tiniping" />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <img src={pokemon} alt="pokemon" />
          </figure>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default CollaboBanner;
