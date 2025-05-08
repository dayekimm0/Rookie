import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import Arrow from "../../images/icons/main_banner_arr.svg";

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
  margin-top: 40px;
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

const NaviLeftBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 5%;
  height: 100%;
  background: linear-gradient(90deg, #222 0%, rgba(255, 255, 255, 0) 100%);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;
  img {
    transform: rotate(-180deg);
    margin-right: 10px;
    display: inline-block;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }
`;

const NaviRightBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 5%;
  height: 100%;
  background: linear-gradient(-90deg, #222 0%, rgba(255, 255, 255, 0) 100%);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;
  img {
    margin-left: 10px;
    display: inline-block;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }
`;

const HighlightSlide = () => {
  const [swiper, setSwiper] = useState();
  const [offset, setOffset] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
          slidesPerView={8}
          spaceBetween={20}
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
          onSlideChange={(e) => {
            setIsBeginning(e.isBeginning);
            setIsEnd(e.isEnd);
          }}
          onSwiper={(e) => {
            setSwiper(e);
          }}
          onReachEnd={() => setIsEnd(true)}
          onFromEdge={() => setIsEnd(false)}
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
