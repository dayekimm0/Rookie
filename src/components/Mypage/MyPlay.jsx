import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useYoutubeVideoDetails } from "../../hook/useYoutubePlayList";
import { parseISO8601Duration } from "../../utils/youtube";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import PlayCard from "../Slides/PlayCard";
import NoItem from "./NoItem";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: var(--gray2);
  gap: 10px;
  row-gap: 40px;
  .btns {
    position: absolute;
    display: flex;
    gap: 16px;
    top: -34px;
    right: 0;
  }
  h5 {
    color: var(--gray1);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MyPlay = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [likesLoading, setLikesLoading] = useState(true);
  const navigate = useNavigate();

  const handleDetailClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

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
    return videos
      .filter((video) => {
        const durationStr = video.contentDetails?.duration;
        const seconds = parseISO8601Duration(durationStr);
        return seconds > 99;
      })
      .map((video) => {
        const vid = video.id;
        const { title, thumbnails } = video.snippet;
        const thumbUrl = thumbnails.maxres?.url || thumbnails.medium?.url;

        return (
          <PlayCard
            thumbnail={thumbUrl}
            title={title}
            onClick={() => handleDetailClick(vid)}
          />
        );
      });
  }, [videos]);

  if (slides.length === 0) {
    return <NoItem />;
  }

  return <Container>{slides}</Container>;
};

export default MyPlay;
