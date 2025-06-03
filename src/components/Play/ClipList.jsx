import React from "react";
import styled from "styled-components";
import ClipContent from "./ClipContent";

const ContentList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: stretch;
  gap: 1%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    :nth-child(6) {
      display: none;
    }
    :nth-child(7) {
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
    color: var(--light);
  }
  h4 {
    font-size: 2rem;
    color: var(--light);
  }
`;

const ClipList = ({ type, title }) => {
  const sampleData = [
    {
      influencerId: "@influencer1",
      videoTitle: "하이라이트 모음",
      thumbnailSrc: "/thumbnail.jpg",
    },
  ];

  return (
    <ContentList>
      <ContentTitle>
        <h2>{title}</h2>
        <h4>+ MORE</h4>
      </ContentTitle>
      <Contents>
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
        {sampleData.map((item, idx) => (
          <ClipContent key={idx} {...item} type={type} />
        ))}
      </Contents>
    </ContentList>
  );
};

export default ClipList;
