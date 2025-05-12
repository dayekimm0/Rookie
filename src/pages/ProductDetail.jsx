import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ImageSlider from "../components/ProductDetail/ImageSlider.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// mockup 이미지
import doosanUniform1 from "../images/mockup/doosan_bears_uniform1.jpg";
import doosanUniform2 from "../images/mockup/doosan_bears_uniform2.jpg";
import doosanUniform3 from "../images/mockup/doosan_bears_uniform3.jpg";
import doosanDetail from "../images/mockup/doosan_bears_uniform_details.jpg";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
  faMinus,
  faStar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

// 홍보 배너 이미지
import promotionBanner from "../images/banners/banner-strike_m.png";

// 두산 엠블럼 이미지
import doosanEmblem from "../images/emblem/emblem_doosanB.svg";

// 전체 페이지 컨테이너
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--light);
  color: var(--dark);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 1240px 중앙 정렬
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// 좌측 영역 (700px)
const ProductInfoSection = styled.div`
  width: 700px;
  margin-bottom: 50px;
`;

// 이미지 슬라이더 컨테이너
const SliderContainer = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  position: relative;
  overflow: visible;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  position: relative;
`;

// 슬라이더 이미지
const SliderImage = styled.img`
  max-width: 600px;
  max-height: 600px;
  object-fit: contain; /* 이미지 비율 유지 */
`;

// 이미지 슬라이더와 하단 상세 정보 사이 간격
const SliderMargin = styled.div`
  height: 56px;
`;

// 상세정보, 리뷰, 문의 탭 메뉴
const TabMenu = styled.div`
  width: 700px;
  height: 60px;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  flex: 1;
  height: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "700" : "400")};
  color: ${(props) => (props.active ? "#333" : "#888")};
  border-bottom: ${(props) => (props.active ? "2px solid #333" : "none")};
  transition: all 0.2s;

  &:hover {
    color: #333;
  }
`;

// 상세 콘텐츠 영역
const TabContent = styled.div`
  width: 700px;
  position: relative;
  overflow: visible;
`;

// 콘텐츠 그라데이션 효과 (접혔을 때만 보임)
const ContentGradient = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 90px; // 위치 조정
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  pointer-events: none;
`;

// 홍보 배너
const PromotionBanner = styled.img`
  width: 100%;
  height: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  display: block;
`;

// 상세 이미지
const DetailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

// 접기/펼치기 버튼
const ToggleButton = styled.button`
  width: 700px;
  height: 60px;
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  margin-top: 20px; // 상단 여백 추가
  margin-bottom: 30px; // 하단 여백 추가
  display: flex; /* 텍스트와 아이콘을 가로로 배열 */
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */

  &:hover {
    background: #f0f0f0;
  }

  /* 아이콘 왼쪽 여백 */
  svg {
    margin-left: 8px;
  }
`;

// 우측 영역 구매창 (450*476px)
const PurchaseSection = styled.div`
  width: 450px;
  height: 476px;
  position: sticky;
  top: 230px;
  margin-top: 50px; // 초기 위치
  padding: 0;
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); */
  background: var(--light);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  /* position: relative; */
`;

// 상단 메타 정보 영역 (엠블럼, 공식 라이선스)
const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// 구단 엠블럼
const TeamEmblem = styled.img`
  width: 53px;
  height: 53px;
  margin-right: 3px;
`;

// 공식 라이선스 텍스트
const LicenseText = styled.span`
  font-size: 14px;
  color: var(--gray1);
  display: flex;
  align-items: center;
`;

// 제품 타이틀
const ProductTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 19px;
  width: 100%;
`;

// 제품 가격과 별점 영역 컨테이너
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
`;

// 제품 가격
const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

// 별점 표시
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const StarIcon = styled.span`
  color: #ffd700;
  font-size: 14px;
  margin-right: 4px;
`;

const RatingText = styled.span`
  font-size: 14px;
  color: #333;
`;

// 옵션 선택 영역
const OptionContainer = styled.div`
  position: relative;
  margin-bottom: 22px;
`;

const OptionSelect = styled.select`
  width: 100%;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  appearance: none; /* 기본 Select 화살표 제거 */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  cursor: pointer;

  &::-ms-expand {
    display: none; /* 브라우저에서 기본 화살표 숨김 */
  }
`;

// 커스텀 화살표 아이콘 컨테이너
const SelectArrowContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none; /* 클릭 이벤트 통과 */
`;

// 배송 정보
const ShippingInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 69px;
`;

// 수량 선택 영역
const QuantitySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

