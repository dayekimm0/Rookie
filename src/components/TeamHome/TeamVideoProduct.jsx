import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getTeamStoreVideo,
  getTeamRookieVideo,
  getYoutubeThumbnail,
} from "../../data/teamVideos";
import { getTeamVideoProducts } from "../../data/teamVideoProducts";
import { getTeamRookieProducts } from "../../data/teamRookieProducts";
import useDragScroll from "../../hook/useDragScroll";

const Section = styled.div`
  background: var(--dark);
  color: var(--light);
  padding: 120px 0 50px;

  @media screen and (max-width: 1024px) {
    padding: 90px 0 40px;
  }

  @media screen and (max-width: 768px) {
    padding: 80px 0 40px;
  }
  @media screen and (max-width: 768px) {
    padding: 80px 0 40px;
  }
  @media screen and (max-width: 500px) {
    padding: 60px 0 30px;
  }
`;

const Container = styled.div`
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: var(--light);

  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
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
    height: auto;
    aspect-ratio: 16/9;
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
  background-image: url(${(props) => props.$thumbnail});
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
const ProductSection = styled.div.attrs((props) => ({
  "data-lenis-prevent": props.$preventScroll ? "" : undefined,
}))`
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
  @media screen and (max-width: 1440px) {
    gap: 6px;
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 11px;
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
  @media screen and (max-width: 1280px) {
    width: 130px;
    height: 130px;
  }

  @media screen and (max-width: 1024px) {
    width: 126px;
    height: 126px;
  }

  @media screen and (max-width: 960px) {
    width: 110px;
    height: 110px;
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
  /* width: 615px; */
  display: flex;
  flex-direction: column;
  padding: 16px 16px;

  @media screen and (max-width: 1420px) {
    /* width: 344px; */
    padding: 12px;
  }
  @media screen and (max-width: 1024px) {
    /* width: 344px; */
    padding: 12px;
  }

  @media screen and (max-width: 960px) {
    /* width: 200px; */
    padding: 8px 0;
    /* flex-shrink: 0; */
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    padding: 8px 0;
    /* flex-shrink: 0; */
  }

  @media screen and (max-width: 375px) {
    width: 100px;
    padding: 8px 0;
    /* flex-shrink: 0; */
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

  @media screen and (max-width: 1440px) {
    font-size: 16px;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 15px;
    margin-bottom: 12px;
  }

  @media screen and (max-width: 960px) {
    font-size: 13px;
    margin-bottom: 9px;
    line-height: 1.3;
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
  font-weight: 500;
  color: var(--light);

  @media screen and (max-width: 1440px) {
    font-size: 24px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 22px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }

  @media screen and (max-width: 960px) {
    font-size: 16px;
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
  const [preventScroll, setPreventScroll] = useState(true);

  // 영상 데이터 가져오기
  const videoData = useMemo(() => {
    if (sectionType === "TEAM_STORE") {
      return getTeamStoreVideo(teamCode);
    } else if (sectionType === "ROOKIE_PARTNER") {
      return getTeamRookieVideo(teamCode);
    }
    return null;
  }, [teamCode, sectionType]);

  // 구단별 상품 데이터 fetch
  const {
    data: allTeamProducts = [],
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["teamProducts", teamCode, sectionType],
    queryFn: async () => {
      if (!teamCode) return [];

      if (sectionType === "TEAM_STORE") {
        const res = await fetch(
          `https://rookiejson.netlify.app/teamJson/${teamCode}.json`
        );
        if (!res.ok) throw new Error("팀 상품 로딩 실패");
        return res.json();
      } else if (sectionType === "ROOKIE_PARTNER") {
        const res = await fetch(
          "https://rookiejson.netlify.app/teamJson/rookie.json"
        );
        if (!res.ok) throw new Error("루키 상품 로딩 실패");
        return res.json();
      }

      return [];
    },
    staleTime: 1000 * 60 * 10,
    enabled:
      !!teamCode &&
      (sectionType === "TEAM_STORE" || sectionType === "ROOKIE_PARTNER"),
  });

  // 표시할 상품들 필터링
  const displayProducts = useMemo(() => {
    if (!teamCode || !allTeamProducts.length) {
      return [];
    }

    let selectedProductIds = [];

    if (sectionType === "TEAM_STORE") {
      selectedProductIds = getTeamVideoProducts(teamCode);
      return selectedProductIds
        .map((id) => allTeamProducts.find((product) => product.id === id))
        .filter(Boolean);
    } else if (sectionType === "ROOKIE_PARTNER") {
      selectedProductIds = getTeamRookieProducts(teamCode);
      return selectedProductIds
        .map((id) => allTeamProducts.find((product) => product.id === id))
        .filter(Boolean);
    }

    return [];
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
    if (sectionType === "TEAM_STORE") {
      navigate(`/store/${teamCode}/${product.id}`);
    } else if (sectionType === "ROOKIE_PARTNER") {
      // ROOKie 상품은 외부 링크로 이동 (detail_link가 있는 경우)
      if (product.detail_link) {
        window.open(product.detail_link, "_blank");
      }
    }
  };

  //data-lenis-prevent 모바일 해제
  useEffect(() => {
    const updateScrollState = () => {
      const isMobile = window.innerWidth <= 768;
      setPreventScroll(!isMobile);
    };

    updateScrollState(); // 최초 실행
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  //상품 가로스크롤 드래그
  const scrollRef = useRef();
  useDragScroll(scrollRef);

  return (
    <Section>
      <Container className="inner">
        <SectionTitle>{title}</SectionTitle>

        <ContentWrapper>
          {/* 좌측 영상 영역 */}
          <VideoSection>
            {videoData ? (
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
                  $thumbnail={getYoutubeThumbnail(videoData.videoId)}
                  onClick={handlePlay}
                >
                  <PlayButton />
                </VideoThumbnail>
              )
            ) : (
              <VideoPlaceholder>영상 준비 중...</VideoPlaceholder>
            )}
          </VideoSection>

          {/* 우측 제품 리스트 영역 */}
          <ProductSection $preventScroll={preventScroll} ref={scrollRef}>
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
                        {sectionType === "ROOKIE_PARTNER"
                          ? product.influencer || "ROOKie"
                          : product.collaboration || "구단 상품"}
                      </InfluencerName>
                      <ProductName>{product.name}</ProductName>
                    </div>
                    <ProductPrice>
                      {sectionType === "ROOKIE_PARTNER"
                        ? product.product_price || product.price
                        : product.price}
                    </ProductPrice>
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
