import { useState, useEffect } from "react";
import styled from "styled-components";
import ClipContent from "../Play/ClipContent";
import useHeaderStore from "../../stores/headerHeightStore";
import ClipDetail from "../ClipDetail";
import ReactPaginate from "react-paginate";

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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  gap: 8px;
  list-style: none;

  li {
    padding: 0 12px;
    cursor: pointer;
    font-size: 1.4rem;
    color: var(--gray8);

    &.active {
      font-weight: bold;
      color: var(--grayF5);
    }
    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
`;

const MoreClipAllList = ({
  externalVideos = [],
  modalEnabled = true,
  type,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 21;

  const offset = currentPage * itemsPerPage;
  const currentItems = externalVideos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(externalVideos.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    lenis.scrollTo(0);
  };

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

  if (externalVideos.length === 0) return null;

  return (
    <>
      <ClipListWrap>
        {currentItems.map((video, idx) => (
          <ClipContent
            key={video.id || idx}
            {...video}
            onOpenModal={modalEnabled ? setSelectedVideoId : undefined}
          />
        ))}
      </ClipListWrap>
      <PaginationWrapper>
        <StyledPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          activeClassName="active"
          disabledClassName="disabled"
          forcePage={currentPage}
        />
      </PaginationWrapper>

      {modalEnabled && selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          onClose={() => setSelectedVideoId(null)}
        />
      )}
    </>
  );
};

export default MoreClipAllList;
