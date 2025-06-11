import styled from "styled-components";
import { useState } from "react";
import ClipDetail from "../ClipDetail";

const ClipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const RecoClip = ({ thumbnailUrl, videoId }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleClick = () => {
    setSelectedVideoId(videoId);
  };

  const handleClose = () => {
    setSelectedVideoId(null);
  };

  return (
    <>
      <ClipWrapper>
        <img src={thumbnailUrl} alt="clip_thumbnail" />
      </ClipWrapper>
      <ClipDetail videoId={selectedVideoId} onClose={handleClose} />
    </>
  );
};

export default RecoClip;
