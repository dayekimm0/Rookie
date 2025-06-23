import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Spinner from "../Spinner";
import lenis from "../../lenisInstance";
import PlayContent from "../Play/PlayContent";
import { fetchAllTeamVideos } from "../../utils/youtube";
import { getTeamNameShortEng } from "../../util";

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 25px;
  flex-wrap: wrap;

  button {
    padding: 8px 18px;
    font-size: 1.4rem;
    border: none;
    border-radius: 999px;
    background: var(--gray2);
    color: var(--grayE);
    cursor: pointer;

    &.active {
      background: #f5f5f5;
      color: #111;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 1024px) {
    gap: 10px;
    padding-bottom: 20px;
    button {
      padding: 7px 16px;
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 500px) {
    gap: 8px;
    padding-bottom: 15px;
    button {
      padding: 6px 14px;
      font-size: 1.2rem;
    }
  }
`;

const PlayListWrap = styled.div`
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
const NoResult = styled.p`
  font-size: 1.6rem;
  text-align: center;
  margin: 60px 0;
  color: var(--gray6);
`;

const SpinnerWrap = styled.div`
  padding: 200px 0;
  display: flex;
  justify-content: center;
`;

const MoreTeamPlayAllList = ({ allTab, tabs, teamCode }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("all");
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 30;

  const isTeamMode = !!teamCode;
  const teamKeyword = getTeamNameShortEng(teamCode);

  const selectedPlaylists = useMemo(() => {
    if (currentTab === "all") return allTab.playlists || [];
    const tab = tabs.find((t) => t.name === currentTab);
    return tab?.playlistId
      ? [{ playlistId: tab.playlistId, max: tab.max }]
      : [];
  }, [currentTab, tabs, allTab]);

  const fetchAllVideos = async () => {
    try {
      setLoading(true);

      const playlists = selectedPlaylists.map((pl) => ({
        playlistId: pl.playlistId || pl.id,
        max: pl.max,
        type: pl.type,
      }));

      const details = await fetchAllTeamVideos(playlists);

      const filtered = (() => {
        const isHighlightTab =
          currentTab === "하이라이트" ||
          tabs.find((tab) => tab.name === currentTab)?.type === "highlight";

        // 1. 팀페이지에서 '하이라이트' 탭 → 전체 필터링
        if (isTeamMode && teamKeyword !== "Unknown" && isHighlightTab) {
          return details.filter((video) =>
            video.title.toLowerCase().includes(teamKeyword.toLowerCase())
          );
        }

        if (isTeamMode && currentTab === "all") {
          return details.filter((video) => {
            const isHighlight =
              video.playlistType?.toLowerCase() === "highlight";
            if (isHighlight) {
              return video.title
                .toLowerCase()
                .includes(teamKeyword.toLowerCase());
            }

            return true;
          });
        }

        return details;
      })();

      const sorted = filtered.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.snippet?.publishedAt);
        const dateB = new Date(b.publishedAt || b.snippet?.publishedAt);
        return dateB - dateA; // 최신순
      });

      setVideos(sorted);
    } catch (err) {
      console.error("❌ fetchAllVideos 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllVideos();
    setCurrentPage(0);
  }, [currentTab]);

  const offset = currentPage * itemsPerPage;
  const currentItems = videos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(videos.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    lenis.scrollTo(0);
  };

  const handleClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

  return (
    <>
      <Tabs>
        <button
          className={currentTab === "all" ? "active" : ""}
          onClick={() => setCurrentTab("all")}
        >
          전체
        </button>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={currentTab === tab.name ? "active" : ""}
            onClick={() => setCurrentTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </Tabs>

      {loading ? (
        <SpinnerWrap>
          <Spinner />
        </SpinnerWrap>
      ) : currentItems.length === 0 ? (
        <NoResult>영상이 없습니다.</NoResult>
      ) : (
        <>
          <PlayListWrap>
            {currentItems.map((video, idx) => (
              <PlayContent
                key={`${video.id}_${idx}`}
                {...video}
                type="influencer"
                onClick={() => handleClick(video.id)}
              />
            ))}
          </PlayListWrap>

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
        </>
      )}
    </>
  );
};

export default MoreTeamPlayAllList;
