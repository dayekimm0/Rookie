import { useState } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  width: 600px;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: ${(props) => (props.active ? "block" : "none")};
`;

const SliderControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#333" : "#ccc")};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  /* border-radius: 50%; */
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  ${(props) => (props.direction === "left" ? "left: 5px;" : "right: 5px;")}
`;

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SliderContainer>
      <ImageContainer>
        {images.map((image, index) => (
          <SlideImage
            key={index}
            src={image}
            active={index === currentIndex}
            alt={`제품 이미지 ${index + 1}`}
          />
        ))}
      </ImageContainer>

      <SliderArrow direction="left" onClick={handlePrev}>
        &#8249;
      </SliderArrow>

      <SliderArrow direction="right" onClick={handleNext}>
        &#8250;
      </SliderArrow>

      <SliderControls>
        {images.map((_, index) => (
          <SliderDot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </SliderControls>
    </SliderContainer>
  );
};

export default ImageSlider;
