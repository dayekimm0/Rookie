import React, { useState } from "react";
import styled from "styled-components";
import ClipDetail from "../ClipDetail";

const ClipWrapper = styled.div`
  width: 480px;
  height: 860px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecoClip = ({ videoList = [] }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  if (videoList.length === 0) return null;

  // 썸네일 한 개만 사용 (첫 번째 영상)
  const video = videoList[0];

  const handleClick = () => {
    setSelectedVideoId(video.id);
  };

  const handleClose = () => {
    setSelectedVideoId(null);
  };

  return (
    <>
      <ClipWrapper onClick={handleClick}>
        <img src={video.thumbnail} alt={video.title || "clip_thumbnail"} />
      </ClipWrapper>
      {selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          videoList={videoList}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default RecoClip;
