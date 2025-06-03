import styled from "styled-components";
import RecoPlay from "../components/PlayDetail/RecoPlay";
import MainPlay from "../components/PlayDetail/MainPlay";
import RecoProduct from "../components/PlayDetail/RecoProduct";
import RecoClip from "../components/PlayDetail/RecoClip";

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

const RecoProductWrapper = styled.div`
  width: 100%;
  margin-top: 26px;
`;

const RecoProductList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecoProductTitle = styled.h1`
  font-size: 2.2rem;
  color: var(--light);
  font-weight: 600;
  margin-bottom: 26px;
`;

const PlayDetail = () => {
  return (
    <Container>
      <PlayContent>
        <RightContent>
          <MainPlay />
          <Divider />
          <RecoProductWrapper>
            <RecoProductTitle>여기서 추천하는 ROOK</RecoProductTitle>
            <RecoProductList>
              <RecoProduct />
              <RecoProduct />
              <RecoProduct />
            </RecoProductList>
          </RecoProductWrapper>
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
