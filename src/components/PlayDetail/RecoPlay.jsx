import styled from "styled-components";
import thumbnail2 from "/src/images/mockup/play_thumbnail2.png";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  gap: 8px;
`;

const RecoPlayThumbnail = styled.div`
  width: 264px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const RecoPlayInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

const RecoPlayTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--light);
`;
const RecoPlayTeam = styled.div`
  color: var(--gray8);
`;

const PlayDesc = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    color: var(--gray8);
  }
`;

const ViewCount = styled.h3`
  color: var(--gray8);
`;

const TimeAgo = styled.h3`
  color: var(--gray8);
`;

const RecoPlay = () => {
  return (
    <Container>
      <RecoPlayThumbnail>
        <img src={thumbnail2} alt="thumbnail2" />
      </RecoPlayThumbnail>
      <RecoPlayInfo>
        <RecoPlayTitle>5월 25일 NC vs 두산 | 2025 정규시즌 H/L</RecoPlayTitle>
        <RecoPlayTeam>BEARS TV</RecoPlayTeam>
        <PlayDesc>
          <ViewCount>조회수 5.3만회</ViewCount>
          <p>・</p>
          <TimeAgo>3일전</TimeAgo>
        </PlayDesc>
      </RecoPlayInfo>
    </Container>
  );
};

export default RecoPlay;
