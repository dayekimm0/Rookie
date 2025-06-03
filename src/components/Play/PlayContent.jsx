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

const Date = styled.p`
  font-size: 2.2rem;
`;

const Verses = styled.p`
  font-size: 1.8rem;
`;

const TeamLogo = styled.img``;

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
  date,
  verses,
  teamLogo,
  teamName,
  influencerName,
  videoTitle,
  thumbnailSrc,
}) => {
  return (
    <ContentCard>
      <Thumbnail src={thumbnailSrc} alt="video thumbnail" />
      <Description>
        {type === "weekly play" && (
          <>
            <Date>{date}</Date>
            <Verses>{verses}</Verses>
          </>
        )}

        {type === "interview" && (
          <>
            <Date>{date}</Date>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}

        {type === "hot clip" && (
          <>
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
