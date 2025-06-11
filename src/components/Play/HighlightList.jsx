import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HighlightContent from "./HighlightContent";
import { PlayLeftBtn, PlayRightBtn } from "../Slides/NaviBtnStyles";
import Arrow from "../../images/icons/main_banner_arr.svg";
import PlusIcon from "../../images/icons/plusIcon.svg";
import { playContents } from "../../data/playcontents";
import { fetchPlaylistVideos } from "../../hook/useYoutubeContentList";
import { useNavigate } from "react-router-dom";

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

const HighlightLeftBtn = styled(PlayLeftBtn)`
  top: 50%;
  transform: translateY(-50%);
`;

const HighlightRightBtn = styled(PlayRightBtn)`
  top: 50%;
  transform: translateY(-50%);
`;

const getDiff = (slideIndex, activeIndex, length) => {
  let diff = Math.abs(slideIndex - activeIndex);
  if (diff > length / 2) diff = length - diff;
  return diff > 3 ? 4 : diff;
};

const getClassByDiff = (diff) => {
  if (diff === 0) return "diff-0";
  if (diff === 1) return "diff-1";
  if (diff === 2) return "diff-2";
  if (diff === 3) return "diff-3";
  return "diff-more";
};

const HighlightList = ({ type, title }) => {
  const [videos, setVideos] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVideos = async () => {
      const config = playContents[type];
      if (!config) return;

      const fetched = await fetchPlaylistVideos(config.playlistId, config.max);
      setVideos(fetched);
    };

    loadVideos();
  }, [type]);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const handleMoreClick = () => {
    navigate("/playall");
  };

  return (
    <ContentList>
      <ContentTitle>
        <h2>{title}</h2>
        <div className="more" onClick={handleMoreClick}>
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </ContentTitle>

      <Container>
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          loop={videos.length > 7}
          centeredSlides={true}
          slidesPerView={7}
          spaceBetween={-50}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          allowTouchMove={false}
          breakpoints={{
            0: { slidesPerView: 3 },
            520: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
          style={{ paddingLeft: "50px", paddingRight: "50px" }}
        >
          {videos.map((video, idx) => {
            const diff = getDiff(idx, activeIndex, videos.length);
            const className = getClassByDiff(diff);

            return (
              <SwiperSlide
                key={video.id}
                data-swiper-slide-index={idx}
                style={{
                  position: "relative",
                  maxWidth: "280px",
                  aspectRatio: "9/16",
                }}
              >
                <HighlightContent
                  thumbnail={video.thumbnail}
                  className={className}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <HighlightLeftBtn onClick={handlePrev}>
          <img src={Arrow} alt="prev" />
        </HighlightLeftBtn>
        <HighlightRightBtn onClick={handleNext}>
          <img src={Arrow} alt="next" />
        </HighlightRightBtn>
      </Container>
    </ContentList>
  );
};

export default HighlightList;
