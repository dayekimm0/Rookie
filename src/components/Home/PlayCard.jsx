import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h5 {
    font-size: 1.6rem;
    font-weight: 300;
    line-height: 1.4;
    color: var(--grayD);
  }
`;

const Card = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 /9;
  border-radius: 8px;
  background: var(--grayC);
`;

const PlayCard = () => {
  return (
    <Container>
      <Card>PlayCard</Card>
      <h5>[KIA] 경기 영상 제목 2줄 정도 경기 영상 제목 적당히 2줄 정도 </h5>
    </Container>
  );
};

export default PlayCard;
