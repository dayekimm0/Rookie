import styled from "styled-components";
import thumbnail1 from "/src/images/mockup/play_thumbnail1.png";
import teamLogo from "/src/images/emblem/emblem_doosanB.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as farThumbsUp,
  faThumbsDown as farThumbsDown,
} from "@fortawesome/free-regular-svg-icons"; // regular

const Container = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-right: 30px;
`;

const PlayThumbnail = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  gap: 6px;
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
  color: var(--gray6);
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
  gap: 6px;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  span {
    font-size: 1.6rem;
  }
`;

const MainPlay = ({
  thumbnail,
  title,
  channelTitle,
  subscriberCount,
  teamLogo,
}) => {
  const [selected, setSelected] = useState("");
  return (
    <Container>
      <PlayThumbnail>
        <img src={thumbnail} alt="thumbnail1" />
      </PlayThumbnail>
      <PlayTitle>{title}</PlayTitle>
      <PlayInfoWrapper>
        <PlayInfo>
          <TeamLogo>
            <img src={teamLogo} alt="teamLogo" />
          </TeamLogo>
          <TeamInfo>
            <TeamName>
              {channelTitle} <p></p>
            </TeamName>
            <TeamSubscribe>마이팬 26.1만명{subscriberCount}</TeamSubscribe>
          </TeamInfo>
        </PlayInfo>
        <PlayLike>
          <StyledLabel selected={selected === "like"}>
            <HiddenRadio
              value="like"
              checked={selected === "like"}
              onChange={() => setSelected("like")}
            />
            <FontAwesomeIcon icon={farThumbsUp} />
            <span>145</span>
          </StyledLabel>
          <StyledLabel selected={selected === "dislike"}>
            <HiddenRadio
              value="dislike"
              checked={selected === "dislike"}
              onChange={() => setSelected("dislike")}
            />
            <FontAwesomeIcon icon={farThumbsDown} />
          </StyledLabel>
        </PlayLike>
      </PlayInfoWrapper>
    </Container>
  );
};

export default MainPlay;
