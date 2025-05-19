import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "./NaviBtnStyles";

const Title = styled.div`
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: start;

  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
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

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
    .more {
      span {
        font-size: 1.6rem;
      }
      img {
        width: 18px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 60px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
    .more {
      span {
        font-size: 1.1rem;
      }
      img {
        width: 13px;
      }
    }
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
  .swiper {
    overflow: visible !important;
  }
`;

const Card = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 8px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HighlightSlide = () => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };
  useEffect(() => {
    if (!swiper) return;

    const applyOffset = () => {
      const width = window.innerWidth;
      let offsetValue = 0;

      if (width <= 500) offsetValue = 15;
      else if (width <= 1024) offsetValue = width * 0.03;
      else offsetValue = width * 0.05;

      swiper.params.slidesOffsetBefore = offsetValue;
      swiper.params.slidesOffsetAfter = offsetValue;
      swiper.update();
    };

    applyOffset();
    window.addEventListener("resize", applyOffset);
    return () => window.removeEventListener("resize", applyOffset);
  }, [swiper]);

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
          observer={true}
          observeParents={true}
          slidesPerView={8}
          spaceBetween={20}
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
              slidesPerView: 2.8,
              spaceBetween: 6,
            },
            400: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/QyNVfDBaPf4/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLCdF-Xa8uz-UBswx0diS1vqA4uViA"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/RDmWndBi8qE/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLCdf6JqNmK7PcVCBfxMyQO1VjmMHQ"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/0RpSTfcftZ4/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLCN5rSQG6cXLCBvXY2XxayMFADgKw"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/XualNGD_-ck/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLB0itLTXjbBxI4C7aPv-DYnLNS1BQ"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/QFO7eoy_E5U/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLBzhKsQg0RXKm8hxfMYZtuaH5y9Bg"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/IZNL0vilqF0/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDmvx2og6Gs72wj7LK8nP8mXh8Wmw"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/2CeLUTXZuLw/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLBNkvYs4ytrqYj8andwTv3qtS-BIA"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/9wQ6DlIF2a4/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLBwxfa1uNDYt94dZ_-oNx8yzlkfBA"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <img
                src="https://i.ytimg.com/vi/V_lg088OSUI/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLCRQ12-FVQ-m2-JtNvHlTmKy6_QDA"
                alt="mockup"
              />
            </Card>
          </SwiperSlide>
        </Swiper>
        <NaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={Arrow} alt="button" />
        </NaviLeftBtn>
        <NaviRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={Arrow} alt="button" />
        </NaviRightBtn>
      </Container>
    </>
  );
};

export default HighlightSlide;
