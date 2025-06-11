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
  overflow: hidden;
  text-overflow: ellipsis;
  /* word-break: keep-all; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ClipContent = ({
  type,
  thumbnail,
  channelTitle,
  title,
  id,
  onOpenModal,
}) => {
  const handleCardClick = () => {
    onOpenModal(id); // 상위에서 모달 열기
  };

  return (
    <ContentCard onClick={handleCardClick}>
      <Thumbnail src={thumbnail} alt="video thumbnail" />
      <Description>
        <ChannelName>{channelTitle}</ChannelName>
        <VideoTitle>{title}</VideoTitle>
      </Description>
    </ContentCard>
  );
};

export default ClipContent;
