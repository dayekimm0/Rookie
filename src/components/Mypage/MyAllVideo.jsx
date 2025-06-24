import { useState, useEffect } from "react";

import MyVideoSlide from "../MypageSlides/MyVideoSlide";
import MyShortsSlide from "../MypageSlides/MyShortsSlide";
import { useVideoStore } from "../../stores/videoStore";
import NoItem from "./NoItem";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const MyAllVideo = () => {
  const [videoIds, setVideoIds] = useState([]);
  const [likesLoading, setLikesLoading] = useState(true);
  const { isNoVideo, setNoVideo } = useVideoStore();

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

  useEffect(() => {
    setNoVideo(videoIds.length === 0);
  }, [videoIds]);

  if (isNoVideo) {
    return <NoItem />;
  }

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