// 수량 선택 컨트롤
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px;
  width: 100px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 40px;
  background: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

// 선택된 제품 가격
const SelectedProductPrice = styled.span`
  font-size: 22px;
  font-weight: bold;
`;

// 버튼 영역
const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
`;

const CartButton = styled.button`
  flex: 1;
  height: 60px;
  background: var(--gray1);
  border: none;
  border-radius: 4px;
  color: var(--light);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 5px;

  &:hover {
    background: var(--gray3);
  }
`;

const BuyButton = styled.button`
  flex: 1;
  height: 60px;
  background: var(--main);
  border: none;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 5px;

  &:hover {
    background: #ffc100;
  }
`;

// 연관 상품 영역
const RelatedProductsSection = styled.div`
  width: 100%;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #e5e5e5;
`;

// 리뷰 섹션 관련 스타일
const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-top: 80px; // 토글 버튼과의 간격
  margin-bottom: 60px;
  display: flex;
  align-items: center;
`;

const ReviewCount = styled.span`
  font-size: 22px;
  color: var(--gray8);
  margin-left: 10px;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
  background-color: #fafafa;
  height: 70px;
  border-radius: 8px;
  padding: 10px 0;
`;

const StarRating = styled.div`
  display: flex;
  color: #ffd700;
  font-size: 20px;
  margin-right: 10px;
`;

const ReviewList = styled.div`
  width: 100%;
`;

const ReviewItem = styled.div`
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 0;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewerName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ReviewDate = styled.span`
  font-size: 14px;
  color: #888;
  margin-left: 15px;
`;

const ReviewContent = styled.div`
  margin: 10px 0;
`;

const ReviewText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const ReviewImages = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`;

const ReviewImage = styled.div`
  width: 70px;
  height: 70px;
  background-color: #e0e0e0;
  border-radius: 4px;
`;

// 더보기 버튼
const MoreButton = styled.button`
  width: 100%;
  height: 50px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f8f8;
  }
`;

// 문의하기 섹션 관련 스타일
const InquirySection = styled.div`
  width: 100%;
  margin-top: 80px; // 리뷰 섹션과의 간격
  margin-bottom: 50px; // 하단 여백
`;

const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const InquiryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const InquiryList = styled.div`
  width: 100%;
`;

const InquiryItem = styled.div`
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 10px;
`;

const InquiryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
`;

const InquiryInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: #888;
  margin-top: 10px;
`;

