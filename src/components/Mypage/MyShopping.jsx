import { useLocation } from "react-router-dom";
import ProductItem from "../Cart/ProductItem";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner_rookie from "../../images/banners/banner_rookie.png";
import authStore from "../../stores/AuthStore";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const ProductPlus = styled.a`
  width: 100%;
  height: 60px;
  font-size: 1.4rem;
  border: 1px solid var(--grayC);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  svg {
    margin: 0 6px 2px;
    path {
      fill: var(--gray3);
    }
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 74px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
  }
  div {
    z-index: 1;
    b {
      font-weight: bold;
    }
    a {
      background: var(--gray2);
      color: var(--light);
      font-size: 1.2rem;
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      margin-left: 22px;
      cursor: pointer;
    }
  }
`;

const MyShoppingInner = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 60px;
  @media screen and (max-width: 1024px) {
    gap: 40px;
  }
  @media screen and (max-width: 500px) {
    gap: 35px;
  }
`;

const MyShoppingDetail = styled.h6`
  font-size: 1.2rem;
  line-height: 2.5;
  b {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
    b {
      font-size: 1.6rem;
    }
  }
`;

const MyShoppingLine = styled.span`
  width: 1px;
  height: 54px;
  background: var(--dark);
  @media screen and (max-width: 1024px) {
    height: 48px;
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

const MyShopping = () => {
  const { userProfile } = authStore();
  const location = useLocation();
  const orderItems = location.state?.orderItems || [];
  const productPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Inner>
      {userProfile.email === "gosim@naver.com" ||
      userProfile.email === "mangom@daum.net" ? (
        <ProductPlus
          href="https://docs.google.com/forms/d/e/1FAIpQLScLQEzsdPMIHZiFxtQlq50tSpVLsZtvmxE3anLsND5uvQAQiw/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rookie 상품등록 <FontAwesomeIcon icon={faPlus} />
        </ProductPlus>
      ) : (
        <Banner>
          <img src={banner_rookie} alt="banner_rookie" />
          <div>
            함께해요! <b>Rookie 파트너</b>에 신청하세요!{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfS2-2IsVBBub-rmSk97nz1Fsw0eYLMsd5iOHtNdUNwH1HgKQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              신청하기
            </a>
          </div>
        </Banner>
      )}

      <MyShoppingInner>
        <MyShoppingDetail>
          <b>2</b>
          <br />
          장바구니
        </MyShoppingDetail>
        <MyShoppingLine />
        <MyShoppingDetail>
          <b>1</b>
          <br />
          구매완료
        </MyShoppingDetail>
        <MyShoppingLine />
        <MyShoppingDetail>
          <b>0</b>
          <br />
          배송완료
        </MyShoppingDetail>
        <MyShoppingLine />
        <MyShoppingDetail>
          <b>1</b>
          <br />
          쿠폰
        </MyShoppingDetail>
      </MyShoppingInner>
      <List>
        <InfoTitle>
          <li>
            <h2>구매내역</h2>
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
    </Inner>
  );
};

export default MyShopping;
