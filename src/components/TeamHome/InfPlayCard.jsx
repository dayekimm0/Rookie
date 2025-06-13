import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;

  h5 {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 1.3;
    color: var(--grayD);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media screen and (max-width: 1024px) {
      font-size: 1.5rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 1.4rem;
    }
  }
`;

const Card = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 /9;
  border-radius: 8px;
  background: var(--grayC);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfPlayCard = ({
  thumbnail,
  title,
  onClick,
  channelTitle,
  views,
  likes,
}) => {
  return (
    <Container>
      <Card onClick={onClick}>
        <img src={thumbnail} alt={title} loading="lazy" />
      </Card>
      <h5>{title}</h5>
    </Container>
  );
};

export default React.memo(InfPlayCard);
