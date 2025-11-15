import styled from "styled-components";
import InfClipSlide from "./InfClipSlide";
import InfSlide from "./InfSlide";
import InfProducts from "./InfProducts";
import InfProfileCard from "./InfProfileCard";

const Inner = styled.div`
  padding-top: 100px;
  @media screen and (max-width: 1024px) {
    padding-top: 80px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 60px;
  }
`;

const Container = styled.div`
  position: relative;

  padding: 80px;
  background: #212121;
  border-radius: 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;

  @media screen and (max-width: 1440px) {
    padding: 60px;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    gap: 70px;
    padding: 50px;
  }
  @media screen and (max-width: 768px) {
    gap: 50px;
    padding: 30px;
  }
  @media screen and (max-width: 500px) {
    padding: 20px;
  }
  @media screen and (max-width: 400px) {
    padding: 14px;
    padding-bottom: 20px;
  }
`;

const ContentsArea = styled.div`
  width: 63%;

  .videoWrap {
    & > div:nth-of-type(2) {
      margin-top: 80px;
    }
  }

  .line {
    border: none;
    border-top: 1px solid var(--gray6);
    margin: 92px 0;
  }
  @media screen and (max-width: 1280px) {
    .videoWrap {
      & > div:nth-of-type(2) {
        margin-top: 70px;
      }
    }
    .line {
      margin: 72px 0;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    .videoWrap {
      & > div:nth-of-type(2) {
        margin-top: 50px;
      }
    }
    .line {
      margin: 52px 0;
    }
  }
`;

const ContentTitle = styled.h4`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: inline-block;
  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 18px;
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 12px;
  }
`;

const InfluencerZone = ({ influencer, teamCode }) => {
  const { name, profile, description, play, clip, products } = influencer;
  // const { data: allProducts = [], isLoading: isProductLoading } =
  //   useAllProductsQuery();

  return (
    <Inner className="inner">
      <Container>
        <ContentsArea>
          <div className="videoWrap">
            {clip && (
              <div className="clipWrap">
                <ContentTitle>ROOKie CLIP</ContentTitle>
                <InfClipSlide playlistId={clip} max={21} />
              </div>
            )}
            {play && (
              <div className="playWrap">
                <ContentTitle>ROOKie PLAY</ContentTitle>
                <InfSlide playlistId={play} max={21} />
              </div>
            )}
          </div>
          {products && (
            <>
              <hr className="line" />
              <div className="storeWrap">
                <ContentTitle>ROOKie STORE</ContentTitle>
                <InfProducts products={products} name={name} />
              </div>
            </>
          )}
        </ContentsArea>
        <InfProfileCard
          name={name}
          profile={profile}
          description={description}
          clipId={clip}
          playId={play}
          teamCode={teamCode}
          products={products}
        />
      </Container>
    </Inner>
  );
};

export default InfluencerZone;
