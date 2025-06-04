import React from "react";
import styled from "styled-components";
import PlayContent from "./PlayContent";
import WeeklyBanner from "./WeeklyBanner";
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

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1%;

  ${({ type }) =>
    type === "team play"
      ? `
        grid-template-rows: repeat(2, auto);
        row-gap: 50px;
      `
      : `
        grid-auto-rows: auto;
      `}

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    :nth-child(4) {
      display: none;
    }
    :nth-child(5) {
      display: none;
    }
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

const PlayList = ({ type, title }) => {
  const baseData = [
    {
      date: "2025년 03월 25일",
      verses: "NC VS SSG",
      teamLogo: "/logo.png",
      teamName: "NC",
      influencerName: "인플루언서1",
      influencerId: "@influencer1",
      videoTitle: "하이라이트 모음",
      thumbnailSrc: "/thumbnail.jpg",
    },
    {
      date: "2025년 03월 26일",
      verses: "LG VS 두산",
      teamLogo: "/logo2.png",
      teamName: "LG",
      influencerName: "인플루언서2",
      influencerId: "@influencer2",
      videoTitle: "경기 리뷰",
      thumbnailSrc: "/thumbnail2.jpg",
    },
  ];

  // 팀플레이면 10개, 아니면 5개 데이터 만들기
  const dataLength = type === "team play" ? 10 : 5;

  const sampleData = Array.from(
    { length: dataLength },
    (_, i) => baseData[i % baseData.length]
  );

  return (
    <ContentList>
      <ContentTitle>
        <h2>{title}</h2>
        <div className="more">
          <span>더보기</span>
          <img src={PlusIcon} alt="icon" />
        </div>
      </ContentTitle>

      {type === "weekly play" && <WeeklyBanner />}

      <Contents type={type}>
        {sampleData.map((item, idx) => (
          <PlayContent key={idx} {...item} type={type} />
        ))}
      </Contents>
    </ContentList>
  );
};

export default PlayList;
