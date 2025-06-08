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
  border: 1px solid #ff0;
  border-radius: 8px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ChannelName = styled.p`
  font-size: 1.8rem;
`;

const VideoTitle = styled.p`
  font-size: 1.4rem;
`;

const PlayContent = ({ thumbnailSrc, channelName, videoTitle }) => {
  return (
    <ContentCard>
      <Thumbnail src={thumbnailSrc} alt="video thumbnail" />
      <Description>
        <ChannelName>{channelName}</ChannelName>
        <VideoTitle>{videoTitle}</VideoTitle>
      </Description>
    </ContentCard>
  );
};

export default PlayContent;
