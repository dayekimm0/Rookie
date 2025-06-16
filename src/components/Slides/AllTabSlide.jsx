import TabSlideRenderer from "./TabSlideRenderer";
import MyTabSlideRenderer from "../MypageSlides/MyTabSlideRandered";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchYoutubePlaylist } from "../../hook/useYoutubePlaylist";
import styled from "styled-components";
import Spinner from "../Spinner";

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

  const isLoading = allQueries.some((q) => q.isLoading);
  const isError = allQueries.some((q) => q.isError);

  const items = useMemo(() => {
    return allQueries
      .flatMap((q) => q.data || [])
      .sort(
        (a, b) =>
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
      )
      .slice(0, 15);
  }, [allQueries]);

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

  return (
    <>
      {location.pathname === "/mypage/myvideo" ? (
        <MyTabSlideRenderer items={items} />
      ) : (
        <TabSlideRenderer items={items} />
      )}
    </>
  );
};

export default AllTabSlide;
