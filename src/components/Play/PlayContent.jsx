import React from "react";
import styled from "styled-components";

const ContentCard = styled.div`
  max-width: 330px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--light);
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ChannelName = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const VideoTitle = styled.p`
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  /* word-break: keep-all; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const PlayContent = ({ type, thumbnail, channelTitle, title, onClick }) => {
  const showChannel = type === "teamplay" || type === "rookieplay";
  return (
    <ContentCard onClick={onClick} style={{ cursor: "pointer" }}>
      <Thumbnail src={thumbnail} alt="video thumbnail" />
      <Description>
        {/* <ChannelName>{channelTitle}</ChannelName> */}
        {showChannel && <ChannelName>{channelTitle}</ChannelName>}
        <VideoTitle>{title}</VideoTitle>
      </Description>
    </ContentCard>
  );
};

export default PlayContent;
