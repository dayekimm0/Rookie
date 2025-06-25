import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductItem from "../components/Cart/ProductItem";
import WingBanner from "../components/Cart/WingBanner";
import MyAddress from "../components/Payment/MyAddress";
import AddressModal from "../components/Payment/AddressModal";
import LogonRookielogo from "../images/logos/Logon_Rookie_logo.svg";
import authStore from "../stores/AuthStore";
import useCartStore from "../stores/cartStore";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

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
  cursor: pointer;
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

const ListMiddle = styled.div`
  height: 360px;
  position: relative;
  @media screen and (max-width: 1024px) {
    height: 270px;
  }
  @media screen and (max-width: 500px) {
    height: 170px;
  }
`;

const Listimg = styled.img`
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  @media screen and (max-width: 1024px) {
    width: 280px;
  }
  @media screen and (max-width: 768px) {
    width: 240px;
  }
`;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderItems = location.state?.orderItems || [];
  const couponFromCart = location.state?.coupon || null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user, userProfile, tempAddress } = authStore();
  const userUid = user?.uid || null;

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(couponFromCart || null);

  const clearCart = useCartStore((state) => state.clearCart);

  // Firestore에서 유저 쿠폰 불러오기
  useEffect(() => {
    const fetchCoupons = async () => {
      if (!userUid) {
        setAvailableCoupons([]);
        return;
      }

      try {
        const wonCouponsRef = collection(db, "users", userUid, "wonCoupons");
        const welcomeCouponsRef = collection(
          db,
          "users",
          userUid,
          "welcomeCoupons"
        );

        const [wonSnapshot, welcomeSnapshot] = await Promise.all([
          getDocs(wonCouponsRef),
          getDocs(welcomeCouponsRef),
        ]);

        const wonCoupons = wonSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          collectionType: "wonCoupons",
        }));

        const welcomeCoupons = welcomeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          collectionType: "welcomeCoupons",
        }));

        const allCoupons = [...wonCoupons, ...welcomeCoupons];
        setAvailableCoupons(allCoupons);

        if (couponFromCart) {
          const matched = allCoupons.find((c) => c.id === couponFromCart.id);
          setSelectedCoupon(matched || null);
        }
      } catch (err) {
        console.error("쿠폰 불러오기 실패:", err);
        setAvailableCoupons([]);
      }
    };

    fetchCoupons();
  }, [userUid, couponFromCart]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

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

  const productPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountPercent = selectedCoupon
    ? getDiscountPercent(selectedCoupon.title)
    : 0;
  const discount = Math.floor((productPrice * discountPercent) / 100);
  const totalPrice = productPrice - discount;

  const handleCouponChange = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handlePaymentSubmit = async () => {
    if (isProcessing) return; // 중복 클릭 방지
    if (!userUid) {
      alert("로그인 후 결제 가능합니다.");
      return;
    }
    if (orderItems.length === 0) {
      alert("주문할 상품이 없습니다.");
      return;
    }
    // 배송지 필수 정보 확인 (임시주소가 있으면 우선 사용)
    const addressInfo = tempAddress || userProfile;
    if (
      !addressInfo ||
      !addressInfo.postalCode ||
      !addressInfo.address ||
      !addressInfo.detailedAddress ||
      !addressInfo.username
    ) {
      alert("배송지 정보를 정확히 입력해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      // 쿠폰이 선택되어 있으면 Firestore에서 삭제
      if (selectedCoupon && userUid) {
        const collectionType = selectedCoupon.collectionType || "wonCoupons";
        await deleteDoc(
          doc(db, "users", userUid, collectionType, selectedCoupon.id)
        );
        console.log("사용된 쿠폰 삭제 완료");
      }

      // 주문내역 객체 생성 (최상위 컬렉션 'orderItems'에 저장)
      const purchasedOrder = {
        userId: userUid,
        orderItems: orderItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          option: item.option || [],
          thumbnail: item.thumbnail || null,
        })),
        coupon: selectedCoupon
          ? { id: selectedCoupon.id, title: selectedCoupon.title }
          : null,
        productPrice,
        discount,
        totalPrice,
        address: {
          postalCode: addressInfo.postalCode,
          address: addressInfo.address,
          detailedAddress: addressInfo.detailedAddress,
          recipientName: addressInfo.username,
          phoneNumber: addressInfo.phoneNumber || null,
        },
        status: "pending", // 주문 상태 초기값
        purchasedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orderItems"), purchasedOrder);
      console.log("주문 내역 Firestore 저장 완료 (orderItems)");

      // 결제 완료 후 상태 초기화
      clearCart();
      localStorage.removeItem("cartItems");
      localStorage.removeItem("appliedCoupon");

      alert("결제가 완료되었습니다.");
      navigate("/store");
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      alert("결제 중 문제가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsProcessing(false);
    }
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
              <ListMiddle>
                <Listimg src={LogonRookielogo} alt="LogonRookielogo" />
              </ListMiddle>
            )}
          </Items>
        </List>
      </Section>

      <WingBanner
        page="payment"
        productPrice={productPrice}
        selectedCoupon={selectedCoupon}
        onCouponChange={handleCouponChange}
        coupons={availableCoupons}
        onPaymentSubmit={handlePaymentSubmit}
        isProcessing={isProcessing}
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
