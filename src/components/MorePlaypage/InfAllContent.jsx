import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import PlayContent from "../Play/PlayContent";
import ClipList from "../Play/ClipList";
import Spinner from "../Spinner";
import lenis from "../../lenisInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import MoreClipAllList from "./MoreClipAllList";

const BackBtn = styled.div`
  padding-top: 60px;
  color: var(--light);
  font-size: 3rem;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  p {
    font-size: 3rem;
    font-weight: 600;
  }
  @media screen and (max-width: 1024px) {
    padding-top: 50px;
    font-size: 2.5rem;
    p {
      font-size: 2.5rem;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    gap: 10px;
    p {
      font-size: 2rem;
    }
  }
  @media screen and (max-width: 500px) {
    padding-top: 40px;
    font-size: 1.6rem;
    gap: 10px;
    p {
      font-size: 1.6rem;
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  padding: 40px 0 60px;

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
    padding: 35px 0 50px;
    button {
      padding: 7px 16px;
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 500px) {
    gap: 8px;
    padding: 30px 0 35px;
    button {
      padding: 6px 14px;
      font-size: 1.2rem;
    }
  }
`;

const ClipSlideWrap = styled.div`
  padding-bottom: 80px;
  @media screen and (max-width: 1024px) {
    padding-bottom: 60px;
  }
  @media screen and (max-width: 500px) {
    padding-bottom: 50px;
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

const SectionTitle = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: var(--light);
  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
`;

const SpinnerWrap = styled.div`
  padding: 200px 0;
  display: flex;
  justify-content: center;
`;

const InfAllContent = ({ clipVideos = [], playVideos = [] }) => {
  const [currentTab, setCurrentTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [clipReady, setClipReady] = useState(false);
  const [playReady, setPlayReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allPlayPage, setAllPlayPage] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = useMemo(() => {
    if (currentTab === "clip") return 28;
    return 30;
  }, [currentTab]);

  const filtered = useMemo(() => {
    if (currentTab === "clip") return clipVideos;
    if (currentTab === "play") return playVideos;
    return [];
  }, [currentTab, clipVideos, playVideos]);

  const pageCount = useMemo(() => {
    return Math.ceil(filtered.length / itemsPerPage);
  }, [filtered, itemsPerPage]);

  const currentItems = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filtered.slice(offset, offset + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const handleDetailClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    lenis.scrollTo(0);
  };

  if (
    (currentTab === "clip" && clipVideos.length === 0) ||
    (currentTab === "play" && playVideos.length === 0)
  ) {
    return <NoResult>등록된 영상이 없습니다.</NoResult>;
  }
  useEffect(() => {
    setCurrentPage(0);
    setAllPlayPage(0);
  }, [currentTab]);

  useEffect(() => {
    if (clipVideos.length > 0) setClipReady(true);
    if (playVideos.length > 0) setPlayReady(true);
  }, [clipVideos, playVideos]);

  const allPlayOffset = allPlayPage * itemsPerPage;
  const currentAllPlayItems = playVideos.slice(
    allPlayOffset,
    allPlayOffset + itemsPerPage
  );

  const handleAllPlayPageClick = ({ selected }) => {
    setAllPlayPage(selected);
    lenis.scrollTo(0);
  };

  useEffect(() => {
    // clip이나 play가 있으면 로딩 완료
    if (clipReady || playReady) {
      setLoading(false);
    }
  }, [clipReady, playReady]);

  if (loading) {
    return (
      <SpinnerWrap>
        <Spinner />
      </SpinnerWrap>
    );
  }

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BackBtn onClick={goToBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>뒤로 돌아가기</p>
      </BackBtn>
      <Tabs>
        <button
          className={currentTab === "all" ? "active" : null}
          onClick={() => setCurrentTab("all")}
        >
          ALL
        </button>
        <button
          className={currentTab === "clip" ? "active" : null}
          disabled={!clipReady}
          onClick={() => setCurrentTab("clip")}
        >
          CLIP
        </button>
        <button
          className={currentTab === "play" ? "active" : null}
          disabled={!playReady}
          onClick={() => setCurrentTab("play")}
        >
          PLAY
        </button>
      </Tabs>

      {currentTab === "all" && (
        <>
          {clipVideos.length > 0 && (
            <ClipSlideWrap>
              <ClipList type="clip" title="CLIP" externalVideos={clipVideos} />
            </ClipSlideWrap>
          )}

          {playVideos.length > 0 && (
            <>
              <SectionTitle>PLAY</SectionTitle>
              <PlayListWrap>
                {currentAllPlayItems.map((video, idx) => (
                  <PlayContent
                    key={video.id || idx}
                    {...video}
                    type="influencer"
                    onClick={() => handleDetailClick(video.id)}
                  />
                ))}
              </PlayListWrap>
              <PaginationWrapper>
                <StyledPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={Math.ceil(playVideos.length / itemsPerPage)}
                  onPageChange={handleAllPlayPageClick}
                  activeClassName="active"
                  disabledClassName="disabled"
                  forcePage={allPlayPage}
                />
              </PaginationWrapper>
            </>
          )}
        </>
      )}
      {(currentTab === "clip" || currentTab === "play") && (
        <>
          {currentTab === "clip" && (
            <MoreClipAllList
              externalVideos={currentItems}
              modalEnabled={true}
              type="clip"
            />
          )}

          {currentTab === "play" && (
            <PlayListWrap>
              {currentItems.map((video, idx) => (
                <PlayContent
                  key={video.id || idx}
                  {...video}
                  type="influencer"
                  onClick={() => handleDetailClick(video.id)}
                />
              ))}
            </PlayListWrap>
          )}

          {currentTab === "play" && (
            <PaginationWrapper>
              <StyledPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                activeClassName="active"
                disabledClassName="disabled"
                forcePage={currentPage}
              />
            </PaginationWrapper>
          )}
        </>
      )}
    </>
  );
};

export default InfAllContent;
