import { useEffect, useState } from "react";
import authStore from "../stores/AuthStore";
import styled from "styled-components";
import PlayList from "../components/Play/PlayList";
import ClipList from "../components/Play/ClipList";
import HighlightList from "../components/Play/HighlightList";
import Spinner from "../components/Spinner";

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

const SlideLoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
  }
`;

const Play = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      {isLoading ? (
        <SlideLoaderWrapper>
          <Spinner />
        </SlideLoaderWrapper>
      ) : (
        <>
          <PlayList type="weeklyplay" title="WEEKLY PLAY" />
          <HighlightList type="highlight" title="HIGHLIGHT" />
          <PlayList type="interview" title="INTERVIEW" />
          <PlayList type="hotclip" title="HOT CLIP" />
          <PlayList type="teamplay" title="TEAM PLAY" />
          <PlayList type="rookieplay" title="ROOKIE PLAY" />
          <ClipList type="rookieclip" title="ROOKIE CLIP" />
        </>
      )}
    </Container>
  );
};

export default Play;
