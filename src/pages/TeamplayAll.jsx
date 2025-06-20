import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MoreClipAllList from "../components/MorePlaypage/MoreClipAllList";
import MoreTeamPlayAllList from "../components/MorePlaypage/MoreTeamPlayAllList";
import {
  useYoutubePlaylist,
  useYoutubeVideoDetails,
} from "../hook/useYoutubePlayList";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding-top: 80px;
  @media screen and (max-width: 1024px) {
    padding-top: 50px;
  }
  @media screen and (max-width: 500px) {
    padding-top: 40px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: var(--light);
  display: flex;
  align-items: center;
  gap: 15px;
  svg {
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
    gap: 10px;
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
    gap: 8px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
`;

const SpinnerWrap = styled.div`
  padding: 300px 0;
  display: flex;
  justify-content: center;
`;

const TeamplayAll = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const goToBack = () => {
    navigate(-1);
  };

  if (!state) return <div>잘못된 접근입니다.</div>;

  const { type, playlistId, max, title, allTab, tabs } = state;

  if (type === "shorts") {
    // 1. playlist 불러오기
    const {
      data: shorts = [],
      isLoading,
      isError,
    } = useYoutubePlaylist(playlistId, max);

    // 2. 영상 ID들 뽑기
    const videoIds = useMemo(() => {
      return shorts
        .map((item) => item.snippet.resourceId?.videoId || item.id?.videoId)
        .filter(Boolean)
        .join(",");
    }, [shorts]);

    // 3. 상세 정보 fetch
    const { data: details = [] } = useYoutubeVideoDetails(videoIds, !!videoIds);

    if (isLoading)
      return (
        <SpinnerWrap>
          <Spinner />
        </SpinnerWrap>
      );
    if (isError) return <div>문제가 발생했습니다.</div>;

    const mappedShorts = details.map((video) => ({
      id: video.id,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      thumbnail:
        video.snippet.thumbnails?.maxres?.url ||
        video.snippet.thumbnails?.medium?.url,
    }));

    return (
      <Container className="inner">
        <SectionTitle>
          <FontAwesomeIcon icon={faArrowLeft} onClick={goToBack} />
          {title}
        </SectionTitle>
        <MoreClipAllList
          externalVideos={mappedShorts}
          modalEnabled={true}
          type="shorts"
        />
      </Container>
    );
  }

  if (type === "teamplay") {
    return (
      <Container className="inner">
        <SectionTitle>
          <FontAwesomeIcon icon={faArrowLeft} onClick={goToBack} />
          {title}
        </SectionTitle>
        <MoreTeamPlayAllList allTab={allTab} tabs={tabs} />
      </Container>
    );
  }
};

export default TeamplayAll;
