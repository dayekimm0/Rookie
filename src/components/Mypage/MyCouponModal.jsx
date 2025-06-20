import { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import logo from "../../images/logos/Rookie_logo.svg";

const ModalOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  width: 600px;
  border-radius: 12px;
  padding: 70px;
  position: relative;
  overflow-y: auto;
  z-index: 2000;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1024px) {
    width: 480px;
    padding: 50px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 462px;
    padding: 50px 30px 30px;
    margin: 0 15px;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  @media screen and (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const Logo = styled.div`
  width: 130px;
  height: 40px;
  cursor: pointer;
  transform: translateY(-50%);
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: 1;
  @media screen and (max-width: 1024px) {
    scale: 0.9;
  }
  @media screen and (max-width: 600px) {
    scale: 0.8;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const ModalTWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-top: 1px solid var(--grayE);
  padding: 20px 0;
  overflow-wrap: break-word;
  @media screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const ModalTextT = styled.p`
  font-size: 2rem;
  line-height: 1.3;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const ModalText = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 300;
  color: var(--gray8);
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ModalButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  border: none;
  background: var(--dark);
  color: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: var(--gray2);
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.4rem;
  }
`;

const MyCouponModal = ({ isOpen, closeModal, coupons }) => {
  const getDiscountText = (title) => {
    switch (title) {
      case "HOME RUN !":
        return "HOME RUN [80%]";
      case "TRIPLE !":
        return "TRIPLE [50%]";
      case "DOUBLE !":
        return "DOUBLE [30%]";
      case "SINGLE !":
        return "SINGLE [10%]";
      case "WELCOME!":
        return "WELCOME [10%]";
      default:
        return title;
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <LogoWrapper>
          <Logo>
            <LogoImg src={logo} alt="rookielogo" />
          </Logo>
          <ModalTitle>내 쿠폰</ModalTitle>
        </LogoWrapper>

        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <ModalTWrapper key={coupon.id}>
              <ModalTextT>{getDiscountText(coupon.title)}</ModalTextT>
              <ModalText>
                [EVENT] {coupon.title} COUPON | 적용 제한금액 없음
              </ModalText>
            </ModalTWrapper>
          ))
        ) : (
          <ModalTWrapper>
            <ModalTextT>쿠폰이 없습니다.</ModalTextT>
          </ModalTWrapper>
        )}

        <ModalButton type="button" onClick={closeModal}>
          돌아가기
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MyCouponModal;
