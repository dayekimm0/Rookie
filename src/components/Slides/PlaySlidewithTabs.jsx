import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";
import PlusIcon from "../../images/icons/plusIcon.svg";
import SlideTabNav from "./slideTabNav";
import AllTabSlide from "./AllTabSlide";
import SingleTabSlide from "./SingleTabSlide";

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

const PlaySlidewithTabs = ({ allTab, tabs, title = "추천영상" }) => {
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

  return (
    <>
      <Title className="inner">
        <h3>{title}</h3>
        <div className="more">
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
      {isAll ? (
        <AllTabSlide
          allTab={allTab}
          onSwiperReady={(s) => (swiperRef.current = s)}
        />
      ) : (
        <SingleTabSlide
          selectedTab={selectedTab}
          onSwiperReady={(s) => (swiperRef.current = s)}
        />
      )}
    </>
  );
};

export default React.memo(PlaySlidewithTabs);
