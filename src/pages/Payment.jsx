import React, { useState } from "react";
import styled from "styled-components";
import PaymentAddress from "../components/Payment/PaymentDelivery";
import PaymentItem from "../components/Payment/PaymentItem";
import PaymentBanner from "../components/Payment/PaymentBanner";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  font-family: "Pretendard";
  display: flex;
  align-items: start;
  gap: 5%;
  background: var(--light);

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
    gap: 3%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;

const Section = styled.section`
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

  @media screen and (max-width: 1024px) {
    font-size: 3.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 2.4rem;
  }
`;

const ProductInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  span {
    width: 102%;
    height: 1px;
    background: var(--gray1);
    transform: translateX(-1%);
  }

  @media screen and (max-width: 1024px) {
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    gap: 20px;
  }

  @media screen and (max-width: 375px) {
    gap: 15px;
  }
`;

const InfoTitle = styled.div`
  width: 100%;
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
  }
  span {
    display: inline-block;
    width: 102%;
    height: 1px;
    background: var(--gray1);
    transform: translateX(-1%);
  }

  @media screen and (max-width: 1024px) {
    h2 {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 375px) {
    h2 {
      font-size: 1.6rem;
    }
  }
`;

const Payment = () => {
  return (
    <Container>
      <Section>
        <Title>Payment</Title>
        <PaymentAddress />
        <ProductInfo>
          <InfoTitle>
            <h2>주문정보</h2>
            <span></span>
          </InfoTitle>
          <PaymentItem />
          <PaymentItem />
          <PaymentItem />
        </ProductInfo>
      </Section>
      <PaymentBanner />
    </Container>
  );
};

export default Payment;
