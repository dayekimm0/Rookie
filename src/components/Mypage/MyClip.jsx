import { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useYoutubeVideoDetails } from "../../hook/useYoutubePlayList";
import { parseISO8601Duration } from "../../utils/youtube";
import { fetchClipProducts } from "../../utils/fetchClipProducts";
import { useVideoStore } from "../../stores/videoStore";

import NoItem from "./NoItem";
import Shortscard from "../Slides/Shortscard";
import ClipDetail from "../ClipDetail";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  color: var(--gray2);
  gap: 10px;
  row-gap: 20px;
  p {
    color: var(--gray1);
    word-break: keep-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3;
    font-size: 1.6rem;
    font-weight: 300;
  }
  @media screen and (max-width: 1024px) {
    p {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (max-width: 500px) {
    p {
      font-size: 1.2rem;
    }
  }
`;

const MyClip = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videosWithProducts, setVideosWithProducts] = useState([]);
  const { videoIds, likesLoading, fetchVideoIds } = useVideoStore();

  // 좋아요 목록 fetch
  useEffect(() => {
    fetchVideoIds();
  }, [fetchVideoIds]);

  const idsParam = useMemo(() => {
    return videoIds.length ? videoIds.join(",") : null;
  }, [videoIds]);

  const { data: videos = [], isLoading: videosLoading } =
    useYoutubeVideoDetails(idsParam, !likesLoading && !!idsParam > 0);

  // 영상 디테일
  const handleOpenModal = (id) => {
    console.log("open modal for videoId:", id);
    setSelectedVideoId(id);
  };

  const handleCloseModal = () => {
    setSelectedVideoId(null);
    fetchVideoIds();
  };

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
    if (!videos.length) return;
    (async () => {
      const results = await Promise.all(
        videos.map(async (video) => ({
          ...video,
          products: await fetchClipProducts(video.snippet.title),
        }))
      );
      setVideosWithProducts(results);
    })();
  }, [videos]);

  const slides = useMemo(() => {
    return videos
      .filter(
        (video) => parseISO8601Duration(video.contentDetails.duration) <= 99
      )
      .map((video) => {
        const vid = video.id;
        const { title, thumbnails } = video.snippet;
        const thumbUrl = thumbnails.maxres?.url || thumbnails.medium?.url;

        return (
          <Shortscard
            key={vid}
            thumbnail={thumbUrl}
            title={title}
            onOpenModal={handleOpenModal}
            id={vid}
          />
        );
      });
  }, [videos]);

  if (slides.length === 0) {
    return <NoItem />;
  }

  return (
    <>
      <Container>{slides}</Container>
      {selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          videoList={videosWithProducts}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MyClip;
