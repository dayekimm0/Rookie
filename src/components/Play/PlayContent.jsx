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

const TeamInfo = styled.div`
  display: flex;
  gap: 5px;
`;

const TeamLogo = styled.img``;

const ChannelName = styled.p`
  font-size: 1.8rem;
`;

const TeamName = styled.p`
  font-size: 1.8rem;
`;

const InfluencerName = styled.p`
  font-size: 1.8rem;
`;

const VideoTitle = styled.p`
  font-size: 1.4rem;
`;

const PlayContent = ({
  type,
  thumbnailSrc,
  channelName,
  teamLogo,
  teamName,
  influencerName,
  videoTitle,
}) => {
  return (
    <ContentCard>
      <Thumbnail src={thumbnailSrc} alt="video thumbnail" />
      <Description>
        {type === "weekly play" && (
          <>
            <ChannelName>{channelName}</ChannelName>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}

        {type === "interview" && (
          <>
            <ChannelName>{channelName}</ChannelName>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}

        {type === "hot clip" && (
          <>
            <ChannelName>{channelName}</ChannelName>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}

        {type === "team play" && (
          <>
            <TeamInfo>
              <TeamLogo src={teamLogo} alt="team logo" />
              <TeamName>{teamName}</TeamName>
            </TeamInfo>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}

        {type === "rookie play" && (
          <>
            <InfluencerName>{influencerName}</InfluencerName>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}
      </Description>
    </ContentCard>
  );
};

export default PlayContent;
