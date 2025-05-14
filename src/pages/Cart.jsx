import React from "react";
import styled from "styled-components";
import CartItem from "../components/Cart/CartItem";
import CartBanner from "../components/Cart/CartBanner";
import CartMenuBar from "../components/Cart/CartMenuBar";

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Cart = () => {
  return (
    <Container>
      <Section>
        <Title>Shopping Cart</Title>
        <List>
          <CartMenuBar />
          <Items>
            <CartItem />
          </Items>
        </List>
      </Section>
      <CartBanner />
    </Container>
  );
};

export default Cart;
