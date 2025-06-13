import { useMemo } from "react";
import styled from "styled-components";
import InfClipSlide from "./InfClipSlide";
import InfSlide from "./InfSlide";
import InfProducts from "./InfProducts";
import InfProfileCard from "./InfProfileCard";
import useAllProductsQuery from "../../hook/useAllProductsQuery";

const Inner = styled.div`
  padding: 100px 0 80px;
  @media screen and (max-width: 1024px) {
    padding: 80px 0 60px;
  }
  @media screen and (max-width: 768px) {
    padding: 60px 0 40px;
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
    & > div:last-of-type {
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
      & > div:last-of-type {
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
      & > div:last-of-type {
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

const InfluencerZone = () => {
  const { data: allProducts = [], isLoading: isProductLoading } =
    useAllProductsQuery();

  const { newest } = useMemo(() => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

    const newest = shuffled.slice(0, 9);

    return { newest };
  }, [allProducts]);

  return (
    <Inner className="inner">
      <Container>
        <ContentsArea>
          <div className="videoWrap">
            <div className="clipWrap">
              <ContentTitle>ROOKie CLIP</ContentTitle>
              <InfClipSlide
                playlistId={"PLQPJYlrXc1__Lq54IZocnGImt8Ays8Y9W"}
                max={21}
              />
            </div>
            <div className="playWrap">
              <ContentTitle>ROOKie PLAY</ContentTitle>
              <InfSlide
                playlistId={"PLR9TDYZHxlTI2m7kth4EXqwj4VcfuaBSA"}
                max={21}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="storeWrap">
            <ContentTitle>ROOKie STORE</ContentTitle>
            {isProductLoading ? "Loading" : <InfProducts products={newest} />}
          </div>
        </ContentsArea>
        <InfProfileCard />
      </Container>
    </Inner>
  );
};

export default InfluencerZone;
