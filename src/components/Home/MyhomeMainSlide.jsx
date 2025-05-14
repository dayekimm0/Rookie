import { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getEmblem } from "../../util";
import MainCard from "./MainCard";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { MyhomeNaviLeftBtn, MyhomeNaviRightBtn } from "./NaviBtnStyles";

const Container = styled.div`
  width: 100%;
  padding-top: 40px;

  .slideWrap {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    /* overflow: hidden; */
  }

  .slideArrWrap {
    width: 520px;
    position: relative;
  }

  .slider-container {
    /* border: 1px solid #f00; */
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .swiper {
    /* border: 1px solid #fff; */
    width: 100%;
    height: 412.5px;
    overflow: visible !important;
  }

  .swiper-wrapper {
    /* border: 1px solid #ff0; */
    height: 100%;
  }

  .swiper-slide {
    /* border: 1px solid #0f0; */
    height: 100%;
  }

  .timeLine {
    margin-top: 20px;
    font-size: 1.6rem;
    color: var(--gray8);
  }

  @media screen and (max-width: 1440px) {
    overflow: hidden;
    position: relative;
    .slideArrWrap {
      width: 350px;
    }
    .swiper {
      height: 297px;
    }
  }

  @media screen and (max-width: 1024px) {
    .slideWrap {
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      gap: 14px;
      &.inner {
        margin: 0;
      }
    }
    .slideArrWrap {
      width: 100%;
    }
    .swiper {
      height: auto;
    }
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

const Myhome = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  width: calc(100% - 520px - 20px);
  aspect-ratio: 16 / 9;
  .head {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    font-weight: 300;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    display: flex;
    justify-content: center;
    ul {
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.6rem;
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

  @media screen and (max-width: 1440px) {
    width: calc(100% - 350px - 20px);
    .head {
      height: 100px;
      ul {
        width: 60%;
        li {
          font-size: 1.4rem;
          img {
            width: 60px;
            margin-bottom: 2px;
          }
        }
      }
      .timetable {
        font-size: 1.4rem;
        .ground {
          font-size: 1.3rem;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    aspect-ratio: auto;
    height: auto;
    padding: 0 3%;
    border-radius: 0px;
    .head {
      height: 100px;
      position: relative;
      border-radius: 8px 8px 0 0;
    }
    .video {
      position: relative;
      aspect-ratio: 16 / 9;
      height: auto;
      border-radius: 0 0 8px 8px;
    }
  }
  @media screen and (max-width: 768px) {
    .head {
      padding: 8px;
      height: 80px;
      ul {
        width: 75%;
        li {
          font-size: 1.1rem;
          img {
            width: 50px;
            margin-bottom: 2px;
          }
        }
      }
      .timetable {
        font-size: 1.2rem;
        .ground {
          font-size: 1rem;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

const MyhomeMainSlide = () => {
  const [swiper, setSwiper] = useState();
  const [offset, setOffset] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

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

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Container>
      <div className="slideWrap inner">
        {!isMobile && (
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
        )}
        <div className="slideArrWrap">
          <div className="slider-container">
            <Swiper
              key={offset}
              slidesPerView={1}
              spaceBetween={20}
              direction="vertical"
              mousewheel={true}
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
                  direction: "horizontal",
                  slidesPerView: 1.1,
                  spaceBetween: 6,
                  slidesOffsetBefore: offset,
                  slidesOffsetAfter: offset,
                },
                500: {
                  direction: "horizontal",
                  slidesPerView: 1.7,
                  spaceBetween: 14,
                  slidesOffsetBefore: offset,
                  slidesOffsetAfter: offset,
                },
                768: {
                  direction: "horizontal",
                  slidesPerView: 2.5,
                  spaceBetween: 14,
                  slidesOffsetBefore: offset,
                  slidesOffsetAfter: offset,
                },
                1024: {
                  direction: "vertical",
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
              }}
            >
              {isMobile && (
                <SwiperSlide>
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
                </SwiperSlide>
              )}
              <SwiperSlide>
                <MainCard bg={""} />
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
          <MyhomeNaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
            <img src={Arrow} alt="button" />
          </MyhomeNaviLeftBtn>
          <MyhomeNaviRightBtn onClick={handleNext} disabled={isEnd}>
            <img src={Arrow} alt="button" />
          </MyhomeNaviRightBtn>
        </div>
      </div>
      <h6 className="timeLine inner">2025.04.19. 17:10 기준</h6>
    </Container>
  );
};

export default MyhomeMainSlide;
