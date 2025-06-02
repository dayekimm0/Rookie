import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import Arrow from "../../images/icons/main_banner_arr.svg";
import { NaviLeftBtn, NaviRightBtn } from "./NaviBtnStyles";
import {
  useYoutubePlaylist,
  fetchYoutubePlaylist,
} from "../../hook/useYoutubePlaylist";
import PlayCard from "./PlayCard";
import { useQueries } from "@tanstack/react-query";

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
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  .swiper {
    overflow: visible !important;
  }
  @media screen and (max-width: 1024px) {
    width: 94%;
  }
  @media screen and (max-width: 500px) {
    width: calc(100% - 30px);
  }
`;

const TabNav = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;

  button {
    padding: 8px 18px;
    font-size: 1.4rem;
    border: none;
    border-radius: 100px;
    background: var(--gray2);
    color: var(--grayE);
    cursor: pointer;

    &.active {
      background: #f5f5f5;
      color: #111;
      font-weight: 600;
    }
  }
`;

const PlaySlide = () => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  // 탭 버튼
  const tabs = [
    {
      name: "전체",
      isAll: true,
      playlists: [
        { id: "PLuY-NTS_5IpxSLENcrLkC1_E7RuWldqXR", max: 15 },
        { id: "PLuY-NTS_5Ipwm3kK7npcPz7F-KJsP68My", max: 15 },
        { id: "PLuY-NTS_5Ipz_1rm38KzVa2JB9zQMn9Us", max: 15 },
      ],
    },
    {
      name: "하이라이트",
      playlistId: "PLuY-NTS_5IpxSLENcrLkC1_E7RuWldqXR",
      max: 15,
    },
    {
      name: "KBO 모먼트",
      playlistId: "PLuY-NTS_5Ipwm3kK7npcPz7F-KJsP68My",
      max: 15,
    },
    {
      name: "KBO Vibes",
      playlistId: "PLuY-NTS_5Ipz_1rm38KzVa2JB9zQMn9Us",
      max: 15,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isAllTab = activeTab.isAll;

  //유튜브 재생목록 리액트쿼리
  const allQueries = useQueries({
    queries: isAllTab
      ? activeTab.playlists.map(({ id, max }) => ({
          queryKey: ["youtubePlaylist", id, max],
          queryFn: () =>
            fetchYoutubePlaylist({ queryKey: ["youtubePlaylist", id, max] }),
        }))
      : [],
  });

  const singleQuery = useYoutubePlaylist(activeTab.playlistId, activeTab.max);

  const items = isAllTab
    ? allQueries
        .flatMap((q) => q.data || [])
        .sort(
          (a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        )
        .slice(0, 15)
    : singleQuery.data || [];

  const isLoading = isAllTab
    ? allQueries.some((q) => q.isLoading)
    : singleQuery.isLoading;

  const isError = isAllTab
    ? allQueries.some((q) => q.isError)
    : singleQuery.isError;

  const slides = useMemo(() => {
    return items.map((item) => {
      const videoId = item.snippet.resourceId?.videoId || item.id?.videoId;
      const { title, thumbnails } = item.snippet;

      return (
        <SwiperSlide key={videoId}>
          <PlayCard
            thumbnail={thumbnails?.maxres?.url || thumbnails?.medium?.url}
            title={title}
            onClick={() => console.log("Clicked:", videoId)}
          />
        </SwiperSlide>
      );
    });
  }, [items]);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  return (
    <>
      <Title className="inner">
        <h3>추천영상</h3>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </Title>
      <TabNav className="inner">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={activeTab.name === tab.name ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </button>
        ))}
      </TabNav>
      <Container>
        <SlideContainer>
          <Swiper
            slidesPerView={5}
            slidesPerGroup={5}
            spaceBetween={20}
            onSlideChange={(e) => {
              if (e.isBeginning !== isBeginning) setIsBeginning(e.isBeginning);
              if (e.isEnd !== isEnd) setIsEnd(e.isEnd);
            }}
            onSwiper={(e) => {
              setSwiper(e);
            }}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => setIsEnd(false)}
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
            {slides}
          </Swiper>
        </SlideContainer>
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

export default React.memo(PlaySlide);
