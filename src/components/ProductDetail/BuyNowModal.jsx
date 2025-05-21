import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RookieLogo from "../../images/logos/Rookie_logo.svg";

// 모달 오버레이 - 반투명 배경
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;

  @media (max-width: 480px) {
    width: 85%;
    padding: 30px 15px;
  }
`;

// 로고 컨테이너
const LogoContainer = styled.div`
  margin-bottom: 20px;
  img {
    width: 120px;
    height: auto;
  }
`;

// 확인 메시지
const ConfirmationText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 25px;
  }
`;

// 장바구니 버튼
const CartButton = styled.button`
  background-color: var(--gray1);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray3);
  }

  @media (max-width: 480px) {
    padding: 10px 25px;
    font-size: 15px;
  }
`;

const BuyNowModal = ({
  isOpen,
  onClose,
  message = "잠시 후 결제 페이지로 이동합니다!",
  buttonText = "바로 이동",
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToCart = () => {
    navigate("/payment");
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <LogoContainer>
          <img src={RookieLogo} alt="루키 로고" />
        </LogoContainer>
        <ConfirmationText>{message}</ConfirmationText>
        {/* <CartButton onClick={handleGoToCart}>{buttonText}</CartButton> */}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default BuyNowModal;
