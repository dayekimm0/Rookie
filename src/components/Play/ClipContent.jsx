import React from "react";
import styled from "styled-components";

const ContentCard = styled.div`
  max-width: 230px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--light);
  cursor: pointer;
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
  @media screen and (max-width: 1024px) {
    gap: 2px;
  }
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
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
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
