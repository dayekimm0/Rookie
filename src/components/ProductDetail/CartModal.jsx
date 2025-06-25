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

// 버튼

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

// 장바구니 버튼
const CartButton = styled.button`
  background: var(--main);
  color: var(--dark);
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  /* transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray3);
  } */

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;

// 쇼핑하기 버튼
const ShoppingButton = styled.button`
  background-color: var(--gray1);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  font-weight: 300;
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

const CartModal = ({
  isOpen,
  onClose,
  message = "상품이 장바구니에 담겼습니다!",
  buttonText = "장바구니로 이동",
  shoppingText = "계속 쇼핑하기",
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToCart = () => {
    navigate("/cart");
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <LogoContainer>
          <img src={RookieLogo} alt="루키 로고" />
        </LogoContainer>
        <ConfirmationText>{message}</ConfirmationText>
        <Buttons>
          <ShoppingButton onClick={onClose}>{shoppingText}</ShoppingButton>
          <CartButton onClick={handleGoToCart}>{buttonText}</CartButton>
        </Buttons>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CartModal;
