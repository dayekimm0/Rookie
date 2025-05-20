import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductItem from "../components/Cart/ProductItem";
import WingBanner from "../components/Cart/WingBanner";
import CartMenuBar from "../components/Cart/CartMenuBar";
import { mockItems } from "../components/Cart/MockupData";
import useCartStore from "../stores/cartStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  display: flex;
  gap: 5%;
  background: var(--light);
  color: var(--dark);

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
  margin-top: 5%;
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 600;
  margin-bottom: 50px;

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

const Items = styled.div`
  width: calc(100% + 5px);
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

const EmptyMessage = styled.p`
  font-size: 1.6rem;
  text-align: center;
  color: var(--grayC);
  margin: auto 0;
`;

const DeleteButton = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--dark);
  color: var(--light);
  border: none;
  border-radius: 4px;
  align-self: end;
  margin-right: 2%;
  cursor: pointer;
  p {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1024px) {
    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
    p {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 375px) {
    p {
    }
    font-size: 1.2rem;
  }
`;

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, setCartItems, toggleCheckItem } = useCartStore();

  const checkedItems = cartItems.filter((item) => item.checked);

  // 쿠폰 목록
  const [coupons, setCoupons] = useState([]);

  // 목업 쿠폰
  const MOCK_COUPONS = [
    { id: "c10", label: "10% 할인 쿠폰", discountRate: 0.1 },
    { id: "c20", label: "20% 할인 쿠폰", discountRate: 0.2 },
    { id: "c30", label: "30% 할인 쿠폰", discountRate: 0.3 },
  ];

  // 선택된 쿠폰 상태
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 로컬스토리지에서 쿠폰 불러오기 + 없으면 MOCK_COUPONS 세팅
  useEffect(() => {
    const storedCoupons = localStorage.getItem("coupons");
    if (storedCoupons) {
      setCoupons(JSON.parse(storedCoupons));
    } else {
      setCoupons(MOCK_COUPONS);
      localStorage.setItem("coupons", JSON.stringify(MOCK_COUPONS));
    }
  }, []);

  // 상품 체크
  const selectedItems = checkedItems;

  // 체크된 상품 삭제
  const handleDeleteSelected = () => {
    const updatedItems = cartItems.filter((item) => !item.checked);
    setCartItems(updatedItems);
  };

  // 상품금액
  const productPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 할인금액
  const discount = selectedCoupon
    ? productPrice * selectedCoupon.discountRate
    : 0;

  // 총 결제금액
  const totalPrice = productPrice - discount;

  // 쿠폰 변경
  const handleCouponChange = (e) => {
    const couponId = e.target.value;
    const coupon = coupons.find((c) => c.id === couponId);
    setSelectedCoupon(coupon || null);
  };

  // 선택상품주문
  const handleOrderSelected = () => {
    if (selectedItems.length === 0) return;
    navigate("/payment", {
      state: { orderItems: selectedItems, coupon: selectedCoupon },
    });
  };

  // 전체상품주문
  const handleOrderAll = () => {
    navigate("/payment", {
      state: { orderItems: mockItems, coupon: selectedCoupon },
    });
  };

  // 체크박스
  const handleToggleAll = (isChecked) => {
    const updateAllChecked = cartItems.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setCartItems(updateAllChecked);
  };

  useEffect(() => {
    console.log("cartItems:", cartItems);
    console.log("checkedItems:", checkedItems);
    console.log(
      "allChecked:",
      cartItems.length > 0 && checkedItems.length === cartItems.length
    );
  }, [cartItems, checkedItems]);

  return (
    <Container>
      <Section>
        <Title>Shopping Cart</Title>
        <List>
          <CartMenuBar
            allChecked={
              cartItems.length > 0 && checkedItems.length === cartItems.length
            }
            onToggleAll={handleToggleAll}
          />
          <Items data-lenis-prevent>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <ProductItem
                  key={item.id}
                  item={item}
                  isChecked={item.checked}
                  onToggle={() => toggleCheckItem(item.id)}
                />
              ))
            ) : (
              <EmptyMessage>상품이 없습니다.</EmptyMessage>
            )}
          </Items>
        </List>
        {cartItems.length > 0 && (
          <DeleteButton onClick={handleDeleteSelected}>
            <FontAwesomeIcon icon={faTrash} />
            <p>삭제</p>
          </DeleteButton>
        )}
      </Section>
      <WingBanner
        page="cart"
        productPrice={productPrice}
        discount={discount}
        totalPrice={totalPrice}
        coupons={coupons}
        selectedCoupon={selectedCoupon}
        onCouponChange={handleCouponChange}
        onOrderSelected={handleOrderSelected}
        onOrderAll={handleOrderAll}
        disableOrderSelected={selectedItems.length === 0}
        disableOrderAll={cartItems.length === 0}
      />
    </Container>
  );
};

export default Cart;
