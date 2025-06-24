// VideoPlayer.jsx
import React, { memo, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";

const ModalPlay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    height: 100%;
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
    height: 2580%;
    iframe {
      width: 100% !important;
      aspect-ratio: 9 / 16;
    }
  }
`;

const opts = {
  width: "480px",
  height: "780px",
  playerVars: { autoplay: 1, controls: 1 },
};

const ClipPlayer = memo(({ videoId, onReady }) => {
  return (
    <ModalPlay>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </ModalPlay>
  );
});

export default ClipPlayer;
