import TabSlideRenderer from "./TabSlideRenderer";
import { useYoutubePlaylist } from "../../hook/useYoutubePlaylist";

const SingleTabSlide = ({ selectedTab, onSwiperReady }) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useYoutubePlaylist(
    selectedTab.playlistId,
    selectedTab.max || 15,
    !!selectedTab?.playlistId
  );

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  return <TabSlideRenderer items={data} onSwiperReady={onSwiperReady} />;
};

export default SingleTabSlide;
