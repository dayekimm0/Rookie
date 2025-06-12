import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PlayContent from "../components/Play/PlayContent";
import { playContents } from "../data/playcontents";
import { fetchPlaylistVideos } from "../hook/useYoutubeContentList";
import { fetchTeamPlaylists } from "../hook/useTeamPlayList";
import ContentTag from "../components/Play/ContentTag";

const Container = styled.div`
  width: 100%;
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
    gap: 48px 18px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 48px 14px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 10px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  gap: 8px;

  li {
    padding: 0 12px;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--gray8);
    transition: 0.3s ease;
    &.active {
      color: var(--grayF5);
      font-weight: 600;
    }
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

const PlayAll = () => {
  const location = useLocation();
  // const type = location.state?.type;
  // const title = location.state?.title;
  const { type = "", title = "" } = location.state || {};

  const [videos, setVideos] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;

  useEffect(() => {
    const load = async () => {
      if (!type || !playContents[type]) return;

      const config = playContents[type];
      let items = [];

      if (config.playlists) {
        items = await fetchTeamPlaylists(config.playlists);
      } else {
        items = await fetchPlaylistVideos(config.playlistId, config.max, type);
      }

      // 최신순 정렬
      const sorted = items.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );

      setVideos(sorted);
    };

    load();
  }, [type]);

  const filteredVideos = selectedTeam
    ? videos.filter((video) => video.teamName === selectedTeam)
    : videos;

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredVideos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredVideos.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // 페이지 이동 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <Container>
      <ContentTitle>{title}</ContentTitle>
      {(type === "teamplay" || type === "rookieplay") && (
        <ContentTag type={type} onSelect={setSelectedTeam} />
      )}
      <ContentList>
        {currentItems.map((item, idx) => (
          <PlayContent key={item.id || idx} {...item} type={type} />
        ))}
        {/* {filteredVideos.map((item, idx) => (
          <PlayContent key={item.id || idx} {...item} type={type} />
        ))} */}
      </ContentList>
      <PaginationWrapper>
        <StyledPaginate
          previousLabel={"< PREV"}
          nextLabel={"NEXT >"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousClassName={"prev"}
          nextClassName={"next"}
          disabledClassName={"disabled"}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default PlayAll;
