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
  padding-top: 40px;
  overflow: hidden;
  position: relative;
  .swiper {
    overflow: visible !important;
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

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h5 {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 1.4;
    color: var(--grayD);
  }
`;

const Thumbnail = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 /9;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaySlide = () => {
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
        <h3>추천영상</h3>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </Title>
      <Container>
        <Swiper
          slidesPerView={5}
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
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/EeT7tZDxQws/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDFfug-538wWcUPj-AQRv6zSm8zDw"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [KIA vs 키움] 야구 하이라이트｜5.7｜2025 신한 SOL뱅크 KBO
                리그｜HIGHLIGHT
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/dnVpwwXLr5c/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA3gqwvhnutb_3k05dEpmN-4VKl0Q"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [삼성 vs 한화] 야구 하이라이트｜5.7｜2025 신한 SOL뱅크 KBO
                리그｜HIGHLIGHT
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/ueuc-JmKV6s/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD5zU4cr2d1RczGNf9vEwljGsfjOA"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [NC vs KT] 야구 하이라이트｜5.7｜2025 신한 SOL뱅크 KBO
                리그｜HIGHLIGHT
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/UQPVvqPg3ko/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCoO4tW7JKleBqWdlNVdblZOQAYow"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [LG vs 두산] 야구 하이라이트｜5.7｜2025 신한 SOL뱅크 KBO
                리그｜HIGHLIGHT
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/rMY58ImgbS0/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLADqulrLUq1VGkE4rxOmzEr6816DQ"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [SSG vs 롯데] 야구 하이라이트｜5.7｜2025 신한 SOL뱅크 KBO
                리그｜HIGHLIGHT
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/coXvw77c-gc/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI2gDXpcy-gupzklYFBS-G2tuIrw"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [KIA vs 키움] (무해설) 포기하지 않은 영웅! 최주환의 싹쓸이 역전
                적시타 순간! | 5.7 | #크보모먼트 BY 삼진제약 | 야구 하이라이트
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/sbz8iXRmBzE/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCGSH8sFIyXkEP9ah8QDbRhT9ey0Q"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [삼성 vs 한화] (9회 노컷) 20년 만에 9연승 도전하는 한화, 그리고
                마운드에는 김서현 | 5.7 | #크보모먼트 BY 삼진제약 | 야구
                하이라이트
              </h5>
            </CardWrap>
          </SwiperSlide>
          <SwiperSlide>
            <CardWrap>
              <Thumbnail>
                <img
                  src="https://i.ytimg.com/vi/WWx-_ZCiXgI/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAEMDbJ3JB_BywQ8AQh_FiNUDxooQ"
                  alt="mockup"
                />
              </Thumbnail>
              <h5>
                [SSG vs 롯데] (무해설) 사직을 열광시킨 롯데 레이예스의
                스리런부터 이호준의 적시타까지! | 5.7 | #크보모먼트 BY 삼진제약
                | 야구 하이라이트
              </h5>
            </CardWrap>
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

export default PlaySlide;
