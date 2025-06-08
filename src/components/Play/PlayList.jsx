import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { PlayLeftBtn, PlayRightBtn } from "../Slides/NaviBtnStyles";
import PlayContent from "./PlayContent";
import WeeklyBanner from "./WeeklyBanner";

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

const Container = styled.div`
  position: relative;
`;

const PlayList = ({ type, title }) => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate("/playall");
  };

  // 샘플 데이터 (실제는 type별 API 호출 등으로 변경)
  const baseData = [
    {
      thumbnailSrc: "/thumbnail.jpg",
      channelName: "KBO",
      influencerId: "@influencer1",
      videoTitle: "하이라이트 모음",
    },
  ];

  const dataLength = 15;

  const sampleData = Array.from(
    { length: dataLength },
    (_, i) => baseData[i % baseData.length]
  );

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
        <div className="more" onClick={handleMoreClick}>
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </ContentTitle>

      {type === "weekly play" && <WeeklyBanner />}

      <Container>
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 6,
            },
            500: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 20,
            },
          }}
        >
          {sampleData.map((item, idx) => (
            <SwiperSlide key={idx}>
              <PlayContent {...item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <PlayLeftBtn onClick={handlePrev} disabled={isBeginning}>
          <img src={Arrow} alt="prev" />
        </PlayLeftBtn>
        <PlayRightBtn onClick={handleNext} disabled={isEnd}>
          <img src={Arrow} alt="next" />
        </PlayRightBtn>
      </Container>
    </ContentList>
  );
};

export default PlayList;
