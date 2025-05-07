import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getEmblem } from "../../util";

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

const Card = styled.div`
  overflow: hidden;
  border-radius: 8px;
  .head {
    padding: 15px 10px;
    font-weight: 300;
    background: var(--gray1);
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
    background: #fff;
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
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
            <Card>
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
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
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
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
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
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
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
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
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
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
      <h6 className="inner">2025.04.19. 17:10 기준</h6>
    </Container>
  );
};

export default MainSlide;
