import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductItem from "../components/Cart/ProductItem";
import WingBanner from "../components/Cart/WingBanner";
import CartMenuBar from "../components/Cart/CartMenuBar";
import useCartStore from "../stores/cartStore";
import authStore from "../stores/AuthStore";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
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

  const user = authStore((state) => state.user);
  const userUid = user?.uid || null;

  // 파이어베이스에서 불러온 쿠폰 목록 상태
  const [coupons, setCoupons] = useState([]);

  // 선택된 쿠폰 상태
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 쿠폰 불러오기 (파이어베이스)
  useEffect(() => {
    const fetchCoupons = async () => {
      if (!userUid) {
        setCoupons([]);
        return;
      }
      try {
        // wonCoupons 와 welcomeCoupons 두 컬렉션 불러오기
        const wonCouponsRef = collection(db, "users", userUid, "wonCoupons");
        const welcomeCouponsRef = collection(
          db,
          "users",
          userUid,
          "welcomeCoupons"
        );

        // 병렬로 두 컬렉션 문서 가져오기
        const [wonSnapshot, welcomeSnapshot] = await Promise.all([
          getDocs(wonCouponsRef),
          getDocs(welcomeCouponsRef),
        ]);

        // 각각 문서 배열로 변환
        const wonCouponList = wonSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const welcomeCouponList = welcomeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 두 배열 합치기
        const allCoupons = [...wonCouponList, ...welcomeCouponList];

        setCoupons(allCoupons);
      } catch (error) {
        console.error("쿠폰 불러오기 실패", error);
        setCoupons([]);
      }
    };
    fetchCoupons();
  }, [userUid]);

  // 상품 체크된 항목
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

  // 할인금액 계산 함수
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
      case "WELCOME !":
        return 10;
      default:
        return 0;
    }
  };

  // 할인금액
  const discount = selectedCoupon
    ? Math.floor(
        productPrice * (getDiscountPercent(selectedCoupon.title) / 100)
      )
    : 0;

  // 총 결제금액
  const totalPrice = productPrice - discount;

  // 쿠폰 변경
  const handleCouponChange = (coupon) => {
    setSelectedCoupon(coupon);
  };

  // 선택상품 주문
  const handleOrderSelected = () => {
    if (selectedItems.length === 0) return;
    navigate("/payment", {
      state: { orderItems: selectedItems, coupon: selectedCoupon },
    });
  };

  // 전체상품 주문
  const handleOrderAll = () => {
    navigate("/payment", {
      state: { orderItems: cartItems, coupon: selectedCoupon },
    });
  };

  // 전체 체크박스 토글
  const handleToggleAll = (isChecked) => {
    const updateAllChecked = cartItems.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setCartItems(updateAllChecked);
  };

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
                  onToggle={() => toggleCheckItem(item.id, item.option)}
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
