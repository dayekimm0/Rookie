import React from "react";
import styled from "styled-components";
import CustomCheckbox from "./CustomCheckbox";

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
  padding-bottom: 10px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 99%;
    border-bottom: 1px solid var(--grayC);
  }

  &:last-child:after {
    content: none;
  }

  [class*="mobile"] {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: ${TabletGrid};
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-height: 220px;
    min-height: 100px;
    grid-template-columns: minmax(100px, 200px) minmax(200px, 400px);
    grid-auto-rows: min-content;
    justify-content: space-between;
    align-items: center;
    row-gap: 5px;

    &:after {
      width: 100%;
    }

    [class*="mobile"] {
      display: block;
    }

    :nth-child(1) {
      grid-row: 1/6;
    }
    :nth-child(2) {
      justify-self: start;
      gap: 10px;
    }
    :nth-child(3) {
      display: flex;
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: min-content;
        p {
          &:nth-child(1) {
            text-align: start;
          }
          &:nth-child(2) {
            text-align: end;
          }
        }
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
  overflow: hidden;
  input {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ItemImage = styled.img`
  max-width: 100%;
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

const ItemOption = styled.ul`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  li {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    p {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
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

const OptionChangeButton = styled.button`
  width: 100%;
  height: 40px;
  background: var(--grayF5);
  border: none;
  border-radius: 4px;
  font-family: "Pretendard";
  font-size: 1.6rem;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    height: 30px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    height: 40px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    height: 30px;
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

const ProductItem = ({ item, isChecked, onToggle }) => {
  const { name, team, price, quantity, image } = item;

  return (
    <Item>
      <Thumbnail>
        {onToggle && <CustomCheckbox checked={isChecked} onChange={onToggle} />}
        <ItemImage src={image} alt={name} />
      </Thumbnail>
      <ItemName>
        <TeamName>{team}</TeamName>
        <ProductName>{name}</ProductName>
      </ItemName>
      <ItemOption>
        <li>
          <p className="mobile">옵션</p>
          <p className="option">54.양현종(양현종)</p>
        </li>
        <li>
          <p className="mobile">수량</p>
          <p className="quantity">{quantity}개</p>
        </li>
        <OptionChangeButton>옵션</OptionChangeButton>
      </ItemOption>
      <SinglePrice>
        <p className="mobile">상품가격</p>
        <p>{price.toLocaleString()}원</p>
      </SinglePrice>
      <MultiPrice>
        <p className="mobile">결제가격</p>
        <p>{(price * quantity).toLocaleString()}원</p>
      </MultiPrice>
      <OptionChangeButton className="mobile">옵션 변경</OptionChangeButton>
    </Item>
  );
};

export default ProductItem;
