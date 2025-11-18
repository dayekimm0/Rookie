import { memo } from "react";
import styled from "styled-components";

const XBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 1.5%;
  cursor: pointer;
  svg {
    width: 16px;
  }
  @media screen and (max-width: 1024px) {
    top: 8px;
    right: 0.8%;
    svg {
      width: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    top: 8px;
    right: 5%;
  }
  @media screen and (max-width: 500px) {
    top: 5px;
    right: 6%;
    svg {
      width: 11px;
    }
  }
`;

const OpenBtn = styled.div`
  position: fixed;
  top: ${({ $headerHeight }) => `${$headerHeight}px`};
  right: 0px;
  width: 50px;
  height: 25px;
  background: var(--main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 8px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity 0.3s ease;
  svg {
    transform: rotate(90deg);
    position: relative;
    top: -3px;
  }
  @media screen and (max-width: 1024px) {
    width: 40px;
    height: 20px;
    svg {
      top: -3px;
      width: 7px;
    }
  }
`;

export const CloseButton = memo(({ onClick }) => {
  return (
    <XBtn onClick={onClick}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M1.28516 1.0636L17.1648 16.9432"
          stroke="#666666"
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
        <path
          d="M17.165 1.05664L1.28543 16.9363"
          stroke="#666666"
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
      </svg>
    </XBtn>
  );
});

export const OpenButton = memo(({ headerHeight, onClick, visible }) => {
  return (
    <OpenBtn $headerHeight={headerHeight} onClick={onClick} $visible={visible}>
      <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
        <path
          d="M1.48926 1.98944L6.99982 7.5L1.48926 13.0106"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </OpenBtn>
  );
});
