import React from "react";
import styled from "styled-components";

const ContentList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1%;
  border: 1px solid #0f0;

  @media screen and (max-width: 1024px) {
    :nth-child(4) {
      display: none;
    }
    :nth-child(5) {
      display: none;
    }
  }
`;

const ContentCard = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #f00;

  @media screen and (max-width: 1024px) {
    width: 260px;
  }
`;

const Video = styled.video`
  width: 100%;
  aspect-ratio: 16/9;
  border: 1px solid #ff0;
`;

const Description = styled.p`
  font-family: "Pretendard";
  font-size: 1.6rem;
  color: #fff;
`;

const VideoContent = () => {
  return (
    <ContentList>
      <ContentCard>
        <Video />
        <Description>안녕하세요.</Description>
      </ContentCard>
      <ContentCard>
        <Video />
        <Description>안녕하세요.</Description>
      </ContentCard>
      <ContentCard>
        <Video />
        <Description>안녕하세요.</Description>
      </ContentCard>
      <ContentCard>
        <Video />
        <Description>안녕하세요.</Description>
      </ContentCard>
      <ContentCard>
        <Video />
        <Description>안녕하세요.</Description>
      </ContentCard>
    </ContentList>
  );
};

export default VideoContent;
