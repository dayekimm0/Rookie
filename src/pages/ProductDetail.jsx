import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ImageSlider from "../components/ProductDetail/ImageSlider.jsx";
import ReviewModal from "../components/ProductDetail/ReviewModal.jsx";
import InquiryModal from "../components/ProductDetail/InquiryModal.jsx";
import RelatedProducts from "../components/ProductDetail/RelatedProducts.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPlus,
  faMinus,
  faStar,
  faEdit,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

// util에서 엠블럼과 팀 색상 가져오기 함수 import
import { getEmblem, getTeamColor } from "../util";

// mockup 이미지
// import doosanUniform1 from "../images/mockup/doosan_bears_uniform1.jpg";
// import doosanUniform2 from "../images/mockup/doosan_bears_uniform2.jpg";
// import doosanUniform3 from "../images/mockup/doosan_bears_uniform3.jpg";
// import doosanDetail from "../images/mockup/doosan_bears_uniform_details.jpg";

// 홍보 배너 이미지
import promotionBanner from "../images/banners/banner-strike_m.png";

// 두산 엠블럼 이미지
// import doosanEmblem from "../images/emblem/emblem_doosanB.svg";

import "swiper/css";
import "swiper/css/navigation";

// 구단별 JSON URL 매핑
const TEAM_JSON_URLS = {
  nc_dns: "https://rookiejson.netlify.app/teamJson/nc_dns.json",
  ds_bas: "https://rookiejson.netlify.app/teamJson/ds_bas.json",
  ss_lns: "https://rookiejson.netlify.app/teamJson/ss_lns.json",
  lg_twins: "https://rookiejson.netlify.app/teamJson/lg_twins.json",
  kia_tgs: "https://rookiejson.netlify.app/teamJson/kia_tgs.json",
  lt_gnt: "https://rookiejson.netlify.app/teamJson/lt_gnt.json",
  kt_wiz: "https://rookiejson.netlify.app/teamJson/kt_wiz.json",
  hw_egs: "https://rookiejson.netlify.app/teamJson/hw_egs.json",
  kw_hrs: "https://rookiejson.netlify.app/teamJson/kw_hrs.json",
  ssg_lds: "https://rookiejson.netlify.app/teamJson/ssg_lds.json",
  kbo: "https://rookiejson.netlify.app/teamJson/kbo.json",
};

// 카트 이동 주스턴트
import useCartStore from "../stores/cartStore";

// 임시 데이터 (실제 구현 시 API 응답으로 대체)
// const mockRelatedProducts = [
//   {
//     id: "2",
//     name: "LG트윈스 클래식 핑크 유니폼",
//     price: 99000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "3",
//     name: "LG트윈스 클래식 그린 유니폼",
//     price: 99000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "4",
//     name: "LG트윈스 빈티지 이지 티셔츠",
//     price: 33000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "5",
//     name: "LG트윈스 애플캐릭터 티셔츠",
//     price: 33000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "6",
//     name: "LG트윈스 클래식 원정 유니폼",
//     price: 99000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "7",
//     name: "LG트윈스 스페셜 에디션 유니폼",
//     price: 129000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "8",
//     name: "LG트윈스 팬 응원 티셔츠",
//     price: 29000,
//     image: null,
//     team: "LG Twins",
//   },
//   {
//     id: "9",
//     name: "LG트윈스 2025 시즌 유니폼",
//     price: 109000,
//     image: null,
//     team: "LG Twins",
//   },
// ];

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

  @media (max-width: 1200px) {
    max-width: 1050px;
    padding: 25px 20px;
    gap: 10px;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
    padding: 20px 15px;
    gap: 0;
  }

  @media (max-width: 375px) {
    padding: 15px 12px;
    margin: 0;
  }
`;

// 좌측 영역 (700px)
const ProductInfoSection = styled.div`
  width: 700px;
  margin-bottom: 50px;

  @media (max-width: 1200px) {
    width: 58%;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
  }

  @media (max-width: 375px) {
    margin-bottom: 20px;
  }
`;

// 이미지 슬라이더 컨테이너
const SliderContainer = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: var(--grayC); */
  position: relative;
  overflow: visible;

  @media (max-width: 1200px) {
    width: 600px;
    height: 600px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 400px;
  }

  @media (max-width: 375px) {
    min-height: 375px;
    aspect-ratio: 1/1;
  }
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

  @media (max-width: 1200px) {
    width: 520px;
    height: 520px;
  }

  @media (max-width: 1024px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 375px) {
    width: 95%;
    min-height: 350px;
  }
`;

// 임시 이미지 플레이스홀더
const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px dashed #ccc;

  &::after {
    content: "제품 이미지";
    color: #888;
    font-size: 18px;
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    &::after {
      font-size: 16px;
    }
  }

  @media (max-width: 375px) {
    &::after {
      font-size: 14px;
    }
  }
