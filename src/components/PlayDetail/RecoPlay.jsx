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
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecoPlayInfo = styled.div`
  width: 225px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

const RecoPlayTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--light);
  display: -webkit-box;
  -webkit-line-clamp: 2; // 최대 2줄까지만 보여줌
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
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

const RecoPlay = ({ videoId, title, thumbnail, channelTitle }) => {
  const handleClick = () => {
    window.location.href = `/play/${videoId}`;
  };
  return (
    <Container onClick={handleClick}>
      <RecoPlayThumbnail>
        <img src={thumbnail} alt={title} />
      </RecoPlayThumbnail>
      <RecoPlayInfo>
        <RecoPlayTitle>{title}</RecoPlayTitle>
        <RecoPlayTeam>{channelTitle}</RecoPlayTeam>
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
