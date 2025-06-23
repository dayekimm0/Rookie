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

  @media screen and (max-width: 375px) {
    font-size: 1.4rem;
  }
`;

const WarningText = styled.p`
  width: 100%;
  max-width: 800px;
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--red);

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
  transform: translateX(-4px);
  &:focus {
    outline: none;
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

const RequestInput = styled.input`
  width: 100%;
  max-width: 800px;
  color: ${({ isRequestPlaceholder }) =>
    isRequestPlaceholder ? "var(--grayC)" : "var(--dark)"};
  border: 1px solid var(--grayC);
  border: none;
  font-family: "Pretendard";
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 2px;
  padding-top: 1px;
  transform: translateX(-4px);
  &:focus {
    outline: none;
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

const MyAddress = () => {
  const [selectValue, setSelectValue] = useState("");
  const [customOptionText, setCustomOptionText] = useState("직접 입력할게요.");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustomInput(true);
      setSelectValue("custom");
      setCustomOptionText("직접 입력할게요.");
    } else {
      setShowCustomInput(false);
      setSelectValue(value);
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomOptionText(e.target.value);
  };

  const handleCustomInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (customOptionText.trim() !== "") {
        setSelectValue("custom");
        setShowCustomInput(false);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const { userProfile, tempAddress, isLoading } = authStore();

  if (isLoading || !userProfile) {
    return <p>배송지 정보를 불러오는 중입니다...</p>;
  }

  const username = tempAddress?.username ?? userProfile.username;
  const postalCode = tempAddress?.postalCode ?? userProfile.postalCode;
  const address = tempAddress?.address ?? userProfile.address;
  const detailedAddress =
    tempAddress?.detailedAddress ?? userProfile.detailedAddress;
  const phoneNumber = tempAddress?.phoneNumber ?? userProfile.phoneNumber;

  const hasTempAddress =
    tempAddress &&
    postalCode?.trim() !== "" &&
    address?.trim() !== "" &&
    detailedAddress?.trim() !== "";

  const hasUserAddress =
    userProfile.postalCode?.trim() !== "" &&
    userProfile.address?.trim() !== "" &&
    userProfile.detailedAddress?.trim() !== "";

  return (
    <AddressInfo onSubmit={handleFormSubmit}>
      <AddressDetail>
        <AddressTitle>수령인</AddressTitle>
        <Information>{username}</Information>
      </AddressDetail>

      <AddressDetail>
        <AddressTitle>배송주소</AddressTitle>
        <AddressPlace>
          {hasTempAddress || hasUserAddress ? (
            <>
              <Information>{postalCode || "우편번호 없음"}</Information>
              <Information>{address || "주소 없음"}</Information>
              <Information>{detailedAddress || "상세주소 없음"}</Information>
            </>
          ) : (
            <WarningText>주소를 입력해주세요.</WarningText>
          )}
        </AddressPlace>
      </AddressDetail>

      <AddressDetail>
        <AddressTitle>연락처</AddressTitle>
        <Information>{phoneNumber}</Information>
      </AddressDetail>

      <AddressDetail>
        <AddressTitle>요청사항</AddressTitle>
        {!showCustomInput && (
          <Request
            value={selectValue}
            onChange={handleSelectChange}
            isRequestPlaceholder={selectValue === ""}
          >
            <option value="" disabled>
              배송 요청사항을 선택해주세요.
            </option>
            <option value="경비실에 맡겨주세요.">경비실에 맡겨주세요.</option>
            <option value="문 앞에 놔주세요.">문 앞에 놔주세요.</option>
            <option value="배송 전에 연락 주세요.">
              배송 전에 연락 주세요.
            </option>
            <option value="택배함에 넣어주세요.">택배함에 넣어주세요.</option>
            <option value="custom">{customOptionText}</option>
          </Request>
        )}

        {showCustomInput && (
          <RequestInput
            type="text"
            placeholder="요청사항을 입력하세요"
            value={customOptionText}
            onChange={handleCustomInputChange}
            onKeyDown={handleCustomInputKeyDown}
            autoFocus
          />
        )}
      </AddressDetail>
    </AddressInfo>
  );
};

export default MyAddress;
