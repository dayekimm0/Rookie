import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ClipDetail from "../ClipDetail";
import { fetchClipProducts } from "../../utils/fetchClipProducts";
import useHeaderStore from "../../stores/headerHeightStore";
import useDragScroll from "../../hook/useDragScroll";

const ClipListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* border: 1px solid #0ff; */
  @media screen and (max-width: 768px) {
    padding: 0 3%;
    flex-direction: row;
    overflow-x: auto;
    gap: 12px;
    /* scrollbar-width: none;
    -ms-overflow-style: none; */
    -webkit-overflow-scrolling: touch;
    &.dragging {
      cursor: grabbing;
      user-select: none;
    }

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #bbb;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #888;
    }
    scrollbar-color: #bbb transparent;
    scrollbar-width: auto;
  }

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const ClipWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1440px) {
    width: 100%;
    /* height: 710px; */
  }

  @media screen and (max-width: 1024px) {
    /* width: 314px;
    height: 558px; */
  }

  @media screen and (max-width: 768px) {
    width: 200px;
    height: auto;
    aspect-ratio: 9 / 16;
  }
  @media screen and (max-width: 500px) {
    width: 180px;
  }
`;

const RecoClip = ({ videoList = [] }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videosWithProducts, setVideosWithProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const setScrollLocked = useHeaderStore((state) => state.setScrollLocked);

  // 썸네일별 제품 불러오기
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

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스크롤 잠금
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

  const scrollRef = useRef();
  useDragScroll(scrollRef);

  return (
    <>
      {videosWithProducts.length > 0 && (
        <ClipListWrapper ref={scrollRef}>
          {(isMobile ? videosWithProducts : [videosWithProducts[0]]).map(
            (video) => (
              <ClipWrapper
                key={video.id}
                onClick={() => setSelectedVideoId(video.id)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title || "clip_thumbnail"}
                />
              </ClipWrapper>
            )
          )}
        </ClipListWrapper>
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
