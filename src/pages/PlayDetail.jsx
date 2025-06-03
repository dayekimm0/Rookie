import styled from "styled-components";
import RecoPlay from "../components/PlayDetail/RecoPlay";
import MainPlay from "../components/PlayDetail/MainPlay";
import RecoClip from "../components/PlayDetail/RecoClip";
import RecoProductPart from "../components/PlayDetail/RecoProductPart";

const Container = styled.div`
  width: 100%;
  background: var(--gray1);
  padding: 0 5%;
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

const CommentList = styled.div`
  margin-top: 24px;
  background: var(--gray2);
  width: 100%;
  height: 520px;
  border-radius: 14px;
  color: var(--light);
`;

const PlayDetail = () => {
  return (
    <Container>
      <PlayContent>
        <RightContent>
          <MainPlay />
          <Divider />
          <RecoProductPart />
          <CommentList>댓글창</CommentList>
        </RightContent>
        <LeftContent>
          <RecoPlayWrapper>
            <RecoPlay />
            <RecoPlay />
            <RecoPlay />
            <RecoPlay />
            <RecoPlay />
          </RecoPlayWrapper>
          <RecoClip />
        </LeftContent>
      </PlayContent>
    </Container>
  );
};

export default PlayDetail;
