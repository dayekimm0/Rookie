import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getEmblem } from "../../util";
import MainCard from "./MainCard";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;

  .slideWrap {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .slider-container {
    height: 620px;
    width: 100%;
    overflow: hidden;
  }

  .swiper {
    height: 100%;
    overflow: visible !important;
  }

  .swiper-wrapper {
    height: 100%;
  }

  .swiper-slide {
  }

  h6 {
    margin-top: 20px;
    color: var(--gray8);
  }
`;

const Myhome = styled.div`
  position: relative;
  height: 650px;
  aspect-ratio: 16 / 9;
  border: 1px solid #f00;
  .head {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px 10px;
    font-weight: 300;
    background: var(--dark);
    position: relative;
    display: flex;
    justify-content: center;
    ul {
      width: 80%;
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80px;
          margin-bottom: 6px;
        }
      }
    }
    .timetable {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 1.3;
      font-size: 1.6rem;
      .ground {
        font-size: 1.4rem;
        color: var(--grayD);
      }
    }
  }
  .video {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #ccc;
  }
`;

const MyhomeMainSlide = () => {
  return (
    <Container>
      <div className="slideWrap inner">
        <Myhome>
          <div className="head">
            <ul>
              <li className="teams">
                <img src={getEmblem(4)} alt="doosan" />
                <p>두산</p>
              </li>
              <li className="teams">
                <img src={getEmblem(4)} alt="doosan" />
                <p>두산</p>
              </li>
            </ul>
            <div className="timetable">
              <p className="date">4월 22일 (화)</p>
              <p className="time">18:30 예정</p>
              <p className="ground">고척</p>
            </div>
          </div>
          <div className="video"></div>
        </Myhome>
        <div className="slider-container">
          <Swiper slidesPerView={2} direction="vertical" mousewheel={true}>
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
      </div>
      <h6 className="inner">2025.04.19. 17:10 기준</h6>
    </Container>
  );
};

export default MyhomeMainSlide;
