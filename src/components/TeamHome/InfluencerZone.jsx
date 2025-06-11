import styled from "styled-components";
import InfClipSlide from "./InfClipSide";

const Container = styled.div`
  margin-top: 130px;
  padding: 80px;
  background: #212121;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
`;

const ContentsArea = styled.div`
  width: 63%;
`;

const ContentTitle = styled.h4`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ProfileCard = styled.div`
  width: 30.5%;
  background: #191919;
  border-radius: 20px;
  padding: 68px 20px;
`;

const InfluencerZone = () => {
  return (
    <Container className="inner">
      <ContentsArea>
        <ContentTitle>ROOKie CLIP</ContentTitle>
        <InfClipSlide
          playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
          title={"하이라이트 CLIP"}
          max={21}
        />
      </ContentsArea>
      <ProfileCard></ProfileCard>
    </Container>
  );
};

export default InfluencerZone;
