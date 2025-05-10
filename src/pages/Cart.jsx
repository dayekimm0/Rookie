import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 5%;
  font-family: "Pretendard";
  display: flex;
  gap: 10%;
  align-items: start;

  @media screen and (max-width: 1800px) {
    gap: 9%;
  }

  @media screen and (max-width: 1700px) {
    gap: 8%;
  }

  @media screen and (max-width: 1600px) {
    gap: 7%;
  }

  @media screen and (max-width: 1500px) {
    gap: 6%;
  }

  @media screen and (max-width: 1440px) {
    gap: 5%;
    padding: 0 3%;
  }

  @media screen and (max-width: 1024px) {
    gap: 4%;
  }

  @media screen and (max-width: 960px) {
    gap: 3%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;

const ItemList = styled.div`
  width: 100%;
  max-width: 1010px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-top: 5%;

  @media screen and (max-width: 1440px) {
    max-width: 810px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 610px;
  }
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
      width: 100px;
      display: flex;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 600;
      &:nth-child(1) {
        width: 100%;
        max-width: 140px;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 5px;
        input[type="checkbox"] {
          margin-left: 5%;
        }
      }
      &:nth-child(2) {
        width: 300px;
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }
  }
  span {
    width: 100%;
    height: 1px;
    background: var(--gray1);
  }

  @media screen and (max-width: 1600px) {
    ul {
      li {
        &:nth-child(2) {
          width: 260px;
        }
      }
    }
  }

  @media screen and (max-width: 1500px) {
    ul {
      li {
        &:nth-child(2) {
          width: 240px;
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    ul {
      li {
        width: 90px;
        font-size: 1.6rem;
        &:nth-child(1) {
          width: 120px;
        }
        &:nth-child(2) {
          width: 200px;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    ul {
      li {
        &:nth-child(1) {
          width: 120px;
        }
        &:nth-child(2) {
          width: 200px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    ul {
      li {
        font-size: 1.4rem;
        &:nth-child(1) {
          width: 100px;
        }
        &:nth-child(2) {
          width: 180px;
        }
      }
    }
  }

  @media screen and (max-width: 960px) {
    ul {
      li {
        width: 70px;
        font-size: 1.2rem;
        &:nth-child(2) {
          width: 120px;
        }
      }
    }
  }
`;

const CustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1px solid var(--grayD);
  border-radius: 2px;
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

  @media screen and (max-width: 1440px) {
    width: 16px;
    height: 16px;
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
  width: 140px;
  height: 140px;
  position: relative;
  border: none;
  input[type="checkbox"] {
    position: absolute;
    top: 2%;
    left: 2%;
    border-radius: 2px;
  }

  @media screen and (max-width: 1440px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }
`;

const ItemImage = styled.img`
  width: 140px;
  height: 100%;

  @media screen and (max-width: 1440px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }
`;

const ItemInfo = styled.ul`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 1600px) {
    width: 260px;
  }

  @media screen and (max-width: 1500px) {
    width: 240px;
  }

  @media screen and (max-width: 1440px) {
    width: 200px;
  }

  @media screen and (max-width: 1024px) {
    width: 180px;
  }

  @media screen and (max-width: 960px) {
    width: 120px;
  }
`;

const TeamName = styled.li`
  width: 100%;
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 1440px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }
`;

const ProductName = styled.li`
  width: 100%;
  font-size: 1.8rem;

  @media screen and (max-width: 1440px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }
`;

const ItemOption = styled.div`
  width: 100%;
  width: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  @media screen and (max-width: 1440px) {
    width: 90px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    width: 70px;
    font-size: 1rem;
  }
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

  @media screen and (max-width: 1024px) {
    height: 30px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }
`;

const ItemPrice = styled.p`
  width: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;

  @media screen and (max-width: 1440px) {
    width: 90px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    width: 70px;
    font-size: 1rem;
  }
`;

const MultiPrice = styled.p`
  width: 100%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;

  @media screen and (max-width: 1440px) {
    width: 90px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    width: 70px;
    font-size: 1rem;
  }
`;

const WingBanner = styled.form`
  position: sticky;
  top: 20%;
  width: 100%;
  max-width: 570px;
  padding: 60px;
  margin-top: 10%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--grayFA);

  @media screen and (max-width: 1700px) {
    max-width: 480px;
    padding: 50px;
  }

  @media screen and (max-width: 1440px) {
    max-width: 360px;
    padding: 40px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 270px;
    padding: 30px;
    gap: 10px;
  }

  @media screen and (max-width: 768px) {
    max-width: 610px;
    padding: 10px;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;

  @media screen and (max-width: 1440px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 960px) {
    font-size: 1rem;
  }
`;

const SaleInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1024px) {
    gap: 10px;
  }
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

  @media screen and (max-width: 1440px) {
    height: 50px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 1024px) {
    height: 40px;
    font-size: 1rem;
  }
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

  @media screen and (max-width: 1024px) {
    gap: 10px;
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

  @media screen and (max-width: 1440px) {
    ul {
      li {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    ul {
      li {
        font-size: 1rem;
      }
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

  @media screen and (max-width: 1440px) {
    p {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 1024px) {
    p {
      font-size: 1.2rem;
    }
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

    @media screen and (max-width: 1440px) {
      height: 50px;
      font-size: 1.2rem;
    }

    @media screen and (max-width: 1024px) {
      height: 40px;
      font-size: 1rem;
    }

    @media screen and (max-width: 960px) {
      height: 30px;
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
              <ItemImage src="https://twinscorestore.co.kr/web/product/big/202504/5e799a1aeb0467ed583120db13e790db.jpg" />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <ul>
                <li className="size">XL</li>
                <li>/</li>
                <li className="quantity">1개</li>
              </ul>
              <OptionChange>옵션 변경</OptionChange>
            </ItemOption>
            <ItemPrice>50,000원</ItemPrice>
            <MultiPrice>50,000원</MultiPrice>
          </Item>
          <Item>
            <Thumbnail>
              <ItemImage src="https://twinscorestore.co.kr/web/product/big/202504/afe063e607c5f8c4ff6fda3a8c4fb1ed.jpg" />
              <CustomCheckbox type="checkbox" />
            </Thumbnail>
            <ItemInfo>
              <TeamName>LG트윈스</TeamName>
              <ProductName>
                최고심 콜라보 반팔티셔츠(내가엘지팬하는이유)
              </ProductName>
            </ItemInfo>
            <ItemOption>
              <ul>
                <li className="size">XL</li>
                <li>/</li>
                <li className="quantity">1개</li>
              </ul>
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
          <input type="submit" value="전체상품주문" />
        </Buttons>
      </WingBanner>
    </Container>
  );
};

export default Cart;
