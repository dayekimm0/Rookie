import React, { useState, useMemo } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getTeamStoreVideo, getYoutubeThumbnail } from "../../data/teamVideos";
import { getTeamVideoProducts } from "../../data/teamVideoProducts";

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

const Container = styled.div`
  position: relative;
`;

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
    gap: 11px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

  @media screen and (max-width: 375px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// 좌측 영상 영역 (1086*608)
const VideoSection = styled.div`
  width: 60%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  /* @media screen and (max-width: 1980px) {
    width: 62%;
  } */

  @media screen and (max-width: 1880px) {
    max-height: 570px;
  }

  @media screen and (max-width: 1780px) {
    max-height: 480px;
  }

  @media screen and (max-width: 1420px) {
    max-height: 420px;
  }

  @media screen and (max-width: 1240px) {
    max-height: 360px;
  }

  @media screen and (max-width: 1024px) {
    max-height: 340px;
  }

  @media screen and (max-width: 960px) {
    height: 280px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 375px) {
    width: 100%;
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

// 우측 제품 리스트 영역
const ProductSection = styled.div`
  flex: 1;
  max-height: 608px;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: auto;
  scroll-behavior: smooth;

  /* 스크롤바 스타일링 */
  scrollbar-gutter: stable;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: var(--grayD);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray8);
    border-radius: 4px;
    border: 3px solid var(--grayD);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray6);
    border: 3px solid var(--grayD);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  /* @media screen and (max-width: 1980px) {
    width: 38%;
  } */

  @media screen and (max-width: 1880px) {
    max-height: 570px;
  }

  @media screen and (max-width: 1780px) {
    max-height: 480px;
  }

  @media screen and (max-width: 1420px) {
    max-height: 420px;
  }

  @media screen and (max-width: 1240px) {
    max-height: 360px;
  }

  @media screen and (max-width: 1024px) {
    max-height: 340px;
  }

  @media screen and (max-width: 960px) {
    max-height: 280px;
  }

  @media screen and (max-width: 768px) {
    max-height: none;
    overflow-y: visible;
    overflow-x: auto;
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    width: 100%;

    /* 모바일 가로 스크롤바 */
    &::-webkit-scrollbar {
      height: 8px;
      width: auto;
    }

    &::-webkit-scrollbar-track {
      background: var(--grayD);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--gray8);
      border-radius: 4px;
      border: 2px solid var(--grayD);
      background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--gray6);
      border: 2px solid var(--grayD);
      background-clip: content-box;
    }
  }

  @media screen and (max-width: 375px) {
    max-height: none;
    overflow-y: visible;
    overflow-x: auto;
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    width: 100%;

    /* 모바일 가로 스크롤바 */
    &::-webkit-scrollbar {
      height: 8px;
      width: auto;
    }

    &::-webkit-scrollbar-track {
      background: var(--grayD);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--gray8);
      border-radius: 4px;
      border: 2px solid var(--grayD);
      background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--gray6);
      border: 2px solid var(--grayD);
      background-clip: content-box;
    }
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

  @media screen and (max-width: 1880px) {
    gap: 11px;
  }

  @media screen and (max-width: 1024px) {
    gap: 11px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 0;
    flex-shrink: 0;
    width: 100px;
  }

  @media screen and (max-width: 375px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 0;
    flex-shrink: 0;
    width: 100px;
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

  @media screen and (max-width: 1880px) {
    width: 220px;
    height: 220px;
  }

  @media screen and (max-width: 1780px) {
    width: 180px;
    height: 180px;
  }

  @media screen and (max-width: 1420px) {
    width: 150px;
    height: 150px;
  }

  @media screen and (max-width: 1024px) {
    width: 126px;
    height: 126px;
  }

  @media screen and (max-width: 960px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 375px) {
    width: 100px;
    height: 100px;
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
  padding: 16px 16px;

  @media screen and (max-width: 1880px) {
    height: 220px;
  }

  @media screen and (max-width: 1780px) {
    height: 180px;
  }

  @media screen and (max-width: 1420px) {
    width: 344px;
    height: 150px;
    padding: 12px;
  }
  @media screen and (max-width: 1024px) {
    width: 344px;
    height: 126px;
    padding: 12px;
  }

  @media screen and (max-width: 960px) {
    width: 100px;
    height: 100px;
    padding: 8px 0;
    flex-shrink: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    height: 154px;
    padding: 8px 0;
    flex-shrink: 0;
  }

  @media screen and (max-width: 375px) {
    width: 100px;
    height: 154px;
    padding: 8px 0;
    flex-shrink: 0;
  }
`;

const InfluencerName = styled.div`
  font-size: 14px;
  color: var(--grayC);
  margin-bottom: 8px;

  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    font-size: 9px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 375px) {
    font-size: 9px;
    margin-bottom: 4px;
  }
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--light);
  line-height: 1.4;
  margin-bottom: 16px;

  @media screen and (max-width: 1024px) {
    font-size: 18px;
    margin-bottom: 12px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 1.3;
  }

  @media screen and (max-width: 375px) {
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 1.3;
  }
