import { useLocation } from "react-router-dom";
import TabSlideRenderer from "./TabSlideRenderer";
import MyTabSlideRenderer from "../MypageSlides/MyTabSlideRandered";
import { useYoutubePlaylist } from "../../hook/useYoutubePlayList";
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
  const teamCode = location.pathname.split("/")[2];
  const teamKeyword = getTeamNameShortEng(teamCode);
  const isTeamPage = location.pathname.toLowerCase().includes("/teamhome/");

  const validItems = data.filter(
    (item) =>
      item.snippet.title?.toLowerCase() !== "private video" &&
      item.snippet.thumbnails?.default
  );

  const filteredItems =
    selectedTab.name === "하이라이트" && isTeamPage && teamKeyword !== "Unknown"
      ? validItems.filter((item) =>
          item.snippet.title.toLowerCase().includes(teamKeyword.toLowerCase())
        )
      : validItems;

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
        <MyTabSlideRenderer
          items={filteredItems}
          onSwiperReady={onSwiperReady}
        />
      ) : (
        <TabSlideRenderer items={filteredItems} onSwiperReady={onSwiperReady} />
      )}
    </>
  );
};

export default SingleTabSlide;
