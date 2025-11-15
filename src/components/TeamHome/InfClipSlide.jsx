import { memo, useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import BArrow from "../../images/icons/arrow_small_w.svg";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import {
  useYoutubePlaylist,
  useYoutubeVideoDetails,
} from "../../hook/useYoutubePlayList";
import Shortscard from "../Slides/Shortscard";
import ClipDetail from "../ClipDetail";
import useHeaderStore from "../../stores/headerHeightStore";
import { fetchClipProducts } from "../../utils/fetchClipProducts";

const Container = styled.div`
  position: relative;
  width: 100%;
  .btns {
    position: absolute;
    display: flex;
    gap: 16px;
    top: -40px;
    right: 0;
    @media screen and (max-width: 1024px) {
      top: -35px;
      img {
        width: 8px;
      }
    }
    @media screen and (max-width: 500px) {
      top: -28px;
      img {
        width: 7px;
      }
    }
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .swiper {
    overflow: visible !important;
  }
`;

const InfClipSlide = memo(({ playlistId, max }) => {
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videosWithProducts, setVideosWithProducts] = useState([]);

  const handleOpenModal = (id) => {
    setSelectedVideoId(id);
    swiper?.autoplay?.stop();
  };

  const handleCloseModal = () => {
    setSelectedVideoId(null);
    swiper?.autoplay?.start();
  };

  //유튜브 리스트 설정
  const { data: shorts = [] } = useYoutubePlaylist(playlistId, max, true, true);

  const videoIds = useMemo(() => {
    return shorts
      .map((item) => item.snippet.resourceId?.videoId || item.id?.videoId)
      .filter(Boolean)
      .join(",");
  }, [shorts]);

  const { data: details = [] } = useYoutubeVideoDetails(
    videoIds,
    !!videoIds,
    true
  );

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  }, [swiper, details]);

  // console.log("shorts", shorts);

  //클립 모달 스크롤 막기
  useEffect(() => {
    if (selectedVideoId) {
      const y = window.scrollY;
      lenis.stop();

      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = y;
    } else {
      const y = parseFloat(document.body.dataset.scrollY || "0");

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.removeAttribute("data-scroll-y");

      window.scrollTo(0, y);
      lenis.start();
    }
  }, [selectedVideoId]);

  const { setScrollLocked } = useHeaderStore.getState();

  useEffect(() => {
    if (selectedVideoId) {
      setScrollLocked(true);
    } else {
      setScrollLocked(false);
    }
  }, [selectedVideoId]);

  //숏츠클립모달 연관상품 관련
  useEffect(() => {
    const fetchAllProducts = async () => {
      const newVideos = details.filter(
        (video) => !videosWithProducts.some((v) => v.id === video.id)
      );
      if (newVideos.length === 0) return;

      const results = await Promise.all(
        newVideos.map(async (video) => {
          const products = await fetchClipProducts(video.snippet.title);
          return { ...video, products };
        })
      );
      setVideosWithProducts((prev) => [...prev, ...results]);
    };

    if (details.length > 0) fetchAllProducts();
  }, [details]);

  const renderedSlides = useMemo(() => {
    return details.map((video, index) => (
      <SwiperSlide key={video.id}>
        <Shortscard
          thumbnail={
            video.snippet.thumbnails?.standard?.url ||
            video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.medium?.url
          }
          title={video.snippet.title}
          channelTitle={video.snippet.channelTitle}
          views={video.statistics.viewCount}
          likes={video.statistics.likeCount}
          onOpenModal={handleOpenModal}
          id={video.id}
        />
      </SwiperSlide>
    ));
  }, [details, handleOpenModal]);

  return (
    <>
      <Container>
        <div className="btns">
          <UpNaviLeftBtn onClick={handlePrev} disabled={isBeginning}>
            <img src={BArrow} alt="button" />
          </UpNaviLeftBtn>
          <UpNaviRightBtn onClick={handleNext} disabled={isEnd}>
            <img src={BArrow} alt="button" />
          </UpNaviRightBtn>
        </div>
        <SlideContainer>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={20}
            onSlideChange={(e) => {
              if (e.isBeginning !== isBeginning) setIsBeginning(e.isBeginning);
              if (e.isEnd !== isEnd) setIsEnd(e.isEnd);
            }}
            onSwiper={(e) => {
              setSwiper(e);
            }}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => setIsEnd(false)}
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 6,
              },
              500: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              1280: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 14,
              },
              1440: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
            }}
          >
            {renderedSlides}
          </Swiper>
        </SlideContainer>
      </Container>
      {selectedVideoId && (
        <ClipDetail
          videoId={selectedVideoId}
          videoList={videosWithProducts}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
});

export default InfClipSlide;
