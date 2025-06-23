import { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useYoutubeVideoDetails } from "../../hook/useYoutubePlayList";
import { parseISO8601Duration } from "../../utils/youtube";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Shortscard from "../Slides/Shortscard";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  color: var(--gray2);
  gap: 10px;
  .btns {
    position: absolute;
    display: flex;
    gap: 16px 40px;
    top: -34px;
    right: 0;
  }
  p {
    color: var(--gray1);
    word-break: keep-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;   
    -webkit-box-orient: vertical;
    line-height: 1.3;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`

const CardWrapper = styled.div`
  aspect-ratio: 9 / 16;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MyClip = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [likesLoading, setLikesLoading] = useState(true);
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

  const slides = useMemo(() => {
    return videos.filter((video)=>{
      const durationStr = video.contentDetails?.duration;
      const seconds = parseISO8601Duration(durationStr);
      return seconds <= 99;
    })
    .map((video) => {
      const vid = video.id;
      const { title, thumbnails } = video.snippet;
      const thumbUrl = thumbnails.maxres?.url || thumbnails.medium?.url;

      return (
      <Wrapper>
        <CardWrapper key={vid}>
          <ThumbnailImg src={thumbUrl} alt={title} />
        </CardWrapper>
          <p>{title}</p>
      </Wrapper>
      );
    });
  }, [videos]);

  return <Container>{slides}</Container>;
};

export default MyClip;
