import { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useYoutubeVideoDetails } from "../../hook/useYoutubePlayList";

import BArrow from "../../images/icons/Bmain_banner_arr.svg";
import { UpNaviLeftBtn, UpNaviRightBtn } from "../Slides/NaviBtnStyles";
import PlayCard from "../Slides/PlayCard";

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
  margin-bottom: 56px;
  .swiper {
    overflow: visible !important;
    h5 {
      color: var(--gray1);
    }
  }
`;

const MyVideoSlide = ({ onSwiperReady }) => {
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

  // swiper

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
    return videos.map((video) => {
      const vid = video.id;
      const { title, thumbnails } = video.snippet;
      const thumbUrl = thumbnails.maxres?.url || thumbnails.medium?.url;
      return (
        <SwiperSlide key={vid}>
          <PlayCard thumbnail={thumbUrl} title={title} />
        </SwiperSlide>
      );
    });
  }, [videos]);

  if (likesLoading || videosLoading) {
    return <p>로딩 중...</p>;
  }

  if (slides.length === 0) {
    return <></>;
  }

  return (
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
          slidesPerView={3}
          slidesPerGroup={3}
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
            500: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 14,
            },
            1440: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
          }}
        >
          {slides}
        </Swiper>
      </SlideContainer>
    </Container>
  );
};

export default MyVideoSlide;
