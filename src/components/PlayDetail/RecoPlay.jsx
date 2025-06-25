import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 8px;
  /* border: 1px solid #f0f; */
  /* @media screen and (max-width: 1024px) {
    width: 320px;
    height: 106px;
  } */

  @media screen and (max-width: 768px) {
    /* width: 720px; */
    height: auto;
    display: flex;
    justify-content: start;
    align-items: start;
    padding: 0 3%;
  }
  @media screen and (max-width: 500px) {
    /* width: 456px; */
    display: flex;
    flex-direction: column;
    padding: 0 15px;
  }
`;

const RecoPlayThumbnail = styled.div`
  /* width: 264px; */
  width: 53%;
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
    width: 48%;
  }

  @media screen and (max-width: 768px) {
    width: calc(120px + 20%);
    aspect-ratio: 16 / 9;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const RecoPlayInfo = styled.div`
  width: 45%;
  /* border: 1px solid #0ff; */
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
  @media screen and (max-width: 1024px) {
    width: 49%;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 60%;
    margin-left: 10px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const RecoPlayTitle = styled.h2`
  font-size: 1.8rem;
  line-height: 1.2;
  color: var(--light);
  display: -webkit-box;
  -webkit-line-clamp: 2; // 최대 2줄까지만 보여줌
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  @media screen and (max-width: 1440px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.2;
  }
  @media screen and (max-width: 500px) {
  }
`;

const RecoPlayTeam = styled.div`
  color: var(--gray8);

  @media screen and (max-width: 1600px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 1280px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 500px) {
  }
`;

const PlayDesc = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    color: var(--gray8);
  }
  @media screen and (max-width: 1600px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 1280px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.1rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 500px) {
  }
`;

const ViewCount = styled.h3`
  color: var(--gray8);
`;

const TimeAgo = styled.h3`
  color: var(--gray8);
`;

// 시간 계산 함수
const getTimeAgo = (publishedAt) => {
  const now = new Date();
  const published = new Date(publishedAt);
  const diff = (now - published) / 1000;

  if (diff < 60) return `${Math.floor(diff)}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  return `${Math.floor(diff / 604800)}주 전`;
};

// 조회수
const formatViewCount = (count) => {
  if (count >= 100000000) return `${Math.floor(count / 100000000)}억회`;
  if (count >= 10000) return `${Math.floor(count / 10000)}만회`;
  if (count >= 1000) return `${Math.floor(count / 1000)}천회`;
  return `${count}회`;
};

const RecoPlay = ({
  videoId,
  title,
  thumbnail,
  channelTitle,
  viewCount,
  publishedAt,
}) => {
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
          <ViewCount>조회수 {formatViewCount(viewCount)}</ViewCount>
          <p>・</p>
          <TimeAgo>{getTimeAgo(publishedAt)}</TimeAgo>
        </PlayDesc>
      </RecoPlayInfo>
    </Container>
  );
};

export default RecoPlay;
