import TabSlideRenderer from "./TabSlideRenderer";
import MyTabSlideRenderer from "../MypageSlides/MyTabSlideRandered";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchYoutubePlaylist } from "../../hook/useYoutubePlaylist";

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

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

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
