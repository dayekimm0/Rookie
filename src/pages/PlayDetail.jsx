import React, { useEffect, useState } from "react";
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

const Container = styled.div`
  width: 100%;
  background: var(--gray1);
  padding: 0 5%;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100vh;
  @media screen and (max-width: 1440px) {
    padding: 0 3%;
  }
  @media screen and (max-width: 1024px) {
    padding: 0 3%;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

const PlayContent = styled.div`
  width: 100%;
  padding-top: 36px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;

  @media screen and (max-width: 1024px) {
    gap: 20px;
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
  width: 1200px;
  @media screen and (max-width: 1440px) {
    width: 900px;
  }
  @media screen and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LeftContent = styled.div`
  width: 498px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 1440px) {
    width: 400px;
  }
  @media screen and (max-width: 1024px) {
    width: 320px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 3%;
  }
`;

const RecoPlayWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Divider = styled.div`
  width: 1200px;
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
  width: 100%;
  border-radius: 14px;
  color: var(--light);
  padding: 18px 20px;
  @media screen and (max-width: 1024px) {
    min-height: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 94%;
    margin: 24px 3% 0 3%;
  }
  @media screen and (min-width: 501px) {
    display: block;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const CommentWrapperMobile = styled(CommentWrapper)`
  display: ${({ show }) => (show ? "block" : "none")};
  @media screen and (max-width: 500px) {
    display: ${({ show }) => (show ? "block" : "none")};
  }
`;

const ToggleButton = styled.button`
  background: none;
  color: var(--light);
  border: none;
  font-size: 1.6rem;
  margin: 8px 0;
  cursor: pointer;
  @media screen and (min-width: 501px) {
    display: none;
  }
`;

const CommentTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CommentTitle = styled.h2`
  gap: 6px;
  font-size: 2rem;
  font-weight: 300;
  color: var(--light);
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;

  span {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--light);
  }
`;

function parseISODuration(iso) {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(match?.[1] || "0", 10);
  const seconds = parseInt(match?.[2] || "0", 10);
  return minutes * 60 + seconds;
}

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

  const mergedHighlightVideos = React.useMemo(() => {
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
                ? parseISODuration(video.duration)
                : video.duration;
            return (
              video.id !== videoId &&
              !title.includes("shorts") &&
              !title.includes("쇼츠") &&
              Number.isFinite(durationInSeconds) &&
              durationInSeconds > 180
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

          <ToggleButton onClick={() => setShowMobileComments((prev) => !prev)}>
            {showMobileComments ? "접기" : `댓글 ${commentCount}개 더보기`}
          </ToggleButton>

          <CommentWrapperMobile show={showMobileComments}>
            <CommentTop>
              <CommentTitle>
                댓글 <span>{commentCount}</span>
              </CommentTitle>
            </CommentTop>
            <CommentList
              key={videoId}
              videoId={videoId}
              onCountChange={setCommentCount}
              limit={1} // 최신 댓글 1개만 표시
            />
          </CommentWrapperMobile>

          <Divider />

          <RecoProductPart
            videoTitle={videoInfo.title}
            channelTitle={videoInfo.channelTitle}
          />

          <CommentWrapper>
            <CommentTop>
              <CommentTitle>
                댓글 <span>{commentCount}</span>
              </CommentTitle>
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
