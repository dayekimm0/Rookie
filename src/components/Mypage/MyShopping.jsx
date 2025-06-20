import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductItem from "../Cart/ProductItem";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner_rookie from "../../images/banners/banner_rookie.png";
import authStore from "../../stores/AuthStore";
import LogonRookielogo from "../../images/logos/Logon_Rookie_logo.svg";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const ProductPlus = styled.a`
  width: 100%;
  height: 60px;
  font-size: 1.4rem;
  border: 1px solid var(--grayD);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: border 0.4s, background-color 0.4s;
  svg {
    margin: 0 6px 2px;
    path {
      fill: var(--gray6);
    }
  }
  &:hover {
    border: 1px solid var(--grayC);
    background-color: var(--grayFA);
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
  }
  @media screen and (max-width: 1024px) {
    height: 40px;
    font-size: 1.2rem;
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
    height: 100%;
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
      margin-left: 18px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1024px) {
    height: 60px;
    font-size: 1.6rem;
    div {
      a {
        font-size: 1rem;
        padding: 8px 14px;
        margin-left: 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    height: 90px;
    font-size: 1.4rem;
    div {
      width: 240px;
      text-align: center;
      line-height: 180%;
      a {
        font-size: 0.8rem;
        padding: 8px 12px;
        margin-left: 6px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    height: 60px;
    font-size: 1.2rem;
    div {
      width: 100%;
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
  @media screen and (max-width: 768px) {
    gap: 30px;
  }
  @media screen and (max-width: 600px) {
    gap: 20px;
  }
  @media screen and (max-width: 550px) {
    gap: 15px;
  }
  @media screen and (max-width: 500px) {
    gap: 30px;
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
      font-size: 2.2rem;
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
    li {
      h2 {
        font-size: 1.8rem;
      }
    }
  }

  @media screen and (max-width: 500px) {
    li {
      h2 {
        font-size: 1.4rem;
      }
    }
  }
`;

const Items = styled.div`
  width: calc(100% + 15px);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1024px) {
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
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

const MyShopping = () => {
  const { userProfile } = authStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saveOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setOrders(saveOrders);
  }, []);

  const allOrderItems = orders.flatMap((order) => order.orderItems);

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
        <Items>
          {allOrderItems.length > 0 ? (
            allOrderItems.map((item) => (
              <ProductItem key={item.id} item={item} page="mypage" />
            ))
          ) : (
            <ListMiddle>
              <Listimg src={LogonRookielogo} alt="LogonRookielogo" />
            </ListMiddle>
          )}
        </Items>
      </List>
    </Inner>
  );
};

export default MyShopping;
