import MyVideoSlide from "../MypageSlides/MyVideoSlide";
import MyShortsSlide from "../MypageSlides/MyShortsSlide";

const MyAllVideo = () => {
  return (
    <>
      <MyVideoSlide />
      <MyShortsSlide
        playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
        title={"하이라이트 CLIP"}
        max={21}
      />
    </>
  );
};

export default MyAllVideo;
