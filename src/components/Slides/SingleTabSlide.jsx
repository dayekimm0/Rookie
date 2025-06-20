import { useLocation } from "react-router-dom";
import TabSlideRenderer from "./TabSlideRenderer";
import MyTabSlideRenderer from "../MypageSlides/MyTabSlideRandered";
import { useYoutubePlaylist } from "../../hook/useYoutubePlayList";
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
        <MyTabSlideRenderer items={data} onSwiperReady={onSwiperReady} />
      ) : (
        <TabSlideRenderer items={data} onSwiperReady={onSwiperReady} />
      )}
    </>
  );
};

export default SingleTabSlide;
