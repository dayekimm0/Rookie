import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import PlayContent from "../components/Play/PlayContent";
import { fetchAllVideos } from "../hook/useSearchVideos";
import { useSearchStore } from "../stores/headersStore";

const Container = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 0 5%;
  margin-top: 5%;
  gap: 40px;
  display: flex;
  flex-direction: column;
  color: var(--light);

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
  }
`;

const ContentTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

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

const SearchResultPage = () => {
  const { setSearchOpen } = useSearchStore();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword")?.trim() || "";

  const itemsPerPage = 30;
  const offset = currentPage * itemsPerPage;
  const currentItems = videos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(videos.length / itemsPerPage);
  const navigate = useNavigate();
  console.log(currentItems);

  const handleDetailClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setSearchOpen(false);
  }, [keyword, setSearchOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const allVideos = await fetchAllVideos();
        if (keyword) {
          const lower = keyword.toLowerCase();
          const filtered = allVideos.filter((v) =>
            v.title.toLowerCase().includes(lower)
          );
          setVideos(filtered);
        } else {
          setVideos([]);
        }
      } catch (e) {
        console.error("비디오 로딩 실패", e);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);

  return (
    <Container>
      <ContentTitle>
        {keyword
          ? `"${keyword}" 검색 결과 (${videos.length}건)`
          : "검색어를 입력해주세요."}
      </ContentTitle>

      {loading ? (
        <NoResult>검색 중...</NoResult>
      ) : videos.length === 0 ? (
        <NoResult>검색 결과가 없습니다.</NoResult>
      ) : (
        <>
          <ContentList>
            {currentItems.map((video, idx) => (
              <PlayContent
                key={video.videoId || idx}
                {...video}
                type="search"
                onClick={() => handleDetailClick(video.videoId)}
              />
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
      )}
    </Container>
  );
};

export default SearchResultPage;