`;

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

// 이미지 슬라이더와 하단 상세 정보 사이 간격
const SliderMargin = styled.div`
  height: 56px;

  @media (max-width: 1024px) {
    height: 40px;
  }

  @media (max-width: 375px) {
    height: 30px;
  }
`;

// 상세정보, 리뷰, 문의 탭 메뉴
const TabMenu = styled.div`
  width: 700px;
  height: 60px;
  display: flex;
  border-bottom: 1px solid var(--grayC);
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    width: 600px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 375px) {
    height: 50px;
    margin-bottom: 15px;
  }
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
    color: var(--gray3);
  }

  @media (max-width: 375px) {
    height: 50px;
    font-size: 14px;
  }
`;

// 상세 콘텐츠 영역
const TabContent = styled.div`
  width: 700px;
  position: relative;
  overflow: visible;

  @media (max-width: 1200px) {
    width: 600px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

// 상세 정보 컨테이너를 감싸는 래퍼 추가
const DetailSectionWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-bottom: 30px;
  }
`;

// 상세 이미지 래퍼 추가
const DetailImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 1000px;

  @media (max-width: 1200px) {
    min-height: 800px;
  }

  @media (max-width: 1024px) {
    min-height: 600px;
  }

  @media (max-width: 375px) {
    min-height: 400px;
  }
`;

// 상세 콘텐츠 영역 스타일 수정
const DetailContent = styled.div`
  width: 100%;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  /* 최소 높이 지정으로 전체 높이 보장 */
  min-height: 800px;

  @media (max-width: 1200px) {
    min-height: 700px;
  }

  @media (max-width: 1024px) {
    min-height: 600px;
  }

  @media (max-width: 375px) {
    min-height: 500px;
  }
`;

// ImagePlaceholder를 상세정보용으로 별도 생성
const DetailImagePlaceholder = styled.div`
  width: 100%;
  /* 명확한 높이 지정 */
  height: 500px;
  background-color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--light);

  &::after {
    content: "";
    color: var(--light);
    font-size: 18px;
    font-weight: 500;
  }

  @media (max-width: 1200px) {
    height: 450px;
    &::after {
      font-size: 17px;
    }
  }

  @media (max-width: 1024px) {
    height: 400px;
    &::after {
      font-size: 16px;
    }
  }

  @media (max-width: 375px) {
    height: 300px;
    &::after {
      font-size: 14px;
    }
  }
`;

// 콘텐츠 그라데이션 효과 (접혔을 때만 보임)
const ContentGradient = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  pointer-events: none;

  @media (max-width: 375px) {
    height: 100px;
  }
`;

// 링크로 감싸진 배너 이미지를 위한 styled-component 생성
const PromotionBannerLink = styled.a`
  display: block;
  width: 100%;
  cursor: pointer;
`;

// 홍보 배너
const PromotionBanner = styled.img`
  width: 100%;
  height: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  display: block;

  @media (max-width: 1024px) {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    margin-top: 30px;
    margin-bottom: 30px;
  }
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
  background: var(--grayFA);
  border: 1px solid var(--grayE);
  border-radius: 4px;
  color: var(--gray3);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 8px;
  }

  @media (max-width: 1200px) {
    width: 600px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 55px;
    margin-bottom: 25px;
  }

  @media (max-width: 375px) {
    height: 50px;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 20px;
  }
`;
const Sentinel = styled.div`
  height: 1px;
`;
const StickyBox = styled.div`
  width: 100%;
  ${({ isFixed }) =>
    isFixed
      ? `
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 90;
    background: #fff;
    padding: 44px 16px 15px;
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  `
      : `
    position: static;
  `}
`;

// 우측 영역 구매창 (450*476px)
const PurchaseSection = styled.div`
  width: 450px;
  height: 476px;
  position: sticky;
  top: 200px;
  margin-top: 30px;
  background: var(--light);
  display: flex;
  flex-direction: column;
  margin-bottom: 85px;
  display: ${({ isContent }) => isContent && "none"};

  @media (max-width: 1200px) {
    width: 300px;
    top: 200px;
    margin-top: 20px;
    margin-bottom: 100px;
  }
  @media (max-width: 1024px) {
    top: 20px;
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    top: 0;
    margin-top: 0;
    margin-bottom: 10px;
    display: ${({ isContent }) => (isContent ? "block" : "none")};
  }

  @media (max-width: 375px) {
    border-radius: 4px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
`;

// 구매 섹션 내부 패딩 조정
const PurchaseSectionContent = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 80px;

  @media (max-width: 1200px) {
    padding: 20px;
    padding-bottom: 80px;
  }

  @media (max-width: 1024px) {
    padding: 20px;
    padding-bottom: 80px;
  }

  @media (max-width: 375px) {
    padding: 16px;
    padding-bottom: 70px;
  }
`;

// 상단 메타 정보 영역 (엠블럼, 공식 라이선스)
const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left: -20;

  @media (max-width: 375px) {
    margin-bottom: 16px;
  }
`;

// 엠블럼 플레이스홀더
const EmblemContainer = styled.div`
  width: 53px;
  height: 53px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
    scale: ${(props) => (props.isTeam6 ? "80%" : "100%")};
  }

  @media (max-width: 375px) {
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }
`;

// 공식 라이선스 텍스트
const LicenseText = styled.span`
  font-size: 14px;
  color: var(--gray1);
  display: flex;
  margin-left: 0px;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

