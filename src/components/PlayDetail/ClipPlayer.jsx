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
`;

const opts = {
  width: "480px",
  height: "780px",
  playerVars: { autoplay: 0, controls: 1 },
};

const ClipPlayer = memo(({ videoId, isActive, onReady }) => {
  return (
    <ModalPlay>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </ModalPlay>
  );
});

export default ClipPlayer;
