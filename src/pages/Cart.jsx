import React, { useState } from "react";
import styled from "styled-components";
import ProductItem from "../components/Cart/ProductItem";
import WingBanner from "../components/Cart/WingBanner";
import CartMenuBar from "../components/Cart/CartMenuBar";
import { mockItems } from "../components/Cart/MockupData";

const Container = styled.div.attrs({
  "data-lenis-prevent": true,
})`
  width: 100%;
  padding: 0 5%;
  font-family: "Pretendard";
  display: flex;
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

const Items = styled.div`
  width: calc(100% + 15px);
  display: flex;
  flex-direction: column;
  height: 400px;
  gap: 20px;
  overflow-y: auto;

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
    height: 320px;
    gap: 15px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    gap: 20px;
    overflow-y: visible;
  }

  @media screen and (max-width: 375px) {
    gap: 20px;
  }
`;

const Cart = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggleAll = (isChecked) => {
    setCheckedItems(isChecked ? mockItems.map((item) => item.id) : []);
  };

  const handleToggleItem = (itemId) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <Container>
      <Section>
        <Title>Shopping Cart</Title>
        <List>
          <CartMenuBar
            allChecked={checkedItems.length === mockItems.length}
            onToggleAll={handleToggleAll}
          />
          <Items>
            {mockItems.map((item) => (
              <ProductItem
                key={item.id}
                item={item}
                isChecked={checkedItems.includes(item.id)}
                onToggle={() => handleToggleItem(item.id)}
              />
            ))}
          </Items>
        </List>
      </Section>
      <WingBanner page="cart" />
    </Container>
  );
};

export default Cart;
