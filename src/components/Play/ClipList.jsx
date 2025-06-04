import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ClipContent from "./ClipContent";

const ContentList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 3rem;
    color: var(--light);
  }
  h4 {
    font-size: 2rem;
    color: var(--light);
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
        <h4>+ MORE</h4>
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
