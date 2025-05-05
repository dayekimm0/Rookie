import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 5%;
  font-family: "Pretendard";
`;

const ItemList = styled.div`
  width: 100%;
  max-width: 1010px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-top: 5%;
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 600;
`;

const DeliveryInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1010px;
  span {
    width: 100%;
    height: 1px;
    background: var(--gray1);
  }
`;

const InfoTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  padding-left: 1%;
  margin-bottom: 10px;
`;

const WingBanner = styled.form`
  position: fixed;
  top: 35%;
  right: 5%;
  width: 100%;
  max-width: 570px;
  padding: 60px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--grayFA);
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
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
  border: 1px solid var(--grayC);
  border-radius: 4px;
  background: var(--light);
`;

const PriceInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  span {
    width: 100%;
    height: 1px;
    background: var(--grayC);
  }
`;

const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      font-size: 1.4rem;
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  p {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const Button = styled.input`
  width: 450px;
  height: 60px;
  border: none;
  border-radius: 4px;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--main);
`;

const Payment = () => {
  return (
    <Container>
      <ItemList>
        <Title>Payment</Title>
        <DeliveryInfo>
          <InfoTitle>배송지 정보</InfoTitle>
          <span></span>
        </DeliveryInfo>
      </ItemList>
      <WingBanner>
        <SaleInfo>
          <SubTitle>할인 정보</SubTitle>
          <CouponList>
            <h2>사용 가능한 쿠폰 3장</h2>
          </CouponList>
        </SaleInfo>
        <PriceInfo>
          <SubTitle>결제 정보</SubTitle>
          <PriceList>
            <ul>
              <li>상품금액</li>
              <li>50,000원</li>
            </ul>
            <ul>
              <li>할인금액</li>
              <li>2,000원</li>
            </ul>
            <ul>
              <li>배송비</li>
              <li>무료</li>
            </ul>
          </PriceList>
          <span></span>
          <TotalPrice>
            <p>총 결제금액</p>
            <p>48,000원</p>
          </TotalPrice>
        </PriceInfo>
        <Button type="submit" value="결제하기" />
      </WingBanner>
    </Container>
  );
};

export default Payment;
