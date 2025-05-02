import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const WingBanner = styled.div`
  position: fixed;
  top: 381px;
  right: 96px;
  width: 100%;
  max-width: 570px;
  padding: 60px;
  gap: 20px;
`;

const SaleInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CouponList = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Cart = () => {
  return (
    <Container>
      <WingBanner>
        <SaleInfo>
          <h2>할인 정보</h2>
          <CouponList>
            <h2>사용 가능한 쿠폰 3장</h2>
          </CouponList>
        </SaleInfo>
      </WingBanner>
    </Container>
  );
};

export default Cart;
