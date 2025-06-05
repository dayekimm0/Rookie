import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ClipContent from "./ClipContent";
import PlusIcon from "../../images/icons/plusIcon.svg";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { ClipLeftBtn, ClipRightBtn } from "../Slides/NaviBtnStyles";

const ContentList = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: var(--light);

  @media screen and (max-width: 1024px) {
    gap: 30px;
  }

  @media screen and (max-width: 768px) {
    gap: 20px;
  }

  @media screen and (max-width: 500px) {
    gap: 15px;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 3rem;
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
    h2 {
      font-size: 2.5rem;
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
    h2 {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 500px) {
    h2 {
      font-size: 1.6rem;
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

const StyledSwiperWrapper = styled.div`
  position: relative;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const ClipList = ({ type, title }) => {
  const sampleData = [
    {
      thumbnailSrc: "/thumbnail.jpg",
      influencerId: "@influencer1",
      videoTitle: "하이라이트 모음",
    },
  ];

  const clipItems = Array.from({ length: 21 }).map((_, idx) => (
    <SwiperSlide key={idx}>
      <ClipContent {...sampleData[0]} type={type} />
    </SwiperSlide>
  ));

  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  return (
    <ContentList>
      <ContentTitle>
        <h2>{title}</h2>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </ContentTitle>

      <StyledSwiperWrapper>
        <StyledSwiper
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 6,
            },
            400: {
              slidesPerView: 2,
              slidesPerGroup: 3,
              spaceBetween: 6,
            },
            500: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 7,
              slidesPerGroup: 7,
              spaceBetween: 20,
            },
          }}
        >
          {clipItems}
        </StyledSwiper>

        <ClipLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={Arrow} alt="prev" />
        </ClipLeftBtn>
        <ClipRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={Arrow} alt="next" />
        </ClipRightBtn>
      </StyledSwiperWrapper>
    </ContentList>
  );
};

export default ClipList;
