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
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    width: 314px;
    height: 558px;
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
  }
`;

const RecoClip = ({ videoList = [], allProducts = [] }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  if (videoList.length === 0) return null;

  const handleClick = () => {
    setSelectedVideoId(videoList[0].id);
  };

  const handleClose = () => {
    setSelectedVideoId(null);
  };

  return (
    <>
      <ClipWrapper
        onClick={handleClick}
        style={{ width: 480, height: 860, cursor: "pointer" }}
      >
        <img
          src={videoList[0].thumbnail}
          alt={videoList[0].title || "clip_thumbnail"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </ClipWrapper>

      {selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          videoList={videoList}
          allProducts={allProducts}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default RecoClip;
