import React, { useState } from "react";
import styled from "styled-components";
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

// 제목 입력 필드
const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #999;
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

const InquiryModal = ({
  isOpen,
  onClose,
  product,
  onSubmit,
  selectedOption = "L",
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title,
      content,
    });

    // 상태 초기화
    setTitle("");
    setContent("");
  };

  const footer = (
    <>
      <CancelButton onClick={onClose}>취소</CancelButton>
      <SubmitButton
        onClick={handleSubmit}
        disabled={!title.trim() || !content.trim()}
      >
        등록하기
      </SubmitButton>
    </>
  );

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="문의하기"
      footer={footer}
    >
      <ProductInfoBox>
        <ProductThumb src={product?.thumbnail} alt={product?.name} />
        <ProductInfoText>
          <ProductName>{product?.name}</ProductName>
          <ProductOption>옵션: {selectedOption}</ProductOption>
        </ProductInfoText>
      </ProductInfoBox>

      <InputLabel>제목</InputLabel>
      <TitleInput
        placeholder="문의 제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <InputLabel>내용</InputLabel>
      <ContentTextarea
        placeholder="문의 내용을 입력해주세요. (최대 1,000자)"
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
    </ModalBase>
  );
};

export default InquiryModal;
