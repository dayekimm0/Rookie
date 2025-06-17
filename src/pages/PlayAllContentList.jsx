import React, { useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import PlayContent from "../components/Play/PlayContent";

const ContentList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px 20px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
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

const NoResult = styled.p`
  font-size: 1.6rem;
  text-align: center;
  margin: 60px 0;
  color: var(--gray6);
`;

const PlayAllContentList = ({ videos, type = "search" }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;

  const offset = currentPage * itemsPerPage;
  const currentItems = videos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(videos.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!videos || videos.length === 0) {
    return <NoResult>검색 결과가 없습니다.</NoResult>;
  }

  return (
    <>
      <ContentList>
        {currentItems.map((video, idx) => (
          <PlayContent key={video.id || idx} {...video} type={type} />
        ))}
      </ContentList>
      <PaginationWrapper>
        <StyledPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          activeClassName="active"
          disabledClassName="disabled"
        />
      </PaginationWrapper>
    </>
  );
};

export default PlayAllContentList;
