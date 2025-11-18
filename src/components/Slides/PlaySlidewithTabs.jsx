import React, { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import SlideTabNav from "./slideTabNav";
import TabSlideContent from "./TabSlideContent";
import Spinner from "../Spinner";
import SlideErrorFallback from "../Error/SlideErrorFallback2";

const Title = styled.div`
  padding-top: 120px;
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
    padding-top: 90px;
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
    padding-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    padding-top: 60px;
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

const SlideLoaderWrapper = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 230px;
  }
  @media screen and (max-width: 768px) {
    height: 200px;
  }
  @media screen and (max-width: 500px) {
    height: 160px;
  }
`;

const PlaySlidewithTabs = ({ allTab, tabs, title = "TODAY KBO", teamCode }) => {
  const navigate = useNavigate();
  const [isAll, setIsAll] = useState(true);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const swiperRef = useRef(null);

  const handleTabSelect = (mode, tab) => {
    setIsAll(mode === "all");
    setSelectedTab(tab);
    setTimeout(() => {
      swiperRef.current?.slideTo?.(0, 0);
    }, 0);
  };

  const handleMoreClick = () => {
    navigate("/teamplayall", {
      state: { allTab, tabs, title, type: "teamplay", teamCode },
    });
  };

  useEffect(() => {
    setIsAll(true);
    setSelectedTab(tabs[0]);
    setTimeout(() => {
      swiperRef.current?.slideTo?.(0, 0);
    }, 0);
  }, [teamCode]);

  return (
    <>
      <Title className="inner">
        <h3>{title}</h3>
        <div className="more" onClick={handleMoreClick}>
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </Title>

      <SlideTabNav
        allTabName={allTab.name}
        tabs={tabs}
        isAllTab={isAll}
        selectedTab={selectedTab}
        onSelectTab={handleTabSelect}
      />
      {/* 서스펜스 쿼리 슬라이드 교체 */}
      <ErrorBoundary
        FallbackComponent={SlideErrorFallback}
        resetKeys={[isAll, selectedTab]}
      >
        <Suspense
          fallback={
            <SlideLoaderWrapper>
              <Spinner />
            </SlideLoaderWrapper>
          }
        >
          <TabSlideContent
            isAll={isAll}
            allTab={allTab}
            selectedTab={selectedTab}
            onSwiperReady={(s) => (swiperRef.current = s)}
          />
        </Suspense>
      </ErrorBoundary>
      {/* 레거시 코드 */}
      {/* {isAll ? (
        <AllTabSlide
          allTab={allTab}
          onSwiperReady={(s) => (swiperRef.current = s)}
        />
      ) : (
        <SingleTabSlide
          selectedTab={selectedTab}
          onSwiperReady={(s) => (swiperRef.current = s)}
        />
      )} */}
    </>
  );
};

export default React.memo(PlaySlidewithTabs);
