import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { ClipLeftBtn, ClipRightBtn } from "../Slides/NaviBtnStyles";

import ClipContent from "./ClipContent";
import ClipDetail from "../ClipDetail";

import { playContents } from "../../data/playcontents";
import { fetchPlaylistVideos } from "../../hook/useYoutubeContentList";
import { fetchTeamPlaylists } from "../../hook/useTeamPlayList";
import useHeaderStore from "../../stores/headerHeightStore";

const ContentList = styled.div`
  position: relative;
  /* height: 100%; */
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
    font-weight: bold;
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

const ClipList = ({ type, title, externalVideos }) => {
  const [videos, setVideos] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const config = playContents[type];
      if (!config) return;
      let items = [];

      if (config.playlists) {
        items = await fetchTeamPlaylists(config.playlists);
      } else {
        items = await fetchPlaylistVideos(config.playlistId, config.max);
      }

      // 최신순 정렬
      const sorted = items.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setVideos(sorted);
    };

    load();
  }, [type]);

  //인플루언서 페이지 클립 전용
  useEffect(() => {
    if (Array.isArray(externalVideos)) {
      setVideos(externalVideos);
      return;
    }
  }, [externalVideos]);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  const handleOpenModal = (id) => {
    setSelectedVideoId(id);
    swiper?.autoplay?.stop();
  };

  const handleCloseModal = () => {
    setSelectedVideoId(null);
    swiper?.autoplay?.start();
  };

  //클립 모달 스크롤 막기
  useEffect(() => {
    if (selectedVideoId) {
      const y = window.scrollY;
      lenis.stop();

      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = y;
    } else {
      const y = parseFloat(document.body.dataset.scrollY || "0");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.removeAttribute("data-scroll-y");

      window.scrollTo(0, y);
      lenis.start();
    }
  }, [selectedVideoId]);

  //모달열림상태 헤더에게 전달
  const { setScrollLocked } = useHeaderStore.getState();

  useEffect(() => {
    if (selectedVideoId) {
      setScrollLocked(true);
    } else {
      setScrollLocked(false);
    }
  }, [selectedVideoId]);

  return (
    <>
      <ContentList>
        <ContentTitle>
          <h2>{title}</h2>
          {/* <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div> */}
        </ContentTitle>

        <Container>
          <Swiper
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
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <ClipContent
                  type={type}
                  {...video}
                  onOpenModal={handleOpenModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <ClipLeftBtn onClick={handlePrev} disabled={isBeginning}>
            <img src={Arrow} alt="prev" />
          </ClipLeftBtn>
          <ClipRightBtn onClick={handleNext} disabled={isEnd}>
            <img src={Arrow} alt="next" />
          </ClipRightBtn>
        </Container>
      </ContentList>
      {selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          onClose={handleCloseModal}
          videoList={videos}
        />
      )}
    </>
  );
};

export default ClipList;
