import React from "react";
import styled from "styled-components";
import PlayList from "../components/Play/PlayList";
import ClipList from "../components/Play/ClipList";
import HighlightContent from "../components/Play/HighlightContent";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 5%;
  gap: 100px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
  }
`;

const Play = () => {
  return (
    <Container>
      <HighlightContent />
      <PlayList type="weekly play" title="WEEKLY PLAY" />
      <PlayList type="interview" title="INTERVIEW" />
      <PlayList type="hot clip" title="HOT CLIP" />
      <PlayList type="team play" title="TEAM PLAY" />
      <PlayList type="rookie play" title="ROOKie PLAY" />
      <ClipList type="rookie clip" title="ROOKie CLIP" />
    </Container>
  );
};

export default Play;