const InquiryAuthor = styled.span`
  margin-right: 15px;
`;

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // 리뷰 모의 데이터
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "sub****",
      date: "2025.04.07",
      rating: 5,
      content: "유니폼 좋아요!",
      images: 4,
    },
    {
      id: 2,
      author: "sub****",
      date: "2025.04.07",
      rating: 5,
      content: "유니폼 좋아요!",
      images: 4,
    },
  ]);

  // 문의 모의 데이터
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      author: "sub****",
      date: "2025.04.07",
      title: "배송 관련 문의 드립니다!",
      status: "답변완료",
      content: "",
      isSecret: true,
    },
  ]);

  // 탭 메뉴에 대한 ref
  const tabMenuRef = useRef(null);

  // 임시 이미지 배열 (추후 JSON에서 가져올 예정)
  const mockupImages = [doosanUniform1, doosanUniform2, doosanUniform3];

  // 접기/펼치기 토글 함수
  const toggleCollapse = () => {
    // 상태 업데이트
    setIsCollapsed(!isCollapsed);
  };

  // 수량 증가
  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  // 수량 감소
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 수량 직접 입력
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  // 수량 입력 필드 포커스를 잃었을 때
  const handleQuantityBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  // 팀 엠블럼 가져오기 (추후 JSON 데이터에 따라 동적으로 처리)
  const getTeamEmblem = (teamName) => {
    // 실제 구현에서는 teamName에 따라 다른 엠블럼 반환
    // 지금은 mockup이므로 두산 엠블럼 고정
    return doosanEmblem;
  };

  // 별점 렌더링 함수
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i < rating ? "#ffd700" : "#e0e0e0"}
        />
      );
    }
    return stars;
  };

  // 제품 데이터 가져오기
  useEffect(() => {
    // 실제 데이터 가져오기 로직으로 대체될 예정
    const fetchProductData = async () => {
      try {
        // 임시 데이터
        const mockProduct = {
          id: "1",
          name: "두산 베어스 마킹셔츠 어센틱 홈 유니폼",
          price: 145000,
          rating: 5.0,
          images: mockupImages,
          team: "Doosan Bears",
          options: [
            { id: "1", name: "옵션", values: ["S", "M", "L", "XL", "2XL"] },
          ],
        };

        setProduct(mockProduct);
        setLoading(false);
      } catch (error) {
        console.error("제품 데이터 가져오기 오류:", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return <Container>로딩 중...</Container>;
  }

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <ProductInfoSection>
          {/* 제품 이미지 슬라이더 */}

          <SliderContainer>
            <ImageContainer>
              <ImageSlider images={product.images} width={500} height={600} />
            </ImageContainer>
          </SliderContainer>

          {/* 슬라이더와 상세 정보 사이의 간격 */}
          <SliderMargin />

          {/* 탭 메뉴 */}
          <TabMenu ref={tabMenuRef}>
            <TabButton
              active={activeTab === "details"}
              onClick={() => setActiveTab("details")}
            >
              상세정보
            </TabButton>
            <TabButton
              active={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
            >
              리뷰
            </TabButton>
            <TabButton
              active={activeTab === "questions"}
              onClick={() => setActiveTab("questions")}
            >
              문의
            </TabButton>
          </TabMenu>

          {/* 탭 콘텐츠 */}
          <TabContent collapsed={isCollapsed}>
            {activeTab === "details" && (
              <div>
                {/* 상세 정보 영역 - 접기/펼치기 기능 적용 */}
                <div
                  style={{
                    maxHeight: isCollapsed ? "900px" : "auto",
                    overflow: isCollapsed ? "hidden" : "visible",
                    position: "relative",
                    transition: "max-height 0.5s ease-in-out",
                  }}
                >
                  {/* 홍보 배너 */}
                  <PromotionBanner src={promotionBanner} alt="프로모션 배너" />

                  {/* 상세 이미지 */}
                  <DetailImage
                    src={doosanDetail}
                    alt="두산 베어스 유니폼 상세 정보"
                  />

                  {/* 그라데이션 효과 (접혔을 때만 보임) */}
                  {isCollapsed && <ContentGradient show={isCollapsed} />}
                </div>

                {/* 접기/펼치기 버튼 */}
                <ToggleButton onClick={toggleCollapse}>
                  {isCollapsed ? "상세정보 열기" : "상세정보 접기"}
                  <FontAwesomeIcon
                    icon={isCollapsed ? faChevronDown : faChevronUp}
                    size="sm"
                    color="#333"
                  />
                </ToggleButton>

                {/* 리뷰 섹션 시작 */}
                <SectionTitle>
                  리뷰 <ReviewCount>{reviews.length}</ReviewCount>
                </SectionTitle>

                <ReviewRating>
                  <StarRating>{renderStars(5)}</StarRating>
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    5.0
                  </span>
                </ReviewRating>

                <ReviewList>
                  {reviews.map((review) => (
                    <ReviewItem key={review.id}>
                      <ReviewHeader>
                        <ReviewerInfo>
                          <ReviewerName>{review.author}</ReviewerName>
                          <ReviewDate>{review.date}</ReviewDate>
                        </ReviewerInfo>
                        <StarRating>{renderStars(review.rating)}</StarRating>
                      </ReviewHeader>
                      <ReviewContent>
                        <ReviewText>{review.content}</ReviewText>
                        <ReviewImages>
                          {[...Array(review.images)].map((_, index) => (
                            <ReviewImage key={index} />
                          ))}
                        </ReviewImages>
                      </ReviewContent>
                    </ReviewItem>
                  ))}
                </ReviewList>

                <MoreButton>리뷰 쓰기</MoreButton>

                {/* 문의하기 섹션 시작 */}
                <InquirySection>
                  <InquiryHeader>
                    <SectionTitle>
                      문의하기 <ReviewCount>{inquiries.length}</ReviewCount>
                    </SectionTitle>
                    <InquiryButton>
                      <FontAwesomeIcon icon={faEdit} />
                      문의하기
                    </InquiryButton>
                  </InquiryHeader>

                  <InquiryList>
                    {inquiries.map((inquiry) => (
                      <InquiryItem key={inquiry.id}>
                        <InquiryTitle>
                          {inquiry.isSecret && (
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              style={{ marginRight: "10px" }}
                            />
                          )}
                          {inquiry.title}
                        </InquiryTitle>
                        <InquiryInfo>
                          <InquiryAuthor>{inquiry.author}</InquiryAuthor>
                          <span>{inquiry.date}</span>
                        </InquiryInfo>
                      </InquiryItem>
                    ))}
                  </InquiryList>
                </InquirySection>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {/* 리뷰 탭 내용 */}
                <SectionTitle>
                  리뷰 <ReviewCount>{reviews.length}</ReviewCount>
                </SectionTitle>

                <ReviewRating>
                  <StarRating>{renderStars(5)}</StarRating>
                  <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                    5.0
                  </span>
                </ReviewRating>

                <ReviewList>
                  {reviews.map((review) => (
                    <ReviewItem key={review.id}>
                      <ReviewHeader>
                        <ReviewerInfo>
                          <ReviewerName>{review.author}</ReviewerName>
                          <ReviewDate>{review.date}</ReviewDate>
                        </ReviewerInfo>
                        <StarRating>{renderStars(review.rating)}</StarRating>
                      </ReviewHeader>
                      <ReviewContent>
                        <ReviewText>{review.content}</ReviewText>
                        <ReviewImages>
                          {[...Array(review.images)].map((_, index) => (
                            <ReviewImage key={index} />
                          ))}
                        </ReviewImages>
                      </ReviewContent>
                    </ReviewItem>
                  ))}
                </ReviewList>

                <MoreButton>리뷰 더보기</MoreButton>
              </div>
            )}

            {activeTab === "questions" && (
              <div>
                {/* 문의 탭 내용 */}
                <InquiryHeader>
                  <SectionTitle>
                    문의하기 <ReviewCount>{inquiries.length}</ReviewCount>
                  </SectionTitle>
                  <InquiryButton>
                    <FontAwesomeIcon icon={faEdit} />
                    문의 드립니다!
                  </InquiryButton>
                </InquiryHeader>

                <InquiryList>
                  {inquiries.map((inquiry) => (
                    <InquiryItem key={inquiry.id}>
                      <InquiryTitle>
                        {inquiry.isSecret && (
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            style={{ marginRight: "10px" }}
                          />
                        )}
                        {inquiry.title}
                      </InquiryTitle>
                      <InquiryInfo>
                        <InquiryAuthor>{inquiry.author}</InquiryAuthor>
                        <span>{inquiry.date}</span>
                      </InquiryInfo>
                    </InquiryItem>
                  ))}
                </InquiryList>
              </div>
            )}
          </TabContent>
        </ProductInfoSection>

        <PurchaseSection>
          {/* 제품 구매 정보와 버튼 */}
          <ProductMeta>
            <TeamEmblem
              src={getTeamEmblem(product.team)}
              alt={`${product.team} 엠블럼`}
            />
            <LicenseText>공식 라이선스 제품</LicenseText>
          </ProductMeta>

          <ProductTitle>{product.name}</ProductTitle>

          <PriceContainer>
            <ProductPrice>{product.price.toLocaleString()} 원</ProductPrice>
            {product.rating && (
              <RatingContainer>
                <StarIcon>★</StarIcon>
                <RatingText>{product.rating}</RatingText>
              </RatingContainer>
            )}
          </PriceContainer>

          {/* 옵션 선택기 */}
          <OptionContainer>
            <OptionSelect>
              <option value=""> - [필수] 옵션 선택 -</option>
              {product.options[0].values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </OptionSelect>
            <SelectArrowContainer>
              <FontAwesomeIcon icon={faChevronDown} color="#666" />
            </SelectArrowContainer>
          </OptionContainer>

          {/* 배송 정보 */}
          <ShippingInfo>배송비 무료 / 주문 시 결제(선결제)</ShippingInfo>

          {/* 수량 선택 */}
          <QuantitySection>
            <QuantityControl>
              <QuantityButton onClick={decreaseQuantity}>
                <FontAwesomeIcon icon={faMinus} size="xs" />
              </QuantityButton>
              <QuantityInput
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleQuantityBlur}
              />
              <QuantityButton onClick={increaseQuantity}>
                <FontAwesomeIcon icon={faPlus} size="xs" />
              </QuantityButton>
            </QuantityControl>
            <SelectedProductPrice>
              {(product.price * quantity).toLocaleString()} 원
            </SelectedProductPrice>
          </QuantitySection>

          {/* 액션 버튼 */}
          <ButtonContainer>
            <CartButton>장바구니</CartButton>
            <BuyButton>바로 구매</BuyButton>
          </ButtonContainer>
        </PurchaseSection>

        <RelatedProductsSection>
          <h3>같은 카테고리의 추천 상품</h3>
          {/* 관련 제품이 들어갈 자리 */}
        </RelatedProductsSection>
      </ContentWrapper>
      <Footer />
    </Container>
  );
};
export default ProductDetail;
