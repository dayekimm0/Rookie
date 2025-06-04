import React from "react";
import styled from "styled-components";

const ContentCard = styled.div`
  max-width: 230px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--light);
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 9/16;
  border: 1px solid #ff0;
  border-radius: 8px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InfluencerId = styled.p`
  font-size: 1.8rem;
`;

const VideoTitle = styled.p`
  font-size: 1.4rem;
`;

const ClipContent = ({ type, thumbnailSrc, influencerId, videoTitle }) => {
  return (
    <ContentCard>
      <Thumbnail src={thumbnailSrc} alt="video thumbnail" />
      <Description>
        {type === "rookie clip" && (
          <>
            <InfluencerId>{influencerId}</InfluencerId>
            <VideoTitle>{videoTitle}</VideoTitle>
          </>
        )}
      </Description>
    </ContentCard>
  );
};

export default ClipContent;
