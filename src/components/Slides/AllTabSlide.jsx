import TabSlideRenderer from "./TabSlideRenderer";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchYoutubePlaylist } from "../../hook/useYoutubePlayList";
import styled from "styled-components";
import Spinner from "../Spinner";
import { getTeamNameShortEng } from "../../util";

const SlideLoaderWrapper = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 230px;
  }

  @media screen and (max-width: 768px) {
    height: 200px;
  }

  @media screen and (max-width: 500px) {
    height: 160px;
  }
`;

const AllTabSlide = ({ allTab }) => {
  const allQueries = useQueries({
    queries: allTab.playlists.map(({ id, max }) => ({
      queryKey: ["youtubePlaylist", id, max],
      queryFn: fetchYoutubePlaylist,
      enabled: !!id,
    })),
  });
  const location = useLocation();

  const isTeamPage = location.pathname.toLowerCase().includes("/teamhome");
  const teamCode = location.pathname.split("/")[2];
  const teamKeyword = getTeamNameShortEng(teamCode);

  const isLoading = allQueries.some((q) => q.isLoading);
  const isError = allQueries.some((q) => q.isError);

  const items = useMemo(() => {
    return allTab.playlists
      .map((playlist, index) => {
        const q = allQueries[index];
        if (!q || !q.data) return [];

        const originalItems = q.data.filter(
          (item) =>
            item.snippet.title?.toLowerCase() !== "private video" &&
            item.snippet.thumbnails?.default
        );

        if (
          isTeamPage &&
          teamKeyword !== "Unknown" &&
          playlist.type === "highlight"
        ) {
          return originalItems.filter((item) =>
            item.snippet.title
              ?.toLowerCase()
              .includes(teamKeyword.toLowerCase())
          );
        }

        return originalItems;
      })
      .flat()
      .sort(
        (a, b) =>
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
      )
      .slice(0, 15);
  }, [allQueries, allTab.playlists, location.pathname]);

  if (isLoading)
    return (
      <SlideLoaderWrapper>
        <Spinner />
      </SlideLoaderWrapper>
    );
  if (isError)
    return (
      <SlideLoaderWrapper>
        <div>문제가 발생하였습니다.</div>
      </SlideLoaderWrapper>
    );

  return <TabSlideRenderer items={items} />;
};

export default AllTabSlide;
