import styled from "styled-components";
import YouTube from "react-youtube";
import LikeButton from "./LikeButton";

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-right: 30px;
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
`;

const PlayTitle = styled.h1`
  font-size: 2.4rem;
  color: var(--light);
  font-weight: 600;
`;

const PlayInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

const TeamInfo = styled.div`
  width: 100%;
`;

const TeamName = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: var(--light);
  margin-bottom: 6px;
`;

const TeamSubscribe = styled.h3`
  font-size: 1.4rem;
  color: var(--grayC);
`;

const PlayLike = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gray3);
  padding: 12px 20px;
  border-radius: 50px;
  gap: 16px;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  color: ${({ $active }) => ($active ? "var(--main)" : "white")};
  font-size: 2rem;
  cursor: pointer;
  span {
    font-size: 1.6rem;
    text-align: center;
    width: 20px;
  }
  svg {
    transition: all 0.3s ease;
    color: ${({ $active }) => ($active ? "var(--main)" : "white")};
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
