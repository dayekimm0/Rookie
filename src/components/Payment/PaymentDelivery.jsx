import React, { useState } from "react";
import styled from "styled-components";

const DeliveryInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
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

const DeliveryTitle = styled.h2`
  width: 80px;
  font-size: 1.6rem;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    width: 70px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    width: 80px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    width: 70px;
    font-size: 1.4rem;
  }
`;

const DeliveryDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10%;
  &:nth-child(4) {
    align-items: start;
    h2 {
      transform: translateY(100%);
    }
  }

  @media screen and (max-width: 1024px) {
    gap: 5%;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 800px;
  height: 60px;
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
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
  }

  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
`;

const DeliveryPlace = styled.div`
  width: 100%;
  max-width: 800px;
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

const PostInput = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  input[type="text"] {
    width: 70%;
  }
  input[type="button"] {
    width: 30%;
    background: var(--dark);
    color: var(--light);
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    gap: 15px;
    input {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 768px) {
    gap: 20px;
    input {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 375px) {
    gap: 15px;
    input {
      font-size: 1.4rem;
    }
  }
`;

const PhoneInput = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: 20px;
  input[type="text"] {
    padding: 0;
    text-align: center;
  }

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

const Request = styled.select`
  width: 100%;
  max-width: 800px;
  height: 60px;
  padding: 0 2%;
  background: ${({ isRequestPlaceholder }) =>
    isRequestPlaceholder ? "var(--grayF5)" : "var(--light)"};
  color: ${({ isRequestPlaceholder }) =>
    isRequestPlaceholder ? "var(--grayC)" : "var(--dark)"};
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-family: "Pretendard";
  font-size: 1.6rem;
  font-weight: 400;

  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const PaymentAddress = () => {
  const [request, setRequest] = useState("배송 요청사항을 입력해주세요.");
  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  const handlePhone1Change = (e) => {
    setPhone1(e.target.value.replace(/\D/g, ""));
  };
  const handlePhone2Change = (e) => {
    setPhone2(e.target.value.replace(/\D/g, ""));
  };
  const handlePhone3Change = (e) => {
    setPhone3(e.target.value.replace(/\D/g, ""));
  };

  return (
    <DeliveryInfo>
      <InfoTitle>
        <h2>배송지 정보</h2>
        <span></span>
      </InfoTitle>
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
            <Input type="button" value="검색" />
          </PostInput>
          <Input placeholder="주소" />
          <Input placeholder="상세주소" />
        </DeliveryPlace>
      </DeliveryDetail>
      <DeliveryDetail>
        <DeliveryTitle>연락처</DeliveryTitle>
        <PhoneInput>
          <Input
            type="text"
            maxLength={3}
            value={phone1}
            onChange={handlePhone1Change}
          />
          <Input
            type="text"
            maxLength={4}
            value={phone2}
            onChange={handlePhone2Change}
          />
          <Input
            type="text"
            maxLength={4}
            value={phone3}
            onChange={handlePhone3Change}
          />
        </PhoneInput>
      </DeliveryDetail>
      <DeliveryDetail>
        <DeliveryTitle>요청사항</DeliveryTitle>
        <Request
          value={request}
          onChange={handleRequestChange}
          isRequestPlaceholder={request === "배송 요청사항을 선택해주세요."}
        >
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
  );
};

export default PaymentAddress;