// 제품 타이틀
const ProductTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 19px;
  width: 100%;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 20px;
    margin-bottom: 15px;
  }

  @media (max-width: 375px) {
    font-size: 18px;
    margin-bottom: 12px;
    line-height: 1.4;
  }
`;

// 제품 가격과 별점 영역 컨테이너
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 375px) {
    margin-bottom: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

// 제품 가격
const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 18px;
  }
`;

// 별점 표시
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;

  @media (max-width: 375px) {
    margin-left: 0;
  }
`;

const StarIcon = styled.span`
  color: var(--main);
  font-size: 14px;
  margin-right: 4px;

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const RatingText = styled.span`
  font-size: 14px;
  color: var(--gray3);

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

// 옵션 선택 영역
const OptionContainer = styled.div`
  position: relative;
  margin-bottom: 22px;

  @media (max-width: 375px) {
    margin-bottom: 18px;
  }
`;

const OptionSelect = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 1024px) {
    height: 40px;
    font-size: 14px;
  }

  @media (max-width: 375px) {
    height: 50px;
    font-size: 14px;
    padding: 0 12px;
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
  pointer-events: none;

  @media (max-width: 375px) {
    right: 8px;
    width: 20px;
    height: 20px;
  }
`;

// 드롭다운 메뉴 컨테이너
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

// 드롭다운 메뉴 아이템
const DropdownItem = styled.div`
  padding: 12px 15px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 15px;

  &:hover {
    background-color: var(--grayF5);
  }

  // 선택된 아이템 스타일
  ${(props) =>
    props.isSelected &&
    `
    background-color: var(--grayF5);
    font-weight: 500;
  `}

  @media (max-width: 375px) {
    padding: 10px 12px;
    font-size: 14px;
  }
`;

// 배송 정보
const ShippingInfo = styled.div`
  font-size: 14px;
  color: var(--gray6);
  margin-bottom: 70px;

  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }

  @media (max-width: 375px) {
    font-size: 12px;
    margin-bottom: 40px;
    line-height: 1.4;
  }
`;

// 수량 선택 영역
const QuantitySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    margin-bottom: 25px;
  }

  @media (max-width: 375px) {
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
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

  @media (max-width: 375px) {
    height: 36px;
    width: 90px;
  }
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
    background: var(--grayF5);
  }

  @media (max-width: 375px) {
    width: 26px;
    height: 36px;
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

  @media (max-width: 375px) {
    width: 38px;
    font-size: 14px;
  }
`;

// 선택된 제품 가격f
const SelectedProductPrice = styled.span`
  font-size: 22px;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 375px) {
    font-size: 18px;
  }
`;

// 버튼 영역
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  gap: 10px;
  margin-top: auto;

  @media (max-width: 1024px) {
    height: 40px;
  }
  @media (max-width: 375px) {
    height: 50px;
    gap: 8px;
  }
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

  &:hover {
    background: var(--gray3);
  }

  @media (max-width: 1024px) {
    height: 40px;
  }

  @media (max-width: 375px) {
    font-size: 14px;
    height: 50px;
  }
`;

const BuyButton = styled.button`
  flex: 1;
  height: 60px;
  background: var(--main);
  border: none;
  border-radius: 4px;
  color: var(--gray3);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--main);
  }
  @media (max-width: 1024px) {
    height: 40px;
  }
  @media (max-width: 375px) {
    font-size: 14px;
    height: 50px;
  }
`;

// 리뷰 섹션 스타일
const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 22px;
    margin-top: 60px;
    margin-bottom: 20px;
  }

  @media (max-width: 375px) {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 16px;
  }
`;

const SubSectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  margin-top: 49px;
  margin-bottom: 17px;

  @media (max-width: 1024px) {
    font-size: 16px;
    margin-top: 35px;
    margin-bottom: 15px;
  }

  @media (max-width: 375px) {
    font-size: 15px;
    margin-top: 30px;
    margin-bottom: 12px;
  }
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--grayC);
`;

const PhotoReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 13px;
  margin-bottom: 18px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 15px;
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 15px;
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const PhotoReviewItem = styled.div`
  width: 106px;
  height: 106px;
  background-color: var(--grayE);
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }

  @media (max-width: 375px) {
    border-radius: 3px;
  }
`;

const ReviewCount = styled.span`
  font-size: 22px;
  color: var(--gray8);
  margin-left: 10px;

  @media (max-width: 1024px) {
    font-size: 20px;
    margin-left: 8px;
  }

  @media (max-width: 375px) {
    font-size: 18px;
    margin-left: 6px;
  }
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
  background-color: var(--grayF5);
  height: 70px;
  border-radius: 8px;
  padding: 10px 0;

  @media (max-width: 1024px) {
    height: 60px;
    margin-bottom: 20px;
  }

  @media (max-width: 375px) {
    height: 50px;
    margin-bottom: 16px;
    border-radius: 6px;
  }
`;

