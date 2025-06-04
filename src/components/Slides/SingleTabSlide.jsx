import TabSlideRenderer from "./TabSlideRenderer";
import MyTabSlideRenderer from "../MypageSlides/MyTabSlideRandered";
import { useYoutubePlaylist } from "../../hook/useYoutubePlaylist";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>문제가 발생했어요.</div>;

  return (
    <>
      {location.pathname === "/mypage/myvideo" ? (
        <MyTabSlideRenderer items={data} onSwiperReady={onSwiperReady} />
      ) : (
        <TabSlideRenderer items={data} onSwiperReady={onSwiperReady} />
      )}
    </>
  );
};

export default SingleTabSlide;
