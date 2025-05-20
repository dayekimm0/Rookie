import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCamera } from "@fortawesome/free-solid-svg-icons";
import ModalBase from "./ModalBase";

// 제품 정보 영역
const ProductInfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// 제품 이미지
const ProductThumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
`;

// 제품 정보 텍스트
const ProductInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

// 제품 이름
const ProductName = styled.span`
  font-size: 16px;
  margin-bottom: 5px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// 제품 옵션
const ProductOption = styled.span`
  font-size: 14px;
  color: #888;
`;

// 별점 선택 영역
const RatingSelection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

// 별점 라벨
const RatingLabel = styled.span`
  font-size: 16px;
  margin-right: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 0;
  }
`;

// 별점 선택 버튼 그룹
const StarButtonGroup = styled.div`
  display: flex;
`;

// 별점 버튼
const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.selected ? "#ffd700" : "#e0e0e0")};
  margin-right: 5px;
  transition: color 0.2s;

  &:hover {
    color: #ffd700;
  }
`;

// 입력 필드 라벨
const InputLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

// 내용 입력 영역
const ContentTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: none;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #999;
  }

  @media (max-width: 480px) {
    height: 120px;
    padding: 10px;
  }
`;

// 글자 수 카운터
const CharCounter = styled.div`
  text-align: right;
  font-size: 12px;
  color: ${(props) => (props.isLimit ? "red" : "#888")};
  margin-bottom: 20px;
`;

// 이미지 업로드 영역
const ImageUploadArea = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

// 이미지 업로드 버튼 그룹
const ImageUploadButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// 이미지 업로드 버튼
const ImageUploadButton = styled.button`
  width: 80px;
  height: 80px;
  border: 1px dashed #ccc;
  background: #f9f9f9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }
`;

// 취소 버튼
const CancelButton = styled.button`
  flex: 1;
  height: 50px;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #555;
  }

  @media (max-width: 480px) {
    height: 45px;
    font-size: 14px;
  }
`;

// 등록 버튼
const SubmitButton = styled.button`
  flex: 1;
  height: 50px;
  background: ${(props) => (props.disabled ? "#ddd" : "#ffd700")};
  color: ${(props) => (props.disabled ? "#999" : "#333")};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-left: 10px;

  &:hover {
    background: ${(props) => (props.disabled ? "#ddd" : "#ffcb00")};
  }

  @media (max-width: 480px) {
    height: 45px;
    font-size: 14px;
  }
`;

const ReviewModal = ({
  isOpen,
  onClose,
  product,
  onSubmit,
  selectedOption = "L",
}) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = () => {
    if (!content.trim()) return;

    onSubmit({
      rating,
      content,
      images,
    });

    // 상태 초기화
    setRating(5);
    setContent("");
    setImages([]);
  };

  const footer = (
    <>
      <CancelButton onClick={onClose}>취소</CancelButton>
      <SubmitButton onClick={handleSubmit} disabled={!content.trim()}>
        등록하기
      </SubmitButton>
    </>
  );

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="리뷰" footer={footer}>
      <ProductInfoBox>
        <ProductThumb src={product?.images?.[0]} alt={product?.name} />
        <ProductInfoText>
          <ProductName>{product?.name}</ProductName>
          <ProductOption>옵션: {selectedOption}</ProductOption>
        </ProductInfoText>
      </ProductInfoBox>

      <RatingSelection>
        <RatingLabel>별점</RatingLabel>
        <StarButtonGroup>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarButton
              key={star}
              selected={star <= rating}
              onClick={() => setRating(star)}
            >
              <FontAwesomeIcon icon={faStar} />
            </StarButton>
          ))}
        </StarButtonGroup>
      </RatingSelection>

      <InputLabel>리뷰 내용</InputLabel>
      <ContentTextarea
        placeholder="리뷰 내용을 입력해주세요. (최대 1,000자)"
        value={content}
        onChange={(e) => {
          const text = e.target.value;
          if (text.length <= 1000) {
            setContent(text);
          }
        }}
      />
      <CharCounter isLimit={content.length >= 1000}>
        {content.length}/1,000
      </CharCounter>

      <ImageUploadArea>
        <InputLabel>사진 첨부</InputLabel>
        <ImageUploadButtons>
          <ImageUploadButton>
            <FontAwesomeIcon icon={faCamera} size="lg" />
          </ImageUploadButton>
          {/* 추가 이미지 버튼은 실제 구현 시 동적 생성 */}
        </ImageUploadButtons>
      </ImageUploadArea>
    </ModalBase>
  );
};

export default ReviewModal;
