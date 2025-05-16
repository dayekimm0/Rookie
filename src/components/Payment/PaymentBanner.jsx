import React from "react";
import styled from "styled-components";

const Banner = styled.form`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--grayFA);

  @media screen and (max-width: 1024px) {
    max-width: 300px;
    min-width: 200px;
    padding: 20px;
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    position: static;
    max-width: 100%;
    padding: 50px 0;
    gap: 20px;
    background: var(--light);
    transform: translateY(0);
  }

  @media screen and (max-width: 375px) {
    gap: 15px;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.6rem;
  }
`;

const SaleInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1024px) {
    gap: 15px;
  }

  @media screen and (max-width: 1024px) {
    gap: 20px;
  }

  @media screen and (max-width: 1024px) {
    gap: 15px;
  }
`;

const CouponList = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  padding: 10px;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  background: var(--light);

  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
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

  @media screen and (max-width: 1024px) {
    gap: 15px;
  }

  @media screen and (max-width: 767px) {
    gap: 20px;
  }

  @media screen and (max-width: 375px) {
    gap: 15px;
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
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 1024px) {
    ul {
      li {
        font-size: 1.4rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    ul {
      li {
        font-size: 1.6rem;
      }
    }
  }

  @media screen and (max-width: 375px) {
    ul {
      li {
        font-size: 1.4rem;
      }
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

  @media screen and (max-width: 1024px) {
    p {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 375px) {
    p {
      font-size: 1.6rem;
    }
  }
`;

const Button = styled.input`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main);
  color: var(--dark);
  border: none;
  border-radius: 4px;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.6rem;
  }
`;

const PaymentBanner = () => {
  return (
    <Banner>
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
    </Banner>
  );
};

export default PaymentBanner;
