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
  font-size: 1.8rem;
`;

const VideoTitle = styled.p`
  font-size: 1.4rem;
`;

const PlayContent = ({ thumbnail, channelTitle, title, showChannel }) => {
  return (
    <ContentCard>
      <Thumbnail src={thumbnail} alt="video thumbnail" />
      <Description>
        {showChannel && <ChannelName>{channelTitle}</ChannelName>}
        <VideoTitle>{title}</VideoTitle>
      </Description>
    </ContentCard>
  );
};

export default PlayContent;
