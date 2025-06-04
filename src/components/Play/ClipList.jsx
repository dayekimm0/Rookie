import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ClipContent from "./ClipContent";
import PlusIcon from "../../images/icons/plusIcon.svg";

const ContentList = styled.div`
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

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const ClipList = ({ type, title }) => {
  const sampleData = [
    {
      influencerId: "@influencer1",
      videoTitle: "하이라이트 모음",
      thumbnailSrc: "/thumbnail.jpg",
    },
  ];

  // ClipContent를 10개로 나열
  const clipItems = Array.from({ length: 10 }).map((_, idx) => (
    <SwiperSlide key={idx}>
      <ClipContent {...sampleData[0]} type={type} />
    </SwiperSlide>
  ));

  return (
    <ContentList>
      <ContentTitle>
        <h2>{title}</h2>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </ContentTitle>
      <StyledSwiper
        scrollbar={{ draggable: true }}
        slidesPerView={7}
        slidesPerGroup={5}
        spaceBetween={10}
      >
        {clipItems}
      </StyledSwiper>
    </ContentList>
  );
};

export default ClipList;
