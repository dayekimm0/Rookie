import React from "react";
import styled from "styled-components";
import VideoContent from "../components/Play/VideoContent";
import ClipContent from "../components/Play/ClipContent";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 5%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
  }
`;

const Play = () => {
  return (
    <Container>
      <VideoContent />
      <ClipContent />
    </Container>
  );
};

export default Play;
