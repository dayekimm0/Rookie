import React, { useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { getTeamStoreVideo, getYoutubeThumbnail } from "../../utils/teamVideos";

const Section = styled.div`
  background: var(--dark);
  color: var(--light);
  padding: 120px 0;

  @media screen and (max-width: 1024px) {
    padding: 40px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
`;

const Container = styled.div``;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  color: var(--light);

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
  }
`;

// 좌측 영상 영역 (1086*608)
const VideoSection = styled.div`
  width: 1086px;
  height: 608px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 400px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: var(--grayC);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

// 구단별 영상 썸네일
const VideoThumbnail = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.thumbnail});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const PlayButton = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 25px solid #333;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    margin-left: 8px;
  }

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;

    &::after {
      border-left: 18px solid #333;
      border-top: 12px solid transparent;
      border-bottom: 12px solid transparent;
      margin-left: 6px;
    }
  }
`;

const VideoInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2;
  color: white;

  h3 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    opacity: 0.9;
  }

  @media screen and (max-width: 768px) {
    bottom: 15px;
    left: 15px;

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 12px;
    }
  }
`;

// 우측 제품 리스트 영역
const ProductSection = styled.div`
  flex: 1;
  max-height: 608px;
  overflow-y: auto;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background: var(--grayD);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray8);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray8);
  }
`;

const ProductItem = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

// 제품 이미지 컨테이너 (224*224)
const ProductImage = styled.div`
  width: 224px;
  height: 224px;
  background: var(--grayC);
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: var(--grayC);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray4);
  font-size: 14px;
`;

// 제품 정보 컨테이너 (615*224)
const ProductInfo = styled.div`
  width: 615px;
  height: 224px;
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  @media screen and (max-width: 1024px) {
    width: auto;
    flex: 1;
  }
`;

const InfluencerName = styled.div`
  font-size: 14px;
  color: var(--grayC);
  margin-bottom: 8px;
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--light);
  line-height: 1.4;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ProductPrice = styled.div`
  font-size: 26px;
  font-weight: semibold;
  color: var(--light);

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const TeamVideoProduct = ({ teamCode, sectionType, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // TEAM STORE인 경우에만 구단별 영상 데이터 가져오기
  const videoData =
    sectionType === "TEAM_STORE" ? getTeamStoreVideo(teamCode) : null;

  // Mock 데이터 - 추후 JSON으로 교체
  const mockProducts = [
    {
      id: 1,
      image: "/api/placeholder/224/224",
      influencerName: "인플루언서명",
      productName: "상품명",
      price: "33,000원",
    },
    {
      id: 2,
      image: "/api/placeholder/224/224",
      influencerName: "인플루언서명",
      productName: "상품명",
      price: "45,000원",
    },
    {
      id: 3,
      image: "/api/placeholder/224/224",
      influencerName: "인플루언서명",
      productName: "상품명(절반만 보임)",
      price: "29,000원",
    },
    {
      id: 4,
      image: "/api/placeholder/224/224",
      influencerName: "인플루언서명",
      productName: "상품명(절반만 보임)",
      price: "29,000원",
    },
  ];

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleReady = () => {
    setIsReady(true);
  };

  const handleError = () => {
    console.warn("YouTube player error 발생");
    setIsReady(false);
  };

  return (
    <Section>
      <Container className="inner">
        <SectionTitle>{title}</SectionTitle>

        <ContentWrapper>
          {/* 좌측 영상 영역 */}
          <VideoSection>
            {sectionType === "TEAM_STORE" && videoData ? (
              // TEAM STORE - 구단별 고정 영상
              isPlaying ? (
                <>
                  {!isReady && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 3,
                      }}
                    >
                      영상 로딩 중...
                    </div>
                  )}
                  <YouTube
                    videoId={videoData.videoId}
                    onReady={handleReady}
                    onError={handleError}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        rel: 0,
                        modestbranding: 1,
                      },
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      visibility: isReady ? "visible" : "hidden",
                    }}
                  />
                </>
              ) : (
                <VideoThumbnail
                  thumbnail={getYoutubeThumbnail(videoData.videoId)}
                  onClick={handlePlay}
                >
                  <PlayButton />
                  <VideoInfo>
                    <h3>{videoData.title}</h3>
                    <p>{videoData.description}</p>
                  </VideoInfo>
                </VideoThumbnail>
              )
            ) : (
              // ROOKie 파트너존 - 기존 플레이스홀더
              <VideoPlaceholder>
                {/* 기존 주석 처리된 내용 그대로 유지 */}
              </VideoPlaceholder>
            )}
          </VideoSection>

          {/* 우측 제품 리스트 영역 */}
          <ProductSection>
            {mockProducts.map((product) => (
              <ProductItem key={product.id}>
                <ProductImage>
                  {product.image ? (
                    <img src={product.image} alt={product.productName} />
                  ) : (
                    <ProductImagePlaceholder>
                      상품 이미지
                    </ProductImagePlaceholder>
                  )}
                </ProductImage>

                <ProductInfo>
                  <div>
                    <InfluencerName>{product.influencerName}</InfluencerName>
                    <ProductName>{product.productName}</ProductName>
                  </div>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductInfo>
              </ProductItem>
            ))}
          </ProductSection>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default TeamVideoProduct;
