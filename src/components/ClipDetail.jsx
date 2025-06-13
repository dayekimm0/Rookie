import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import YouTube from "react-youtube";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  max-width: 500px;
  aspect-ratio: 9 / 16;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ModalPlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: -20%;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
`;

const ClipDetail = ({ videoId, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!videoId) return null;

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalPlay>
          <YouTube
            videoId={videoId}
            opts={opts}
            style={{ width: "100%", height: "100%" }}
          />
        </ModalPlay>
      </ModalContent>
    </ModalWrapper>,
    document.body // 모달을 body 최상단에 렌더링
  );
};

export default ClipDetail;
