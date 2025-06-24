import { useState } from "react";
import styled from "styled-components";

const SlideBox = styled.div`
  max-width: 280px;
  aspect-ratio: 9/16;
  border-radius: 1rem;
  background-color: var(--light);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s, opacity 0.3s, bottom 0.3s;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.diff-0 {
    z-index: 5;
    transform: translateX(-50%) scale(1);
    bottom: 0;
    cursor: pointer;
  }
  &.diff-1 {
    z-index: 4;
    transform: translateX(-50%) scale(0.9);
    filter: brightness(70%) blur(0.1rem);
  }
  &.diff-2 {
    z-index: 3;
    transform: translateX(-50%) scale(0.85);
    filter: brightness(50%) blur(0.2rem);
  }
  &.diff-3 {
    z-index: 2;
    transform: translateX(-50%) scale(0.8);
    filter: brightness(30%) blur(0.3rem);
  }
  &.diff-more {
    z-index: 1;
    transform: translateX(-50%) scale(0.75);
    filter: brightness(10%) blur(0.4rem);
    opacity: 0;
  }

  @media screen and (max-width: 1024px) {
    &.diff-3 {
      transform: translateX(-50%) scale(0.75);
      filter: brightness(10%) blur(0.4rem);
      opacity: 0;
    }
  }

  @media screen and (max-width: 500px) {
    &.diff-2 {
      transform: translateX(-50%) scale(0.75);
      filter: brightness(10%) blur(0.4rem);
      opacity: 0;
    }
  }
`;

const HighlightContent = ({ thumbnail, title, className, id, onOpenModal }) => {
  const handleCardClick = () => {
    onOpenModal(id);
  };

  return (
    <SlideBox className={className} onClick={handleCardClick}>
      <img src={thumbnail} alt={title} />
    </SlideBox>
  );
};

export default HighlightContent;
