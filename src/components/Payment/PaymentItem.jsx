import React from "react";
import styled from "styled-components";

const DeskTopGrid = `
  140px
  minmax(150px, 300px) 
  minmax(80px, 90px) 
  minmax(90px, 100px)
  minmax(100px, 110px)  
`;

const TabletGrid = `
  100px
  minmax(100px, 250px) 
  minmax(70px, 80px) 
  minmax(80px, 90px)
  minmax(90px, 100px)
`;

const Item = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${DeskTopGrid};
  justify-content: space-between;
  align-items: center;

  [class*="mobile"] {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: ${TabletGrid};
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-height: 200px;
    min-height: 100px;
    grid-template-columns: minmax(100px, 200px) minmax(200px, 400px);
    grid-auto-rows: min-content;
    justify-content: space-between;
    align-items: center;
    row-gap: 5px;

    [class*="mobile"] {
      display: block;
    }

    :nth-child(1) {
      grid-row: 1/5;
    }
    :nth-child(2) {
      justify-self: start;
      gap: 10px;
    }
    :nth-child(3) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      ul {
        justify-content: end;
        max-width: 80px;
        min-width: 60px;
        gap: 3px;
        height: min-content;
      }
      button {
        display: none;
      }
    }
    :nth-child(4) {
      display: flex;
      justify-content: space-between;
    }
    :nth-child(5) {
      display: flex;
      justify-content: space-between;
    }
    :nth-child(6) {
      justify-self: start;
    }
  }

  @media screen and (max-width: 375px) {
    grid-template-columns: 140px 200px;
    :nth-child(2) {
      gap: 5px;
    }
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemName = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TeamName = styled.li`
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.2rem;
  }
`;

const ProductName = styled.li`
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const ItemOption = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const SinglePrice = styled.li`
  font-size: 1.6rem;
  text-align: center;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const MultiPrice = styled.li`
  font-size: 1.6rem;
  text-align: center;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const PaymentItem = () => {
  return (
    <Item>
      <Thumbnail>
        <ItemImage src="https://twinscorestore.co.kr/web/product/big/202504/5e799a1aeb0467ed583120db13e790db.jpg" />
      </Thumbnail>
      <ItemName>
        <TeamName>LG트윈스</TeamName>
        <ProductName>최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)</ProductName>
      </ItemName>
      <ItemOption>
        <p className="mobile">옵션</p>
        <ul>
          <li className="size">XL</li>
          <li>/</li>
          <li className="quantity">10개</li>
        </ul>
      </ItemOption>
      <SinglePrice>
        <p className="mobile">상품금액</p>
        <p>100,000원</p>
      </SinglePrice>
      <MultiPrice>
        <p className="mobile">결제금액</p>
        <p>1,000,000원</p>
      </MultiPrice>
    </Item>
  );
};

export default PaymentItem;
