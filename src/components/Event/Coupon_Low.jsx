import React from "react";
import coupon10 from "../../images/coupon/cp4.png";
import styled from "styled-components";

const Coupon = styled.img`
  @media screen and (max-width: 1024px) {
    width: 209px;
    height: 100px;
  }
  @media screen and (max-width: 500px) {
    width: 209px;
    height: 96px;
  }
  @media screen and (max-width: 375px) {
    width: 104px;
    height: 48px;
  }
`;

const Coupon_Low = () => {
  return (
    <>
      <Coupon src={coupon10} alt="coupon" />
    </>
  );
};

export default Coupon_Low;