const StarRating = styled.div`
  display: flex;
  color: var(--main);
  font-size: 16px;
  margin-right: 10px;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 14px;
    margin-right: 8px;
  }

  @media (max-width: 375px) {
    font-size: 14px;
    margin-right: 6px;
  }
`;

const ReviewList = styled.div`
  width: 100%;
`;

const ReviewItem = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--grayE);
  padding: 20px 0;

  @media (max-width: 1024px) {
    padding: 16px 0;
  }

  @media (max-width: 375px) {
    padding: 12px 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    margin-bottom: 8px;
  }

  @media (max-width: 375px) {
    margin-bottom: 6px;
  }
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  justify-content: flex-start;

  @media (max-width: 375px) {
    margin-bottom: 6px;
  }
`;

const ReviewerNameAndRating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 375px) {
    gap: 8px;
  }
`;

const ReviewerName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--gray3);

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const ReviewDate = styled.span`
  font-size: 14px;
  color: var(--gray8);

  @media (max-width: 375px) {
    font-size: 12px;
  }
`;

const ReviewContent = styled.div`
  margin: 20px 0 30px;

  @media (max-width: 1024px) {
    margin: 16px 0 24px;
  }

  @media (max-width: 375px) {
    margin: 12px 0 20px;
  }
`;

const ReviewText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    font-size: 15px;
    margin-bottom: 12px;
  }

  @media (max-width: 375px) {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

const ReviewImages = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;

  @media (max-width: 1024px) {
    gap: 8px;
    flex-wrap: wrap;
  }

  @media (max-width: 375px) {
    gap: 6px;
  }
`;

const ReviewImage = styled.div`
  width: 70px;
  height: 70px;
  background-color: var(--grayE);
  border-radius: 4px;

  @media (max-width: 375px) {
    width: 60px;
    height: 60px;
    border-radius: 3px;
  }
`;

// 리뷰 쓰기 버튼
const MoreButton = styled.button`
  padding: 15px 20px;
  background: var(--light);
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  height: 50px;
  margin-top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--grayF5);
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 1024px) {
    margin-top: 40px;
    height: 45px;
  }

  @media (max-width: 375px) {
    margin-top: 30px;
    height: 42px;
    font-size: 14px;
    padding: 12px 16px;

    svg {
      margin-right: 6px;
    }
  }
`;

// 문의하기 섹션 관련 스타일
const InquirySection = styled.div`
  width: 100%;
  margin-bottom: 15px;

  @media (max-width: 375px) {
    margin-bottom: 10px;
  }
`;

const InquiryHeader = styled.div`
  display: flex;
  align-items: center;
`;

const InquiryButton = styled.button`
  padding: 20px 20px;
  background: var(--light);
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  height: 50px;
  margin-top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--grayF5);
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 1024px) {
    margin-top: 40px;
    height: 45px;
  }

  @media (max-width: 375px) {
    margin-top: 30px;
    height: 42px;
    font-size: 14px;
    padding: 12px 16px;

    svg {
      margin-right: 6px;
    }
  }
`;

// 추천 상품 컨테이너 그리드
const RelatedProductsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 420px;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }

  @media (max-width: 375px) {
    gap: 16px;
  }
`;

const InquiryList = styled.div`
  width: 100%;
`;

const InquiryItem = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--grayD);
  padding: 20px 0;

  @media (max-width: 1024px) {
    padding: 16px 0;
  }

  @media (max-width: 375px) {
    padding: 12px 0;
  }
`;

const InquiryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 375px) {
    font-size: 14px;
  }
`;

const InquiryInfo = styled.div`
  display: flex;
  font-size: 14px;
  color: var(--gray8);
  margin-top: 10px;
  margin-bottom: 10px;

  @media (max-width: 375px) {
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const InquiryAuthor = styled.span`
  margin-right: 15px;

  @media (max-width: 375px) {
    margin-right: 12px;
  }
`;

// 관련 상품 섹션 스타일
const RelatedProductsSection = styled.div`
  width: 100%;
  margin-top: 10px;

  @media (max-width: 1024px) {
    margin-top: 10px;
  }

  @media (max-width: 375px) {
    margin-top: 5px;
    padding: 0 4px;
  }
