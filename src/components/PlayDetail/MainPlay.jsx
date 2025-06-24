import styled from "styled-components";
import YouTube from "react-youtube";
import LikeButton from "./LikeButton";

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-right: 30px;
  @media screen and (max-width: 1440px) {
    width: 900px;
  }
  @media screen and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 500px) {
    max-width: 100%;
  }
`;

const PlayThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  div {
    width: 100% !important;
    height: 100% !important;
  }
  iframe {
    width: 100% !important;
    height: 100% !important;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    border-radius: 0;
    padding: 0;
    margin: 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  @media screen and (max-width: 500px) {
    max-width: 100%;
  }
`;

const PlayTitle = styled.h1`
  font-size: 2.4rem;
  color: var(--light);
  font-weight: 600;
  @media screen and (max-width: 1440px) {
    font-size: 2.2rem;
    line-height: 1.2;
  }
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0 3%;
  }
  @media screen and (max-width: 500px) {
  }
`;

const PlayInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 0 3%;
  }
`;

const PlayInfo = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

const TeamLogo = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 500px) {
  }
`;

const TeamInfo = styled.div`
  width: 100%;
`;

const TeamName = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: var(--light);
  margin-bottom: 6px;
  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 500px) {
  }
`;

const TeamSubscribe = styled.h3`
  font-size: 1.4rem;
  color: var(--grayC);
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 500px) {
  }
`;

const MainPlay = ({
  videoId,
  title,
  channelTitle,
  subscriberCount,
  teamLogo,
}) => {
  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      cc_load_policy: 0,
    },
  };

  return (
    <Container>
      <PlayThumbnail>
        <YouTube videoId={videoId} opts={opts} />
      </PlayThumbnail>
      <PlayTitle>{title}</PlayTitle>
      <PlayInfoWrapper>
        <PlayInfo>
          <TeamLogo>
            <img src={teamLogo} alt="채널 썸네일" />
          </TeamLogo>
          <TeamInfo>
            <TeamName>{channelTitle}</TeamName>
            <TeamSubscribe>마이팬 {subscriberCount}</TeamSubscribe>
          </TeamInfo>
        </PlayInfo>
        <LikeButton videoId={videoId} />
      </PlayInfoWrapper>
    </Container>
  );
};

export default MainPlay;
