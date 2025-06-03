import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import coupon80 from "../../images/coupon/cp1.png";
import coupon50 from "../../images/coupon/cp2.png";
import coupon30 from "../../images/coupon/cp3.png";
import coupon10 from "../../images/coupon/cp4.png";
import styled from "styled-components";

const Coupon = styled.img`
  width: ${(props) => props.width || "209px"};
  height: ${(props) => props.height || "100px"};
  @media screen and (max-width: 1024px) {
    width: ${(props) => props.width || "209px"};
    height: ${(props) => props.height || "100px"};
  }
  @media screen and (max-width: 768px) {
    width: ${(props) => props.width || "209px"};
    height: ${(props) => props.height || "96px"};
  }
  @media screen and (max-width: 500px) {
    width: ${(props) => props.width || "170px"};
    height: ${(props) => props.height || "80px"};
  }
  @media screen and (max-width: 500px) {
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "60px"};
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0fr);
  justify-content: center;
  align-content: center;
  padding-left: 10px;
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
  }
  @media screen and (max-width: 375px) {
  }
`;

const Coupons = ({ width, height }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const targets = wrapperRef.current.querySelectorAll("img");

    gsap.fromTo(
      targets,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        stagger: 0.2,
      }
    );
  }, []);
  return (
    <Wrapper ref={wrapperRef}>
      <Coupon src={coupon80} alt="coupon" width={width} height={height} />
      <Coupon src={coupon50} alt="coupon" width={width} height={height} />
      <Coupon src={coupon30} alt="coupon" width={width} height={height} />
      <Coupon src={coupon10} alt="coupon" width={width} height={height} />
    </Wrapper>
  );
};

export default Coupons;
