import styled from "styled-components";
import RecoPlay from "../components/PlayDetail/RecoPlay";
import MainPlay from "../components/PlayDetail/MainPlay";
import RecoClip from "../components/PlayDetail/RecoClip";
import RecoProductPart from "../components/PlayDetail/RecoProductPart";
import PostCommentPart from "../components/PlayDetail/PostCommentPart";
import CommentList from "../components/PlayDetail/CommentList";
import Shortscard from "../components/Slides/Shortscard";
import { useYoutubePlaylist } from "../hook/useYoutubePlaylist";
import { useParams } from "react-router-dom";

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
  // ✅ 재생목록 ID 설정 (예: "PL...." 실제 playlistId로 교체!)
  const playlistId = "PLuY-NTS_5Ipwm3kK7npcPz7F-KJsP68My"; // 예: Shorts 재생목록 ID
  const {
    data: playlist = [],
    isLoading,
    isError,
  } = useYoutubePlaylist(playlistId, 1);

  // ✅ 첫 번째 영상의 썸네일을 가져오기
  const thumbnailUrl = playlist.length
    ? playlist[0].snippet.thumbnails?.high?.url ||
      playlist[0].snippet.thumbnails?.medium?.url
    : "";

  return (
    <Container>
      <PlayContent>
        <RightContent>
          <MainPlay />
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
            <RecoPlay />
            <RecoPlay />
            <RecoPlay />
            <RecoPlay />
            <RecoPlay />
          </RecoPlayWrapper>
          {/* ✅ 썸네일만 필요하면 이렇게 props로 넘기기 */}
          {isLoading && <div>로딩중...</div>}
          {isError && <div>문제가 발생했어요.</div>}
          {!isLoading && !isError && (
            <RecoClip thumbnailUrl={thumbnailUrl} videoId={playlist[0].id} />
          )}
        </LeftContent>
      </PlayContent>
    </Container>
  );
};

export default PlayDetail;
