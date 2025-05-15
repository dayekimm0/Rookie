import React from "react";
import styled from "styled-components";
import ProductItem from "../components/Cart/ProductItem";
import WingBanner from "../components/Cart/WingBanner";
import CartMenuBar from "../components/Cart/CartMenuBar";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  font-family: "Pretendard";
  display: flex;
  /* align-items: flex-start; */
  align-items: end;
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
  margin-top: 5%;
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

const Items = styled.div.attrs({
  "data-lenis-prevent": true,
})`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  gap: 20px;
  overflow-y: auto;

  @media screen and (max-width: 1024px) {
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    max-height: 100%;
    gap: 20px;
    overflow-y: visible;
  }

  @media screen and (max-width: 375px) {
    gap: 20px;
  }
`;

const Cart = () => {
  return (
    <Container>
      <Section>
        <Title>Shopping Cart</Title>
        <List>
          <CartMenuBar />
          <Items>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </Items>
        </List>
      </Section>
      <WingBanner page="cart" />
    </Container>
  );
};

export default Cart;
