import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import coupon80 from "../../images/coupon/cp1.png";
import coupon50 from "../../images/coupon/cp2.png";
import coupon30 from "../../images/coupon/cp3.png";
import coupon10 from "../../images/coupon/cp4.png";
import styled from "styled-components";

const Coupon = styled.img`
  /* width: ${(props) => props.width || "209px"}; */
  height: ${(props) => props.height || "100px"};
  transition: transform 0.2s;

  @media screen and (max-width: 1024px) {
    /* width: ${(props) => props.width || "209px"}; */
    height: ${(props) => props.height || "100px"};
  }
  @media screen and (max-width: 768px) {
    /* width: ${(props) => props.width || "209px"}; */
    height: ${(props) => props.height || "96px"};
  }
  @media screen and (max-width: 500px) {
    /* width: ${(props) => props.width || "170px"}; */
    height: ${(props) => props.height || "80px"};
  }
  @media screen and (max-width: 375px) {
    /* width: ${(props) => props.width || "150px"}; */
    height: ${(props) => props.height || "60px"};
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 30px;
  justify-content: center;
  align-content: center;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, auto); /* 2개씩 */
    justify-content: center; /* 중앙 정렬 유지 */
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, auto); /* 2개씩 */
    justify-content: center; /* 중앙 정렬 유지 */
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, auto); /* 더 좁아져도 2개 유지 */
    justify-content: center;
  }
`;

const Coupons = ({ width, height }) => {
  const wrapperRef = useRef(null);

  // 핸들러 저장용 Map (cleanup을 위해)
  const handlersMap = useRef(new Map());

  useEffect(() => {
    const coupons = wrapperRef.current.querySelectorAll("img");

    // 초기 애니메이션
    gsap.fromTo(
      coupons,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out",
        stagger: 0.2,
      }
    );

    // 각 쿠폰에 이벤트 핸들러 등록
    coupons.forEach((coupon) => {
      const hoverIn = () => {
        gsap.to(coupon, {
          rotate: gsap.utils.random(-8, 8),
          y: -30,
          duration: 0.2,
          ease: "power1.out",
        });
      };

      const hoverOut = () => {
        gsap.to(coupon, {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      };

      coupon.addEventListener("mouseenter", hoverIn);
      coupon.addEventListener("mouseleave", hoverOut);

      handlersMap.current.set(coupon, { hoverIn, hoverOut });
    });

    return () => {
      handlersMap.current.forEach(({ hoverIn, hoverOut }, coupon) => {
        coupon.removeEventListener("mouseenter", hoverIn);
        coupon.removeEventListener("mouseleave", hoverOut);
      });
      handlersMap.current.clear();
    };
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
