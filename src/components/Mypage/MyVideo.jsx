import MyPlaySlidewithTabs from "../MypageSlides/MyPlaySlidewithTabs";
import { homeSlideTab } from "../../data/playTabs";
import styled from "styled-components";
import ShortsSlide from "../Slides/ShortsSlide";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 1024px) {
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    h3 {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
  }
`;

const MyVideo = () => {
  return (
    <>
      <Title>
        <h3>추천영상</h3>
      </Title>
      <MyPlaySlidewithTabs
        allTab={homeSlideTab.allTab}
        mypageTabs={homeSlideTab.mypageTabs}
      />
      <ShortsSlide
        playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
        title={"하이라이트 CLIP"}
        max={21}
      />
    </>
  );
};

export default MyVideo;
