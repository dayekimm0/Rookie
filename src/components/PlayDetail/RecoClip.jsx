import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClipDetail from "../ClipDetail";
import { fetchClipProducts } from "../../utils/fetchClipProducts";
import useHeaderStore from "../../stores/headerHeightStore";

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
    width: 100%;
    height: 710px;
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

const RecoClip = ({ videoList = [] }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videosWithProducts, setVideosWithProducts] = useState([]);
  const setScrollLocked = useHeaderStore((state) => state.setScrollLocked);

  useEffect(() => {
    const fetchAll = async () => {
      const result = await Promise.all(
        videoList.map(async (video) => {
          const products = await fetchClipProducts(video.title);
          return { ...video, products };
        })
      );
      setVideosWithProducts(result);
    };

    if (videoList.length > 0) {
      fetchAll();
    }
  }, [videoList]);

  // if (videosWithProducts.length === 0) return null;

  // const handleClick = () => {
  //   setSelectedVideoId(videosWithProducts[0].id);
  // };

  // const handleClose = () => {
  //   setSelectedVideoId(null);
  // };

  //클립 모달 스크롤 막기
  useEffect(() => {
    if (selectedVideoId) {
      const y = window.scrollY;
      lenis.stop();

      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = y;
    } else {
      const y = parseFloat(document.body.dataset.scrollY || "0");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.removeAttribute("data-scroll-y");

      window.scrollTo(0, y);
      lenis.start();
    }
  }, [selectedVideoId]);

  useEffect(() => {
    setScrollLocked(!!selectedVideoId);
  }, [selectedVideoId, setScrollLocked]);

  return (
    <>
      {videosWithProducts.length > 0 && (
        <ClipWrapper
          onClick={() => setSelectedVideoId(videosWithProducts[0]?.id || null)}
        >
          <img
            src={videosWithProducts[0]?.thumbnail}
            alt={videosWithProducts[0]?.title || "clip_thumbnail"}
          />
        </ClipWrapper>
      )}

      {selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          videoList={videosWithProducts}
          onClose={() => setSelectedVideoId(null)}
        />
      )}
    </>
  );
};

export default RecoClip;
