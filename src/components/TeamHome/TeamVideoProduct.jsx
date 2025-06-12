import React from "react";
import styled from "styled-components";

const Section = styled.div`
  background: var(--dark);
  color: var(--light);
  padding: 60px 0;

  @media screen and (max-width: 1024px) {
    padding: 40px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
`;

const Container = styled.div`
  max-width: 1728px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
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

// const PlayButton = styled.div`
//   width: 80px;
//   height: 80px;
//   background: rgba(255, 255, 255, 0.9);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 20px;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background: rgba(255, 255, 255, 1);
//     transform: scale(1.1);
//   }

//   &::after {
//     content: "";
//     width: 0;
//     height: 0;
//     border-left: 25px solid #333;
//     border-top: 15px solid transparent;
//     border-bottom: 15px solid transparent;
//     margin-left: 8px;
//   }

//   @media screen and (max-width: 768px) {
//     width: 60px;
//     height: 60px;

//     &::after {
//       border-left: 18px solid #333;
//       border-top: 12px solid transparent;
//       border-bottom: 12px solid transparent;
//       margin-left: 6px;
//     }
//   }
// `;

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

  // const videoTitle =
  //   sectionType === "TEAM_STORE" ? "행복한 두린이날!" : "스파오 패션 리뷰";

  return (
    <Section>
      <Container>
        <SectionTitle>{title}</SectionTitle>

        <ContentWrapper>
          {/* 좌측 영상 영역 */}
          <VideoSection>
            <VideoPlaceholder>
              {/* <PlayButton />
              <div>{videoTitle}</div>
              <div style={{ fontSize: "14px", opacity: 0.8, marginTop: "8px" }}>
                구단 대표 콘텐츠를 만나보세요
              </div> */}
            </VideoPlaceholder>
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