`;

// 구단 코드를 ID로 변환하는 함수 추가
const getTeamIdFromCode = (teamCode) => {
  switch (teamCode) {
    case "kbo":
      return "0";
    case "kia_tgs":
      return "1";
    case "ss_lns":
      return "2";
    case "lg_twins":
      return "3";
    case "ds_bas":
      return "4";
    case "kt_wiz":
      return "5";
    case "ssg_lds":
      return "6";
    case "lt_gnt":
      return "7";
    case "hw_egs":
      return "8";
    case "nc_dns":
      return "9";
    case "kw_hrs":
      return "10";
    default:
      return "0";
  }
};

// 상태 변수들
const ProductDetail = () => {
  const { teamCode, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [isOptionDropdownOpen, setIsOptionDropdownOpen] = useState(false);

  // 카트페이지 이동
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parsePrice(product.price),
      images: product.detail?.detail_images || [],
      team: product.team,
      option: product.detail?.options || [],
      category: product.category,
      thumbnail: product.thumbnail,
      quantity,
    });

    console.log("장바구니:", product); // 주의: 여기선 바로 안 보일 수 있음
    setTimeout(() => {
      console.log("업데이트된 장바구니:", useCartStore.getState().product);
    }, 100);
  };

  // contentRef 및 contentHeight 상태 추가
  const contentRef = useRef(null);
  const stickyRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("10000px"); //

  // 여기에 옵션 컨테이너 ref 추가
  const optionContainerRef1 = useRef(null);
  const optionContainerRef2 = useRef(null);

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

  // 팀 이름 → 코드 매핑 함수
  // const getTeamCode = teamName => {
  //   if (!teamName) return null;

  //   // URL 디코딩을 적용 (특수문자 처리)
  //   const decodedTeamName = decodeURIComponent(teamName);

  //   const teamCodeMap = {
  //     두산베어스: "ds_bas",
  //     엔씨다이노스: "nc_dns",
  //     삼성라이온즈: "ss_lns",
  //     LG트윈스: "lg_twins",
  //     KIA타이거즈: "kia_tgs",
  //     롯데자이언츠: "lt_gnt",
  //     KT위즈: "kt_wiz",
  //     한화이글스: "hw_egs",
  //     키움히어로즈: "kw_hrs",
  //     SSG랜더스: "ssg_lds",
  //     KBO: "kbo",
  //   };

  //   return teamCodeMap[teamName] || null;
  // };

  const fetchProductData = async () => {
    setLoading(true);
    try {
      setError(null);

      // 모든 구단의 데이터를 가져와서 해당 ID의 상품 찾기
      // let selectedProduct = null;
      // let allProducts = [];

      // 모든 구단 JSON을 순차적으로 검색
      // for (const [teamName, url] of Object.entries(TEAM_JSON_URLS)) {

      const url = TEAM_JSON_URLS[teamCode];
      const response = await axios.get(url);
      const allProducts = response.data;

      // const allProducts = teamProducts;

      // 해당 ID의 상품이 있는지 확인
      const selectedProduct = allProducts.find(
        (product) => product.id === parseInt(id)
      );
      // if (!selectedProduct) {
      //   setError("해당 상품을 찾을 수 없습니다.");
      //   setLoading(false);
      //   return;
      // }

      // 제품 데이터 설정
      setProduct({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: parsePrice(selectedProduct.price),
        images: selectedProduct.detail?.detail_images || [],
        team: selectedProduct.team,
        options: selectedProduct.detail?.options || [],
        category: selectedProduct.category,
        thumbnail: selectedProduct.thumbnail,
      });

      // console.warn(`${teamCode} 데이터 로드 실패:`, error);
      // continue; // 실패해도 다음 구단 계속 시도

      // }

      // 같은 카테고리의 추천 상품 설정 (현재 상품과 같은 팀의 다른 상품)
      const sameTeamProducts = allProducts.filter(
        (product) =>
          product.team === selectedProduct.team &&
          product.id !== selectedProduct.id
      );

      const filteredProducts = sameTeamProducts.filter(
        (product) => product.category === selectedProduct.category
      );

      const relatedProductsData = filteredProducts
        .slice(0, 8)
        .map((product) => ({
          id: product.id,
          name: product.name,
          price: parsePrice(product.price),
          image: product.thumbnail,
          team: product.team,
        }));

      setRelatedProducts(relatedProductsData);
      setLoading(false);
    } catch (error) {
      console.error("제품 데이터 가져오기 오류:", error);
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  // 제품 데이터 가져오기
  useEffect(() => {
    if (id === undefined) return;
    fetchProductData();
  }, [id]);

  // 가격 문자열을 숫자로 변환하는 헬퍼 함수
  const parsePrice = (price) =>
    typeof price === "number"
      ? price
      : parseInt(price.toString().replace(/[^\d]/g, ""), 10);

  // 토글 시 높이 계산을 위한 useEffect 추가
  useEffect(() => {
    if (contentRef.current) {
      // isCollapsed가 false일 때(펼침 상태) 실제 컨텐츠 높이 계산
      if (!isCollapsed) {
        const calculatedHeight = Math.max(
          contentRef.current.scrollHeight,
          window.innerWidth <= 375 ? 500 : window.innerWidth <= 1200 ? 700 : 800
        );
        // scrollHeight는 오버플로우된 부분을 포함한 전체 높이
        setContentHeight(`${calculatedHeight}px`);
      }
    }
  }, [isCollapsed]); // isCollapsed가 변경될 때마다 실행

  // 드롭다운 외부 클릭 감지를 위한 useEffect 추가
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 두 컨테이너 모두 확인
      const isOutside1 =
        optionContainerRef1.current &&
        !optionContainerRef1.current.contains(event.target);
      const isOutside2 =
        optionContainerRef2.current &&
        !optionContainerRef2.current.contains(event.target);

      // 두 컨테이너 모두 외부를 클릭했고 드롭다운이 열려있으면 닫기
      if (isOutside1 && isOutside2 && isOptionDropdownOpen) {
        setIsOptionDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionDropdownOpen]);

  // 리뷰 모달 열기
  const openReviewModal = () => {
    setShowReviewModal(true);
  };

  // 리뷰 모달 닫기
  const closeReviewModal = () => {
    setShowReviewModal(false);
  };

  // 리뷰 등록 처리
  const handleReviewSubmit = (reviewData) => {
    // 새 리뷰 객체 생성
    const newReview = {
      id: reviews.length + 1,
      author: "user****", // 실제 로그인 사용자 ID를 마스킹해서 사용할 예정
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      rating: reviewData.rating,
      content: reviewData.content,
      images: reviewData.images.length,
    };

    // 리뷰 목록에 추가
    setReviews([newReview, ...reviews]);

    // 모달 닫기
    closeReviewModal();
  };

  // 문의 모달 열기
  const openInquiryModal = () => {
    setShowInquiryModal(true);
  };

  // 문의 모달 닫기
  const closeInquiryModal = () => {
    setShowInquiryModal(false);
  };

  // 문의 등록 처리
  const handleInquirySubmit = (inquiryData) => {
    // 새 문의 객체 생성
    const newInquiry = {
      id: inquiries.length + 1,
      author: "user****", // 실제 로그인 사용자 ID를 마스킹해서 사용할 예정
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      title: inquiryData.title,
      content: inquiryData.content,
      status: "답변대기",
      isSecret: true, // 기본값으로 비밀글 설정
    };

    // 문의 목록에 추가
    setInquiries([newInquiry, ...inquiries]);

    // 모달 닫기
    closeInquiryModal();
  };

  // 탭 메뉴에 대한 ref
  const tabMenuRef = useRef(null);

  // 드롭다운 토글 함수
  const toggleOptionDropdown = () => {
    setIsOptionDropdownOpen(!isOptionDropdownOpen);
  };

  // 옵션 선택 함수
  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOptionDropdownOpen(false);
  };

  // 접기/펼치기 토글 함수
  const toggleCollapse = () => {
    if (isCollapsed && contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
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

  const productInfoRef = useRef(null);
  const purchaseSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;

      const scrollY = window.scrollY;
      const elementTop = stickyRef.current.offsetTop;
      const elementHeight = stickyRef.current.offsetHeight;

      const triggerPoint = elementTop + elementHeight;

      if (scrollY > triggerPoint) {
        if (!isFixed) setIsFixed(true);
      } else {
        if (isFixed) setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

  // 로딩 중일 때
  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            로딩 중...
          </div>
        </ContentWrapper>
      </Container>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorMessage>
            <div>{error}</div>
            <div style={{ marginTop: "20px", fontSize: "14px" }}>
              다시 시도해주세요.
            </div>
          </ErrorMessage>
        </ContentWrapper>
      </Container>
    );
  }

  // 제품 데이터가 없을 때
  if (!product) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorMessage>제품 정보를 찾을 수 없습니다.</ErrorMessage>
        </ContentWrapper>
      </Container>
    );
  }
  console.log("product", product);
  return (
    <Container>
      <ContentWrapper>
        <ProductInfoSection ref={productInfoRef}>
          {/* 제품 이미지 슬라이더 */}
          <SliderContainer>
            <ImageContainer>
              {product.thumbnail ? (
                <ImageSlider
                  images={[product.thumbnail]}
                  width={500}
                  height={600}
                />
              ) : (
                <ImagePlaceholder />
              )}
            </ImageContainer>
          </SliderContainer>
          <PurchaseSection ref={purchaseSectionRef} isContent>
            <PurchaseSectionContent>
              {/* 제품 구매 정보와 버튼 */}
              <ProductMeta>
                <EmblemContainer
                  bgColor={getTeamColor(getTeamIdFromCode(teamCode))}
                  isTeam6={getTeamIdFromCode(teamCode) === "6"}
                >
                  {teamCode ? (
                    <img
                      src={getEmblem(getTeamIdFromCode(teamCode))}
                      alt={`${teamCode} 엠블럼`}
                    />
                  ) : (
                    <div
                      style={{
                        color: "#888",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                    >
                      로고
                    </div>
                  )}
                </EmblemContainer>
                <LicenseText>공식 라이선스 제품</LicenseText>
              </ProductMeta>

              <ProductTitle>{product?.name || "제품명"}</ProductTitle>

              <PriceContainer>
                <ProductPrice>
                  {product?.price ? product.price.toLocaleString() : "0"} 원
                </ProductPrice>
                <RatingContainer>
                  <StarIcon>★</StarIcon>
                  <RatingText>5.0</RatingText>
                </RatingContainer>
              </PriceContainer>
              {/* 옵션 선택기 */}
              {product?.options.length ? (
                <OptionContainer ref={optionContainerRef1}>
                  <OptionSelect onClick={toggleOptionDropdown}>
                    {selectedOption || "- [필수] 옵션 선택 -"}
                  </OptionSelect>
                  <SelectArrowContainer>
                    <FontAwesomeIcon
                      icon={isOptionDropdownOpen ? faChevronUp : faChevronDown}
                      color="#666"
                    />
                  </SelectArrowContainer>

                  <DropdownMenu isOpen={isOptionDropdownOpen}>
                    {product?.options?.map((option, index) => (
                      <DropdownItem
                        key={index}
                        isSelected={selectedOption === option}
                        onClick={() => selectOption(option)}
                      >
                        {option}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </OptionContainer>
              ) : null}
              {/* 배송 정보 */}
              <ShippingInfo>배송비 무료 / 주문 시 결제(선결제)</ShippingInfo>
              <StickyBox isFixed={isFixed}>
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
                    {product?.price
                      ? (product.price * quantity).toLocaleString()
                      : "0"}{" "}
                    원
                  </SelectedProductPrice>
                </QuantitySection>

                {/* 액션 버튼 */}
                <ButtonContainer>
                  <CartButton>장바구니</CartButton>
                  <BuyButton>바로 구매</BuyButton>
                </ButtonContainer>
              </StickyBox>
            </PurchaseSectionContent>
          </PurchaseSection>

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
          <Sentinel ref={stickyRef} />

          {/* 탭 콘텐츠 */}
          <TabContent>
            {activeTab === "details" && (
              <div>
                {/* 상세 정보 영역 - 접기/펼치기 기능 적용 */}
                <DetailSectionWrapper>
                  <DetailContent
                    ref={contentRef}
                    style={{
                      maxHeight: isCollapsed ? "900px" : contentHeight,
                    }}
                  >
                    {/* 홍보 배너 */}
                    <PromotionBannerLink href="/event">
                      <PromotionBanner
                        src={promotionBanner}
                        alt="프로모션 배너"
                      />
                    </PromotionBannerLink>

                    {/* 상세 이미지 */}
                    <DetailImageWrapper>
                      {product.images.length ? (
                        product.images?.map((item) => (
                          <DetailImage src={item} key={item} />
                        ))
                      ) : (
                        <DetailImagePlaceholder />
                      )}
                    </DetailImageWrapper>

                    {/* 그라데이션 효과 (접혔을 때만 보임) */}
                    {isCollapsed && <ContentGradient show={isCollapsed} />}
                  </DetailContent>

                  {/* 접기/펼치기 버튼 */}
                  <ToggleButton onClick={toggleCollapse}>
                    {isCollapsed ? "상세정보 열기" : "상세정보 접기"}
                    <FontAwesomeIcon
                      icon={isCollapsed ? faChevronDown : faChevronUp}
                      size="sm"
                      color="#333"
                    />
                  </ToggleButton>
                </DetailSectionWrapper>

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

                {/* 사진 리뷰 섹션 추가 */}
                <SubSectionTitle>사진 리뷰 전체보기</SubSectionTitle>
                <PhotoReviewGrid>
                  {[...Array(6)].map((_, index) => (
                    <PhotoReviewItem key={index} />
                  ))}
                </PhotoReviewGrid>
                <HorizontalDivider />

                <ReviewList>
                  {reviews.map((review) => (
                    <ReviewItem key={review.id}>
                      <ReviewHeader>
                        <ReviewerInfo>
                          <ReviewerNameAndRating>
                            <ReviewerName>{review.author}</ReviewerName>
                            <StarRating>
                              {renderStars(review.rating)}
                            </StarRating>
                          </ReviewerNameAndRating>
                        </ReviewerInfo>
                        <ReviewDate>{review.date}</ReviewDate>
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

                <MoreButton onClick={openReviewModal}>
                  <FontAwesomeIcon icon={faEdit} />
                  리뷰 쓰기
                </MoreButton>

                {/* 문의하기 섹션 시작 */}
                <InquirySection>
                  <InquiryHeader>
                    <SectionTitle>
                      문의하기 <ReviewCount>{inquiries.length}</ReviewCount>
                    </SectionTitle>
                  </InquiryHeader>

                  {/* 문의하기 타이틀 아래 회색선 */}
                  <div>
                    <HorizontalDivider />
                  </div>

                  <InquiryList>
                    {inquiries.map((inquiry) => (
                      <InquiryItem key={inquiry.id}>
                        <InquiryTitle>
                          {inquiry.isSecret && (
                            <FontAwesomeIcon
                              icon={faLock}
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

                  <InquiryButton onClick={openInquiryModal}>
                    <FontAwesomeIcon icon={faEdit} />
                    문의하기
                  </InquiryButton>
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

                {/* 사진 리뷰 섹션 추가 */}
                <SubSectionTitle>사진 리뷰 전체보기</SubSectionTitle>
                <PhotoReviewGrid>
                  {[...Array(6)].map((_, index) => (
                    <PhotoReviewItem key={index} />
                  ))}
                </PhotoReviewGrid>
                <HorizontalDivider />

                <ReviewList>
                  {reviews.map((review) => (
                    <ReviewItem key={review.id}>
                      <ReviewHeader>
                        <ReviewerInfo>
                          <ReviewerNameAndRating>
                            <ReviewerName>{review.author}</ReviewerName>
                            <StarRating>
                              {renderStars(review.rating)}
                            </StarRating>
                          </ReviewerNameAndRating>
                        </ReviewerInfo>
                        <ReviewDate>{review.date}</ReviewDate>
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

                <MoreButton onClick={openReviewModal}>
                  <FontAwesomeIcon icon={faEdit} />
                  리뷰 쓰기
                </MoreButton>
              </div>
            )}

            {activeTab === "questions" && (
              <div>
                {/* 문의 탭 내용 */}
                <InquiryHeader>
                  <SectionTitle>
                    문의하기 <ReviewCount>{inquiries.length}</ReviewCount>
                  </SectionTitle>
                </InquiryHeader>

                <div>
                  <HorizontalDivider />
                </div>

                <InquiryList>
                  {inquiries.map((inquiry) => (
                    <InquiryItem key={inquiry.id}>
                      <InquiryTitle>
                        {inquiry.isSecret && (
                          <FontAwesomeIcon
                            icon={faLock}
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

                <InquiryButton onClick={openInquiryModal}>
                  <FontAwesomeIcon icon={faEdit} />
                  문의하기
                </InquiryButton>
              </div>
            )}
          </TabContent>
        </ProductInfoSection>

        <PurchaseSection ref={purchaseSectionRef}>
          <PurchaseSectionContent>
            {/* 제품 구매 정보와 버튼 */}
            <ProductMeta>
              <EmblemContainer
                bgColor={getTeamColor(getTeamIdFromCode(teamCode))}
                isTeam6={getTeamIdFromCode(teamCode) === "6"}
              >
                {teamCode ? (
                  <img
                    src={getEmblem(getTeamIdFromCode(teamCode))}
                    alt={`${teamCode} 엠블럼`}
                  />
                ) : (
                  <div
                    style={{
                      color: "#888",
                      fontSize: "10px",
                      fontWeight: "500",
                    }}
                  >
                    로고
                  </div>
                )}
              </EmblemContainer>
              <LicenseText>공식 라이선스 제품</LicenseText>
            </ProductMeta>

            <ProductTitle>{product?.name || "제품명"}</ProductTitle>

            <PriceContainer>
              <ProductPrice>
                {product?.price ? product.price.toLocaleString() : "0"} 원
              </ProductPrice>
              <RatingContainer>
                <StarIcon>★</StarIcon>
                <RatingText>5.0</RatingText>
              </RatingContainer>
            </PriceContainer>

            {/* 옵션 선택기 */}
            {product.options.length ? (
              <OptionContainer ref={optionContainerRef2}>
                <OptionSelect onClick={toggleOptionDropdown}>
                  {selectedOption || "- [필수] 옵션 선택 -"}
                </OptionSelect>
                <SelectArrowContainer>
                  <FontAwesomeIcon
                    icon={isOptionDropdownOpen ? faChevronUp : faChevronDown}
                    color="#666"
                  />
                </SelectArrowContainer>

                <DropdownMenu isOpen={isOptionDropdownOpen}>
                  {product?.options?.map((option, index) => (
                    <DropdownItem
                      key={index}
                      isSelected={selectedOption === option}
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </OptionContainer>
            ) : null}

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
                {product?.price
                  ? (product.price * quantity).toLocaleString()
                  : "0"}{" "}
                원
              </SelectedProductPrice>
            </QuantitySection>

            {/* 액션 버튼 */}
            <ButtonContainer>
              <CartButton onClick={handleAddToCart}>장바구니</CartButton>
              <BuyButton>바로 구매</BuyButton>
            </ButtonContainer>
          </PurchaseSectionContent>
        </PurchaseSection>
      </ContentWrapper>
      <ContentWrapper>
        {/* 추천 상품 섹션 */}
        <RelatedProductsSection>
          <RelatedProducts products={relatedProducts} />
        </RelatedProductsSection>
      </ContentWrapper>

      {/* 리뷰 작성 모달창 - 분리된 컴포넌트 사용 */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={closeReviewModal}
        product={product}
        onSubmit={handleReviewSubmit}
      />

      {/* 문의하기 모달창 - 분리된 컴포넌트 사용 */}
      <InquiryModal
        isOpen={showInquiryModal}
        onClose={closeInquiryModal}
        product={product}
        onSubmit={handleInquirySubmit}
      />
    </Container>
  );
};

export default ProductDetail;
