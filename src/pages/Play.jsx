import styled from "styled-components";
import PlayList from "../components/Play/PlayList";
import ClipList from "../components/Play/ClipList";
import HighlightList from "../components/Play/HighlightList";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 5%;
  gap: 100px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
    gap: 50px;
  }
`;

const Play = () => {
  return (
    <Container>
      <PlayList type="weeklyplay" title="WEEKLY PLAY" />
      <HighlightList type="highlight" title="HIGHLIGHT" />
      <PlayList type="interview" title="INTERVIEW" />
      <PlayList type="hotclip" title="HOT CLIP" />
      <PlayList type="teamplay" title="TEAM PLAY" />
      <PlayList type="rookieplay" title="ROOKIE PLAY" />
      <ClipList type="rookieclip" title="ROOKIE CLIP" />
    </Container>
  );
};

export default Play;
