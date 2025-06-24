import { useState, useEffect } from "react";

import MyVideoSlide from "../MypageSlides/MyVideoSlide";
import MyShortsSlide from "../MypageSlides/MyShortsSlide";
import { useVideoStore } from "../../stores/videoStore";
import NoItem from "./NoItem";

const MyAllVideo = () => {
  const { isNoVideo, fetchVideoIds } = useVideoStore();

  // 좋아요 목록 fetch
  useEffect(() => {
    fetchVideoIds();
  }, [fetchVideoIds]);

  if (isNoVideo) {
    return <NoItem />;
  }

  return (
    <>
      <MyVideoSlide />
      <MyShortsSlide
        playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
        title={"하이라이트 CLIP"}
        max={21}
      />
    </>
  );
};

export default MyAllVideo;
