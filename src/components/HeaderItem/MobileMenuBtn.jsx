import { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;
    width: 18px;
    cursor: pointer;
    span {
      width: 20px;
      height: 2px;
      background: var(--gray1);
      border-radius: 10px;
      transition: all 0.4s;
    }
    &.active {
      span {
        &:nth-child(1) {
          transform: rotate(45deg);
          transform-origin: left center;
        }
        &:nth-child(2) {
          opacity: 0;
          transform: translateX(100%);
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
          transform-origin: left center;
        }
      }
    }
  }
`;

const MobileMenuBtn = memo(({ mobileMenuOpen, handleClickMobileMenu }) => {
  return (
    <Container
      onClick={handleClickMobileMenu}
      className={mobileMenuOpen ? "active" : ""}
    >
      <span></span>
      <span></span>
      <span></span>
    </Container>
  );
});

export default MobileMenuBtn;
