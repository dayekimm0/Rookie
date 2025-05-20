import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// 모달 배경 - 반투명 회색 오버레이
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 1024px) {
    width: 90%;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    width: 95%;
    max-height: 85vh;
  }
`;

// 모달 헤더
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

// 모달 제목
const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
`;

// 모달 콘텐츠
const ModalContent = styled.div`
  padding: 20px;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

// 모달 하단 버튼 영역
const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #eee;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ModalBase = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalBase;
export {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalFooter,
};
