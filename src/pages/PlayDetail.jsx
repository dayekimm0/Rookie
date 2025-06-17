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
} from "../hook/useYoutubeContentList";

const Container = styled.div`
  width: 100%;
  background: var(--gray1);
  padding: 0 5%;
  overflow: hidden;
`;

const PlayContent = styled.div`
  width: 100%;
  padding-top: 36px;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 30px;
`;

const RightContent = styled.div`
  width: 1200px;
`;

const LeftContent = styled.div`
  width: 498px;
`;

const RecoPlayWrapper = styled.div`
  width: 100%;
  height: 675px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 1200px;
  height: 2px;
  background: var(--gray6);
  margin-top: 18px;
`;

const CommentWrapper = styled.div`
  margin-top: 24px;
  background: var(--gray2);
  width: 100%;
  height: 540px;
  border-radius: 14px;
  color: var(--light);
  padding: 18px 20px;
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

const PlayDetail = () => {
  const { videoId } = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [channelThumbnail, setChannelThumbnail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const loadVideoAndChannel = async () => {
      const videoData = await fetchVideoDetailById(videoId);
      setVideoInfo(videoData);

      const thumbnail = await fetchChannelThumbnail(videoData.channelId);
      setChannelThumbnail(thumbnail);

      const related = await fetchRelatedVideosByChannelId(
        videoData.channelId,
        videoId
      );
      setRelatedVideos(related);
    };

    if (videoId) loadVideoAndChannel();
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
          <Divider />
          <RecoProductPart />
          <CommentWrapper>
            <CommentTop>
              <CommentTitle>
                댓글 <span>294</span>
              </CommentTitle>
            </CommentTop>
            <CommentList />
            <PostCommentPart />
          </CommentWrapper>
        </RightContent>
        <LeftContent>
          <RecoPlayWrapper>
            {relatedVideos.map((video) => (
              <RecoPlay
                key={video.id}
                videoId={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                channelTitle={video.channelTitle}
              />
            ))}
          </RecoPlayWrapper>
          <RecoClip />
        </LeftContent>
      </PlayContent>
    </Container>
  );
};

export default PlayDetail;
