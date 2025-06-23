import React, { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import BArrow from "../../images/icons/Bmain_banner_arr.svg";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import { useYoutubeVideoDetails } from "../../hook/useYoutubePlayList";
import { parseISO8601Duration } from "../../utils/youtube";
import Shortscard from "../Slides/Shortscard";

const Container = styled.div`
  position: relative;
  width: 100%;
  .btns {
    position: absolute;
    display: flex;
    gap: 16px;
    top: -34px;
    right: 0;
  }
`;

const SlideContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .swiper {
    overflow: visible !important;
    p {
      color: var(--gray1);
    }
  }
`;

const SlideLoaderWrapper = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
  }
`;

const SvgSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  .path {
    stroke: var(--main);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const MyShortsSlide = React.memo(({ onSwiperReady }) => {
  const [videoIds, setVideoIds] = useState([]);
  const [likesLoading, setLikesLoading] = useState(true);
  const [swiper, setSwiper] = useState();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLikesLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "userLikes", user.uid));
      setVideoIds(snap.data()?.likes || []);
      setLikesLoading(false);
    };
    fetchLikes();
  }, []);

  const idsParam = useMemo(() => {
    return videoIds.length ? videoIds.join(",") : null;
  }, [videoIds]);

  const { data: videos = [], isLoading: videosLoading } =
    useYoutubeVideoDetails(idsParam, !likesLoading && !!idsParam > 0);

  const handlePrev = useCallback(() => {
    swiper?.slidePrev();
  }, [swiper]);

  const handleNext = useCallback(() => {
    swiper?.slideNext();
  }, [swiper]);

    useEffect(() => {
    if (swiper && onSwiperReady) {
      onSwiperReady(swiper);
    }
  }, [swiper]);

  const slides = useMemo(() => {
return videos.filter((video)=>{
      const durationStr = video.contentDetails?.duration;
      const seconds = parseISO8601Duration(durationStr);
      console.log(video.id, durationStr, seconds);
      return seconds <= 99;
    })
    .map((video) => {
      const vid = video.id;
      const { title, thumbnails } = video.snippet;
      const thumbUrl = thumbnails.maxres?.url || thumbnails.medium?.url;

      return (
        <SwiperSlide key={vid}>
          <Shortscard
            thumbnail={thumbUrl} title={title}
            onClick={() => console.log("Clicked:", vid)}
          />
        </SwiperSlide>
      );
    });
  }, [videos]);

    if (likesLoading || videosLoading) {
    return (
      <SlideLoaderWrapper>
        <SvgSpinner viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </SvgSpinner>
      </SlideLoaderWrapper>
    );
  }

  if (slides.length === 0) {
    return <></>;
  }

  // console.log("shorts", shorts);

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
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 6,
              },
              400: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 6,
              },
              500: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
            }}
          >
            {slides}
          </Swiper>
        </SlideContainer>
      </Container>
    </>
  );
});

export default MyShortsSlide;
