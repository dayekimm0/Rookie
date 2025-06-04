import React from "react";
import styled from "styled-components";

const Container = styled.div`
  p {
    font-size: 1.6rem;
    margin-top: 9px;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--grayD);
    @media screen and (max-width: 1024px) {
      font-size: 1.4rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
`;

const CardWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 8px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ShortsCard = ({
  thumbnail,
  title,
  onClick,
  channelTitle,
  views,
  likes,
}) => {
  console.log(channelTitle, views, likes);
  return (
    <Container>
      <CardWrapper onClick={onClick}>
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/fallback.jpg"; // 필요 시 fallback 이미지 설정
          }}
        />
      </CardWrapper>
      <p>{title}</p>
    </Container>
  );
};

export default React.memo(ShortsCard);
