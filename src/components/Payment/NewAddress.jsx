import { useState, useEffect } from "react";
import styled from "styled-components";

const NewAddressInfo = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;

  @media screen and (max-width: 500px) {
    gap: 15px;
  }
`;

const NewAddressTitle = styled.h2`
  width: 80px;
  font-size: 1.6rem;
  font-weight: 600;
  align-self: start;
  transform: translateY(100%);

  @media screen and (max-width: 500px) {
    width: 70px;
    font-size: 1.4rem;
  }
`;

const NewAddressDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10%;
  &:nth-child(3) {
    align-items: start;
    h2 {
      transform: translateY(150%);
    }
  }

  @media screen and (max-width: 500px) {
    gap: 5%;
  }

  @media screen and (max-width: 500px) {
    &:nth-child(3) {
      h2 {
        transform: translateY(100%);
      }
    }
  }
`;

const Input = styled.input`
  width: 100%;
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
    font-size: 1.5rem;
    &::placeholder {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 500px) {
    height: 40px;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
`;

const NewAddressPlace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 500px) {
    gap: 15px;
  }
`;

const PostInput = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  input[type="text"] {
    width: 65%;
    font-size: 1.6rem;
  }
  input[type="button"] {
    width: 35%;
    background: var(--dark);
    color: var(--light);
    font-size: 1.4rem;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    input[type="text"] {
      font-size: 1.5rem;
    }
    input[type="button"] {
      font-size: 1.3rem;
    }
  }

  @media screen and (max-width: 500px) {
    gap: 15px;
    input[type="text"] {
      width: 60%;
      font-size: 1.4rem;
    }
    input[type="button"] {
      width: 40%;
      font-size: 1.2rem;
    }
  }
`;

const PhoneInput = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  input[type="text"] {
    padding: 0;
    text-align: center;
  }

  @media screen and (max-width: 500px) {
    gap: 15px;
  }
`;

const NewAddress = ({
  openPostModal,
  username,
  postalCode,
  address,
  detailAddress,
  phoneNumber,
  setSelectedAddress,
  onAddressSelect,
}) => {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  console.log(address);

  useEffect(() => {
    const phoneNumber = `${phone1}-${phone2}-${phone3}`;
    setSelectedAddress((prev) => ({
      ...prev,
      phoneNumber: phoneNumber,
    }));
  }, [phone1, phone2, phone3, setSelectedAddress]);

  return (
    <NewAddressInfo>
      <NewAddressDetail>
        <NewAddressTitle>수령인</NewAddressTitle>
        <Input
          placeholder="수령인 이름을 입력해주세요."
          value={username}
          onChange={(e) =>
            setSelectedAddress((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
      </NewAddressDetail>
      <NewAddressDetail>
        <NewAddressTitle>배송주소</NewAddressTitle>
        <NewAddressPlace>
          <PostInput>
            <Input
              type="text"
              placeholder="우편번호"
              value={postalCode}
              readOnly
            />
            <Input
              className="post_button"
              type="button"
              value="우편번호 검색"
              onClick={openPostModal}
            />
          </PostInput>
          <Input placeholder="주소" value={address} readOnly />
          <Input
            placeholder="상세주소"
            value={detailAddress}
            onChange={(e) =>
              setSelectedAddress((prev) => ({
                ...prev,
                detailAddress: e.target.value,
              }))
            }
          />
        </NewAddressPlace>
      </NewAddressDetail>
      <NewAddressDetail>
        <NewAddressTitle>연락처</NewAddressTitle>
        <PhoneInput>
          <Input
            type="text"
            maxLength={3}
            value={phone1}
            onChange={(e) => setPhone1(e.target.value.replace(/\D/g, ""))}
          />
          <Input
            type="text"
            maxLength={4}
            value={phone2}
            onChange={(e) => setPhone2(e.target.value.replace(/\D/g, ""))}
          />
          <Input
            type="text"
            maxLength={4}
            value={phone3}
            onChange={(e) => setPhone3(e.target.value.replace(/\D/g, ""))}
          />
        </PhoneInput>
      </NewAddressDetail>
    </NewAddressInfo>
  );
};

export default NewAddress;
