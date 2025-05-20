import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductItem from "../components/Cart/ProductItem";
import WingBanner from "../components/Cart/WingBanner";
import MyAddress from "../components/Payment/MyAddress";
import AddressModal from "../components/Payment/AddressModal";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  display: flex;
  gap: 5%;
  background: var(--light);

  input[type="checkbox"] {
    display: none;
  }

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

const List = styled.div`
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

const InfoTitle = styled.div`
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 1.8rem;
      font-weight: 600;
    }
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

const AddressChangeButton = styled.button`
  padding: 8px 12px;
  background: var(--dark);
  color: var(--light);
  border: none;
  border-radius: 4px;
`;

const Items = styled.div`
  width: calc(100% + 15px);
  display: flex;
  flex-direction: column;
  max-height: 520px;
  gap: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: auto;
  scroll-behavior: auto;
  scrollbar-gutter: stable;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--grayC);
  }

  &::-webkit-scrollbar-track {
    background: var(--light);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    max-height: 400px;
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-height: 100%;
    gap: 20px;
    overflow-y: visible;
  }

  @media screen and (max-width: 375px) {
    gap: 20px;
  }
`;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderItems = location.state?.orderItems || [];
  const couponFromCart = location.state?.coupon || null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState(
    couponFromCart?.id || ""
  );

  useEffect(() => {
    const savedCoupons = localStorage.getItem("coupons");
    if (savedCoupons) {
      setAvailableCoupons(JSON.parse(savedCoupons));
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const selectedCoupon =
    availableCoupons.find((c) => c.id === selectedCouponId) || null;

  const productPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const couponDiscountRate = selectedCoupon ? selectedCoupon.discountRate : 0;
  const discount = productPrice * couponDiscountRate;
  const totalPrice = productPrice - discount;

  const handleCouponChange = (e) => {
    setSelectedCouponId(e.target.value);
  };

  const handlePaymentSubmit = () => {
    alert("결제가 완료되었습니다.");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("appliedCoupon");
    navigate("/store");
  };

  return (
    <Container>
      <Section>
        <Title>Payment</Title>
        <List>
          <InfoTitle>
            <li>
              <h2>배송정보</h2>
              <AddressChangeButton onClick={() => setIsModalOpen(true)}>
                배송정보 변경
              </AddressChangeButton>
            </li>
            <span></span>
          </InfoTitle>
          <MyAddress />
        </List>
        <List>
          <InfoTitle>
            <li>
              <h2>주문정보</h2>
            </li>
            <span></span>
          </InfoTitle>
          <Items data-lenis-prevent>
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <ProductItem key={item.id} item={item} page="payment" />
              ))
            ) : (
              <p>주문할 상품이 없습니다.</p>
            )}
          </Items>
        </List>
      </Section>
      <WingBanner
        page="payment"
        productPrice={productPrice}
        discount={discount}
        totalPrice={totalPrice}
        coupon={selectedCoupon}
        coupons={availableCoupons}
        selectedCoupon={selectedCoupon}
        onCouponChange={handleCouponChange}
        onPaymentSubmit={handlePaymentSubmit}
      />
      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Payment;
