import React from "react";
import styled from "styled-components";

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

const DeliveryInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1010px;
  gap: 20px;
  span {
    width: 100%;
    height: 1px;
    background: var(--gray1);
  }
`;

const InfoTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  padding-left: 1%;
  margin-bottom: 1%;
`;

const DeliveryTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  transform: translateY(150%);
`;

const DeliveryDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 0 1%;
`;

const Input = styled.input`
  width: 100%;
  max-width: 800px;
  height: 70px;
  padding-left: 2%;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 400;
  &::placeholder {
    opacity: 1;
    font-family: "Pretendard";
    font-size: 1.6rem;
    font-weight: 400;
    transition: all 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }
`;

const DeliveryPlace = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostInput = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  input[type="text"] {
    width: 100%;
    max-width: 540px;
  }
  input[type="button"] {
    width: 100%;
    max-width: 240px;
    background: var(--dark);
    color: var(--light);
    cursor: pointer;
  }
`;

const CallInput = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  select {
    width: 100%;
    padding: 0 2%;
    background: var(--grayF5);
    border: 1px solid var(--grayC);
    border-radius: 4px;
    font-family: "Pretendard";
    font-size: 1.6rem;
    font-weight: 400;
  }
  input[type="text"] {
    padding: 0;
    text-align: center;
  }
`;

const Request = styled.select`
  width: 100%;
  max-width: 800px;
  height: 70px;
  padding: 0 2%;
  background: var(--grayF5);
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-family: "Pretendard";
  font-size: 1.6rem;
  font-weight: 400;
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

const Button = styled.input`
  width: 450px;
  height: 60px;
  border: none;
  border-radius: 4px;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--main);
`;

const Payment = () => {
  return (
    <Container>
      <ItemList>
        <Title>Payment</Title>
        <DeliveryInfo>
          <InfoTitle>배송지 정보</InfoTitle>
          <span></span>
          <DeliveryDetail>
            <DeliveryTitle>배송지명</DeliveryTitle>
            <Input placeholder="배송지 이름을 입력해주세요." />
          </DeliveryDetail>
          <DeliveryDetail>
            <DeliveryTitle>수령인</DeliveryTitle>
            <Input placeholder="수령인 이름을 입력해주세요." />
          </DeliveryDetail>
          <DeliveryDetail>
            <DeliveryTitle>배송주소</DeliveryTitle>
            <DeliveryPlace>
              <PostInput>
                <Input type="text" placeholder="우편번호" />
                <Input type="button" value="우편번호 검색" />
              </PostInput>
              <Input placeholder="주소" />
              <Input placeholder="상세주소" />
            </DeliveryPlace>
          </DeliveryDetail>
          <DeliveryDetail>
            <DeliveryTitle>연락처</DeliveryTitle>
            <CallInput>
              <select>
                <option selected disabled></option>
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="012">012</option>
                <option value="013">013</option>
              </select>
              <Input type="text" placeholder="1234" />
              <Input type="text" placeholder="5678" />
            </CallInput>
          </DeliveryDetail>
          <DeliveryDetail>
            <DeliveryTitle>수령인</DeliveryTitle>
            <Request>
              <option selected disabled>
                배송 요청사항을 선택해주세요.
              </option>
              <option value="guard">경비실에 맡겨주세요.</option>
              <option value="door">문 앞에 놔주세요.</option>
              <option value="call">배송 전에 연락 주세요.</option>
              <option value="box">택배함에 넣어주세요.</option>
            </Request>
          </DeliveryDetail>
        </DeliveryInfo>
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
        <Button type="submit" value="결제하기" />
      </WingBanner>
    </Container>
  );
};

export default Payment;
