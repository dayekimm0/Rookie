import React, { useState } from "react";
import styled from "styled-components";
import authStore from "../../stores/AuthStore";

const AddressInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;

  & > div:nth-child(2) h2 {
    align-self: start;
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

const AddressTitle = styled.h2`
  width: 80px;
  font-size: 1.6rem;
  font-weight: 600;
  align-self: center;

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

const AddressDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10%;

  @media screen and (max-width: 1024px) {
    gap: 5%;
  }
`;

const Information = styled.p`
  width: 100%;
  max-width: 800px;
  font-size: 1.6rem;
  font-weight: 400;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const AddressPlace = styled.div`
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

const Request = styled.select`
  width: 100%;
  max-width: 800px;
  color: ${({ isRequestPlaceholder }) =>
    isRequestPlaceholder ? "var(--grayC)" : "var(--dark)"};
  border: 1px solid var(--grayC);
  border: none;
  font-family: "Pretendard";
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  &:focus {
    outline: none;
  }
  transform: translateX(-4px);

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

const MyAddress = () => {
  const [request, setRequest] = useState("배송 요청사항을 선택해주세요.");
  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const { userProfile, isLoading } = authStore();

  if (isLoading || !userProfile) {
    return <p>배송지 정보를 불러오는 중입니다...</p>;
  }

  return (
    <AddressInfo>
      <AddressDetail>
        <AddressTitle>수령인</AddressTitle>
        <Information>{userProfile.username}</Information>
      </AddressDetail>
      <AddressDetail>
        <AddressTitle>배송주소</AddressTitle>
        <AddressPlace>
          <Information> {userProfile.postalCode}</Information>
          <Information> {userProfile.address}</Information>
          <Information> {userProfile.detailedAddress}</Information>
        </AddressPlace>
      </AddressDetail>
      <AddressDetail>
        <AddressTitle>연락처</AddressTitle>
        <Information>{userProfile.phoneNumber}</Information>
      </AddressDetail>
      <AddressDetail>
        <AddressTitle>요청사항</AddressTitle>
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
      </AddressDetail>
    </AddressInfo>
  );
};

export default MyAddress;
