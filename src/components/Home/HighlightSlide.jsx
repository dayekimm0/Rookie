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
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
        </Swiper>
      </Container>
    </>
  );
};

export default HighlightSlide;
