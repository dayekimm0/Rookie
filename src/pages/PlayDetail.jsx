import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import RecoPlay from "../components/PlayDetail/RecoPlay";
import MainPlay from "../components/PlayDetail/MainPlay";
import RecoClip from "../components/PlayDetail/RecoClip";
import RecoProductPart from "../components/PlayDetail/RecoProductPart";
import PostCommentPart from "../components/PlayDetail/PostCommentPart";
import CommentList from "../components/PlayDetail/CommentList";
import {
  fetchVideoDetailById,
  fetchChannelThumbnail,
  fetchRelatedVideosByChannelId,
  fetchPlaylistVideos,
} from "../hook/useYoutubeContentList";
import { playContents } from "../data/playcontents";
import { parseISO8601Duration } from "../utils/youtube";

const Container = styled.div`
  width: 100%;
  background: var(--gray1);
  padding: 0 5%;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100vh;

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
  }
  @media screen and (max-width: 768px) {
  }
`;

const PlayContent = styled.div`
  padding-top: 36px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* border: 1px solid #f00; */
  @media screen and (max-width: 1800px) {
    gap: 0px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: 0;
  }
  @media screen and (max-width: 500px) {
    gap: 30px;
  }
`;

const RightContent = styled.div`
  /* width: 1200px; */
  width: 70%;
  /* border: 1px solid #00f; */

  @media screen and (max-width: 1440px) {
    width: 66%;
  }

  /* @media screen and (max-width: 1024px) {
    width: 640px;
  } */
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LeftContent = styled.div`
  width: 28%;
  /* border: 1px solid #0f0; */
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 1440px) {
    width: 32%;
  }
  @media screen and (max-width: 1024px) {
    /* width: 320px; */
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const RecoPlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Divider = styled.div`
  /* width: 1200px; */
  width: 100%;
  height: 2px;
  background: var(--gray6);
  margin-top: 18px;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const CommentWrapper = styled.div`
  margin-top: 24px;
  background: var(--gray2);
  border-radius: 14px;
  color: var(--light);
  padding: 18px 20px;
  @media screen and (max-width: 1024px) {
    min-height: 400px;
  }
  @media screen and (max-width: 768px) {
    margin: 24px 3% 0 3%;
  }
  @media screen and (min-width: 501px) {
    display: block;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const CommentWrapperMobile = styled.div`
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
  background: var(--gray2);
  width: calc(100% - 30px);
  border-radius: 14px;
  color: var(--light);
  padding: 18px 20px;
  @media screen and (min-width: 501px) {
    display: none;
  }
`;

const CommentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2rem;
    font-weight: 300;
    color: var(--light);
    display: flex;
    align-items: center;

    span {
      font-size: 1.8rem;
      font-weight: 600;
      margin-left: 6px;
    }
  }

  button {
    background: none;
    color: var(--light);
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

const CommentListBoxMobile = styled.div`
  margin-top: 10px;
  max-height: ${({ $show }) => ($show ? "1000px" : "110px")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const PlayDetail = () => {
  const { videoId } = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [channelThumbnail, setChannelThumbnail] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [highlightVideosFromPlayContents, setHighlightVideosFromPlayContents] =
    useState([]);
  const [
    highlightVideosFromShortsPlaylist,
    setHighlightVideosFromShortsPlaylist,
  ] = useState([]);
  const [showMobileComments, setShowMobileComments] = useState(false);

  useEffect(() => {
    const loadHighlightFromPlayContents = async () => {
      if (!playContents.highlight?.playlistId) return;
      const videos = await fetchPlaylistVideos(
        playContents.highlight.playlistId
      );
      setHighlightVideosFromPlayContents(videos);
    };
    loadHighlightFromPlayContents();
  }, []);

  useEffect(() => {
    const loadHighlightFromShorts = async () => {
      const shortsPlaylistId = "PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W";
      const videos = await fetchPlaylistVideos(shortsPlaylistId, 21);
      setHighlightVideosFromShortsPlaylist(videos);
    };
    loadHighlightFromShorts();
  }, []);

  const mergedHighlightVideos = useMemo(() => {
    const combined = [
      ...highlightVideosFromPlayContents,
      ...highlightVideosFromShortsPlaylist,
    ];
    const uniqueMap = new Map();
    combined.forEach((video) => uniqueMap.set(video.id, video));
    return Array.from(uniqueMap.values()).sort(() => 0.5 - Math.random());
  }, [highlightVideosFromPlayContents, highlightVideosFromShortsPlaylist]);

  useEffect(() => {
    const loadData = async () => {
      const videoData = await fetchVideoDetailById(videoId);
      setVideoInfo(videoData);
      const thumbnail = await fetchChannelThumbnail(videoData.channelId);
      setChannelThumbnail(thumbnail);

      const playlistId = videoData.playlistId;
      if (playlistId) {
        const videos = await fetchPlaylistVideos(playlistId);

        setPlaylistVideos(
          videos.filter((video) => {
            const title = video.title?.toLowerCase() || "";
            const durationInSeconds =
              typeof video.duration === "string"
                ? parseISO8601Duration(video.duration)
                : video.duration;

            return (
              video.id !== videoId &&
              !title.includes("shorts") &&
              !title.includes("쇼츠") &&
              Number.isFinite(durationInSeconds) &&
              durationInSeconds <= 99 //
            );
          })
        );
      } else {
        const related = await fetchRelatedVideosByChannelId(
          videoData.channelId,
          videoId
        );
        setPlaylistVideos(related);
      }
    };

    if (videoId) loadData();
  }, [videoId]);

  if (!videoInfo) return <div>로딩 중...</div>;

  return (
    <Container>
      <PlayContent>
        <RightContent>
          <MainPlay
            videoId={videoId}
            title={videoInfo.title}
            channelTitle={videoInfo.channelTitle}
            subscriberCount={videoInfo.subscriberCount}
            teamLogo={channelThumbnail}
          />

          <CommentWrapperMobile>
            <CommentTop>
              <h2>
                댓글 <span>{commentCount}</span>
              </h2>
              <button onClick={() => setShowMobileComments((prev) => !prev)}>
                {showMobileComments ? "접기" : "더보기"}
              </button>
            </CommentTop>
            <CommentListBoxMobile $show={showMobileComments}>
              <CommentList
                key={videoId}
                videoId={videoId}
                onCountChange={setCommentCount}
              />
              {showMobileComments && <PostCommentPart videoId={videoId} />}
            </CommentListBoxMobile>
          </CommentWrapperMobile>

          <Divider />

          <RecoProductPart
            videoTitle={videoInfo.title}
            channelTitle={videoInfo.channelTitle}
          />

          <CommentWrapper>
            <CommentTop>
              <h2>
                댓글 <span>{commentCount}</span>
              </h2>
            </CommentTop>
            <CommentList
              key={videoId}
              videoId={videoId}
              onCountChange={setCommentCount}
            />
            <PostCommentPart videoId={videoId} />
          </CommentWrapper>
        </RightContent>

        <LeftContent>
          <RecoPlayWrapper>
            {playlistVideos.slice(0, 4).map((video) => (
              <RecoPlay
                key={video.id}
                videoId={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                channelTitle={video.channelTitle}
                viewCount={video.viewCount}
                publishedAt={video.publishedAt}
              />
            ))}
          </RecoPlayWrapper>
          {mergedHighlightVideos.length > 0 && (
            <RecoClip videoList={mergedHighlightVideos} />
          )}
        </LeftContent>
      </PlayContent>
    </Container>
  );
};

export default PlayDetail;
