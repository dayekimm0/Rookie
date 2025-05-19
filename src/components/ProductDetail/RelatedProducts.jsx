import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// 추천 상품 영역
const RelatedProductsSection = styled.div`
  width: 100%;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--grayE);
`;

// 추천 상품 타이틀
const RelatedProductsTitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px; // 제목과 상품 컨테이너 사이 간격

  @media (max-width: 1024px) {
    font-size: 24px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

// 스와이퍼 슬라이더 스타일
const RelatedProductSlider = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  .swiper-button-next,
  .swiper-button-prev {
    color: #333;
    background: rgba(255, 255, 255, 0.9);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:after {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-slider {
    height: auto;
  }
  /* 첫 페이지에서 이전 버튼 숨기기 */
  .swiper-button-prev.swiper-button-disabled {
    display: none;
  }

  @media (max-width: 1024px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 30px;
      height: 30px;

      &:after {
        font-size: 16px;
      }
    }
  }
`;

// 개별 추천 상품 컨테이너
const RelatedProductItem = styled.div`
  width: 238px;
  height: 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    width: 100%;
    height: 350px;
  }
`;

// 추천 상품 이미지 컨테이너
const RelatedProductImageContainer = styled.div`
  width: 238px;
  height: 317px;
  background-color: var(--light);
  margin-bottom: 27px; // 이미지와 텍스트 사이 gap
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    height: 280px;
    margin-bottom: 15px;
  }
`;

// 추천 상품 이미지
const RelatedProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 추천 상품 정보 컨테이너
const RelatedProductInfo = styled.div`
  width: 238px;
  height: 56px;
  display: flex;
  flex-direction: column;
  text-align: left;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

// 추천 상품 이름
const RelatedProductName = styled.h4`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media (max-width: 1024px) {
    font-size: 15px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// 추천 상품 가격
const RecommendedProductPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--gray3);

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

// 추천 상품 영역 하단 구분선
const BottomDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--grayC);
  margin-top: 58px;
`;

const RelatedProducts = ({ products }) => {
  const swiperRef = useRef(null);

  // Swiper 인스턴스 정리를 위한 useEffect
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 Swiper 인스턴스 정리
      if (swiperRef.current) {
        try {
          if (
            swiperRef.current.destroy &&
            typeof swiperRef.current.destroy === "function"
          ) {
            swiperRef.current.destroy();
          }
        } catch (error) {
          console.warn("Swiper destroy error:", error);
        }
      }
    };
  }, []);

  return (
    <>
      <RelatedProductsSection>
        <RelatedProductsTitle>같은 카테고리의 추천 상품</RelatedProductsTitle>

        <RelatedProductSlider>
          <Swiper
            modules={[Navigation]}
            navigation={true}
            watchSlidesProgress={true}
            className="related-products-slider"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={false}
            loop={false}
            initialSlide={0}
            speed={500}
            wrapperTag="ul"
            slideToClickedSlide={true}
            preventInteractionOnTransition={true}
            a11y={{
              prevSlideMessage: "이전 슬라이드",
              nextSlideMessage: "다음 슬라이드",
            }}
            breakpoints={{
              375: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 23,
              },
            }}
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <RelatedProductItem>
                  <RelatedProductImageContainer>
                    <RelatedProductImage src={item.image} alt={item.name} />
                  </RelatedProductImageContainer>
                  <RelatedProductInfo>
                    <RelatedProductName>{item.name}</RelatedProductName>
                    <RecommendedProductPrice>
                      {item.price.toLocaleString()} 원
                    </RecommendedProductPrice>
                  </RelatedProductInfo>
                </RelatedProductItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </RelatedProductSlider>
      </RelatedProductsSection>
      <BottomDivider />
    </>
  );
};

export default RelatedProducts;
