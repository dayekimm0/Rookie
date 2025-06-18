import { useState, useEffect } from "react";
import styled from "styled-components";
import ClipContent from "../Play/ClipContent";
import useHeaderStore from "../../stores/headerHeightStore";
import ClipDetail from "../ClipDetail";

const ClipListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 50px 20px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 42px 14px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 6px;
  }
`;

const InfClipAllList = ({ externalVideos, modalEnabled = true, type }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    if (!modalEnabled) return;

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
  }, [selectedVideoId, modalEnabled]);

  const { setScrollLocked } = useHeaderStore.getState();

  useEffect(() => {
    if (selectedVideoId) {
      setScrollLocked(true);
    } else {
      setScrollLocked(false);
    }
  }, [selectedVideoId]);

  return (
    <>
      <ClipListWrap>
        {externalVideos.map((video, idx) => (
          <ClipContent
            key={video.id || idx}
            {...video}
            onOpenModal={modalEnabled ? setSelectedVideoId : undefined}
          />
        ))}
      </ClipListWrap>
      {modalEnabled && selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          onClose={() => setSelectedVideoId(null)}
        />
      )}
    </>
  );
};

export default InfClipAllList;