`;

const ProductPrice = styled.div`
  font-size: 26px;
  font-weight: semibold;
  color: var(--light);

  @media screen and (max-width: 1024px) {
    font-size: 26px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media screen and (max-width: 375px) {
    font-size: 12px;
  }
`;

const TeamVideoProduct = ({ teamCode, sectionType, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  // TEAM STORE인 경우에만 구단별 영상 데이터 가져오기
  const videoData =
    sectionType === "TEAM_STORE" ? getTeamStoreVideo(teamCode) : null;

  // 구단별 상품 데이터 fetch (ProductList.jsx와 동일한 방식)
  const {
    data: allTeamProducts = [],
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["teamProducts", teamCode],
    queryFn: async () => {
      if (!teamCode) return [];
      const res = await fetch(
        `https://rookiejson.netlify.app/teamJson/${teamCode}.json`
      );
      if (!res.ok) throw new Error("팀 상품 로딩 실패");
      return res.json();
    },
    staleTime: 1000 * 60 * 10, // 10분 캐싱
    enabled: !!teamCode && sectionType === "TEAM_STORE", // TEAM_STORE일 때만 실행
  });

  // 표시할 상품들 필터링
  const displayProducts = useMemo(() => {
    if (sectionType !== "TEAM_STORE" || !teamCode || !allTeamProducts.length) {
      return [];
    }

    const selectedProductIds = getTeamVideoProducts(teamCode);

    // ID 순서대로 상품 정렬하여 반환
    return selectedProductIds
      .map((id) => allTeamProducts.find((product) => product.id === id))
      .filter(Boolean); // undefined 제거
  }, [allTeamProducts, teamCode, sectionType]);

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

  const handleProductClick = (product) => {
    // 내부 ProductDetail 페이지로 이동
    // 경로: /store/{teamCode}/{productId}
    navigate(`/store/${teamCode}/${product.id}`);
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
                </VideoThumbnail>
              )
            ) : (
              // ROOKie 파트너존 플레이스홀더
              <VideoPlaceholder>영상 준비 중...</VideoPlaceholder>
            )}
          </VideoSection>

          {/* 우측 제품 리스트 영역 */}
          <ProductSection data-lenis-prevent>
            {isProductsLoading ? (
              <div
                style={{
                  display: "flex",
                  justify: "center",
                  alignItems: "center",
                  height: "200px",
                  color: "var(--gray4)",
                }}
              >
                상품 로딩 중...
              </div>
            ) : productsError ? (
              <div
                style={{
                  display: "flex",
                  justify: "center",
                  alignItems: "center",
                  height: "200px",
                  color: "var(--gray4)",
                }}
              >
                상품 로딩 실패
              </div>
            ) : displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                >
                  <ProductImage>
                    {product.thumbnail ? (
                      <img src={product.thumbnail} alt={product.name} />
                    ) : (
                      <ProductImagePlaceholder>
                        상품 이미지
                      </ProductImagePlaceholder>
                    )}
                  </ProductImage>

                  <ProductInfo>
                    <div>
                      <InfluencerName>
                        {product.collaboration || "구단 상품"}
                      </InfluencerName>
                      <ProductName>{product.name}</ProductName>
                    </div>
                    <ProductPrice>{product.price}</ProductPrice>
                  </ProductInfo>
                </ProductItem>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justify: "center",
                  alignItems: "center",
                  height: "200px",
                  color: "var(--gray4)",
                }}
              >
                표시할 상품이 없습니다.
              </div>
            )}
          </ProductSection>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default TeamVideoProduct;
