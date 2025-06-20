import { useEffect, useState } from "react";
import styled from "styled-components";
import authStore from "../../stores/AuthStore";
import CouponSelector from "./CouponSelector";

const Banner = styled.form`
  position: sticky;
  top: 250px;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  height: min-content;
  padding: 60px 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--grayFA);
  margin-top: calc(5% + 60px);

  @media screen and (max-width: 1024px) {
    max-width: 300px;
    min-width: 200px;
    padding: 20px;
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    position: static;
    bottom: 0;
    max-width: 100%;
    padding: 50px 0;
    gap: 20px;
    background: var(--light);
    margin-top: 0;
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

  @media screen and (max-width: 768px) {
    gap: 20px;
  }

  @media screen and (max-width: 375px) {
    gap: 15px;
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

const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  input {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 4px;
    font-size: 1.8rem;

    cursor: pointer;
    &:nth-child(1) {
      background: var(--main);
      font-weight: 500;
    }
    &:nth-child(2) {
      background: var(--dark);
      color: var(--light);
      font-weight: 400;
    }

    &:disabled {
      background-color: var(--grayC);
      color: var(--light);
      cursor: not-allowed;
      font-weight: 400;
    }

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

  &:disabled {
    background-color: var(--grayC);
    color: var(--light);
    cursor: not-allowed;
    font-weight: 400;
  }

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

const WingBanner = ({
  page,
  productPrice = 0,
  onPaymentSubmit,
  coupons = [],
  selectedCoupon,
  onCouponChange,
  onOrderSelected,
  onOrderAll,
  disableOrderSelected,
  disableOrderAll,
}) => {
  const { userProfile, tempAddress } = authStore();

  const addressToCheck = tempAddress || userProfile;
  const isAddressValid =
    addressToCheck?.postalCode &&
    addressToCheck?.address &&
    addressToCheck?.detailedAddress;

  const getDiscountPercent = (title) => {
    switch (title) {
      case "HOME RUN !":
        return 80;
      case "TRIPLE !":
        return 50;
      case "DOUBLE !":
        return 30;
      case "SINGLE !":
        return 10;
      case "WELCOME!":
        return 10;
      default:
        return 0;
    }
  };

  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(productPrice);

  useEffect(() => {
    if (selectedCoupon?.title) {
      const discountPercent = getDiscountPercent(selectedCoupon.title);
      const discountCalculated = Math.floor(
        (productPrice * discountPercent) / 100
      );
      setDiscountAmount(discountCalculated);
      setFinalPrice(productPrice - discountCalculated);
    } else {
      setDiscountAmount(0);
      setFinalPrice(productPrice);
    }
  }, [selectedCoupon, productPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPaymentSubmit) onPaymentSubmit();
  };

  return (
    <Banner onSubmit={page === "payment" ? handleSubmit : undefined}>
      <SaleInfo>
        <SubTitle>할인 정보</SubTitle>
        {(page === "payment" || page === "cart") && (
          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onCouponChange={onCouponChange}
          />
        )}
      </SaleInfo>

      <PriceInfo>
        <SubTitle>결제 정보</SubTitle>
        <PriceList>
          <ul>
            <li>상품금액</li>
            <li>{productPrice.toLocaleString()}원</li>
          </ul>
          <ul>
            <li>할인금액</li>
            <li>{discountAmount.toLocaleString()}원</li>
          </ul>
          <ul>
            <li>배송비</li>
            <li>무료</li>
          </ul>
        </PriceList>
        <span></span>
        <TotalPrice>
          <p>총 결제금액</p>
          <p>{finalPrice.toLocaleString()}원</p>
        </TotalPrice>
      </PriceInfo>

      {page === "cart" && (
        <Buttons>
          <input
            type="button"
            value="선택상품주문"
            onClick={onOrderSelected}
            disabled={disableOrderSelected}
          />
          <input
            type="button"
            value="전체상품주문"
            onClick={onOrderAll}
            disabled={disableOrderAll}
          />
        </Buttons>
      )}

      {page === "payment" && (
        <Button type="submit" value="결제하기" disabled={!isAddressValid} />
      )}
    </Banner>
  );
};

export default WingBanner;
