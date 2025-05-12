import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 5%;
  font-family: "Pretendard";
`;

const ItemList = styled.div`
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
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Menu = styled.div`
  width: 100%;
  max-width: 1010px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      font-size: 1.8rem;
      font-weight: 600;
      &:nth-child(1) {
        width: 100%;
        max-width: 140px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      &:nth-child(2) {
        width: 100%;
        max-width: 300px;
      }
      &:nth-child(3) {
        width: 100%;
        max-width: 100px;
        display: flex;
        justify-content: center;
      }
      &:nth-child(4) {
        width: 100%;
        max-width: 100px;
        display: flex;
        justify-content: center;
      }
      &:nth-child(5) {
        width: 100%;
        max-width: 100px;
        display: flex;
        justify-content: center;
      }
    }
  }
  span {
    width: 100%;
    height: 1px;
    background: var(--gray1);
  }
`;

const CustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1px solid var(--grayD);
  cursor: pointer;
  position: relative;
  &:checked {
    background: var(--main);
    border: none;
  }
  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 11px;
    border: solid var(--light);
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -70%) rotate(45deg);
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .option-list {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 1.4rem;
    }
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  max-width: 140px;
  height: 140px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  input[type="checkbox"] {
    position: absolute;
    top: 2%;
    left: 2%;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  background: var(--dark);
  object-fit: cover;
`;

const ItemInfo = styled.ul`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TeamName = styled.li`
  width: 100%;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductName = styled.li`
  width: 100%;
  font-size: 1.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemOption = styled.ul`
  width: 100%;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OptionChange = styled.button`
  width: 100%;
  height: 37px;
  background: var(--grayF5);
  border: none;
  border-radius: 4px;
  font-family: "Pretendard";
  font-size: 1.4rem;
  cursor: pointer;
`;

const ItemPrice = styled.p`
  width: 100%;
  max-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;

const MultiPrice = styled.p`
  width: 100%;
  max-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;

const WingBanner = styled.form`
  position: fixed;
  top: 35%;
  right: 5%;
  width: 100%;
  max-width: 570px;
  padding: 60px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--grayFA);
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
`;

const SaleInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CouponList = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  background: var(--light);
`;

const PriceInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  span {
    width: 100%;
    height: 1px;
    background: var(--grayC);
  }
`;

const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      font-size: 1.4rem;
    }
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  p {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  input {
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 4px;
    font-size: 1.8rem;
    font-weight: 500;
    cursor: pointer;
    &:nth-child(1) {
      background: var(--main);
    }
    &:nth-child(2) {
      background: var(--dark);
      color: var(--light);
    }
  }
`;

const Cart = () => {
  return (
    <Container>
      <ItemList>
        <Title>Shopping Cart</Title>
        <Items>
          <Menu>
            <ul>
              <li>
                <CustomCheckbox type="checkbox" />
                <p>전체선택</p>
              </li>
              <li>상품정보</li>
              <li>옵션</li>
              <li>상품금액</li>
              <li>결제금액</li>
            </ul>
            <span></span>
          </Menu>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <li className="option-list">
                <p className="size">사이즈 [XL]</p>
                <p className="quantity">1개</p>
              </li>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
        </Items>
      </ItemList>
      <WingBanner>
        <SaleInfo>
          <SubTitle>할인 정보</SubTitle>
          <CouponList>
            <h2>사용 가능한 쿠폰 3장</h2>
          </CouponList>
        </SaleInfo>
        <PriceInfo>
          <SubTitle>결제 정보</SubTitle>
          <PriceList>
            <ul>
              <li>상품금액</li>
              <li>50,000원</li>
            </ul>
            <ul>
              <li>할인금액</li>
              <li>2,000원</li>
            </ul>
            <ul>
              <li>배송비</li>
              <li>무료</li>
            </ul>
          </PriceList>
          <span></span>
          <TotalPrice>
            <p>총 결제금액</p>
            <p>48,000원</p>
          </TotalPrice>
        </PriceInfo>
        <Buttons>
          <input type="submit" value="선택상품주문" />
          <input type="submit" value="선택상품주문" />
        </Buttons>
      </WingBanner>
    </Container>
  );
};

export default Cart;
