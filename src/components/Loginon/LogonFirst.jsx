import { useState, useEffect } from "react";
import styled from "styled-components";

import RBarrow from "../../images/icons/RBarrow_logo.svg";
import logon_check from "../../images/icons/logon_check.svg";
import LogonModal from "./LogonModal";
import logonStore from "../../stores/LogonStore";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const AllCheckWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    gap: 16px;
  }
  @media screen and (max-width: 600px) {
    gap: 12px;
  }
`;

const CheckWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-right: 10px;
  @media screen and (max-width: 1024px) {
    padding-right: 8px;
  }
  @media screen and (max-width: 600px) {
    padding-right: 6px;
  }
`;

const Checkoption = styled.div`
  display: flex;
  justify-content: start;
  gap: 5px;
`;

const CheckCircle = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid
    ${({ checked }) => (checked ? "var(--dark)" : "var(--grayC)")};
  border-radius: 50%;
  position: relative;
  img {
    position: absolute;
    left: 1px;
    display: ${({ checked }) => (checked ? "block" : "none")};
  }
`;

const CheckText = styled.h5`
  font-size: 1.6rem;
  span {
    color: var(--red);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: var(--dark);
`;

const LoginBtn = styled.button`
  width: 100%;
  height: 70px;
  background: var(--grayE);
  border: none;
  border-radius: 4px;
  font-size: 2.4rem;
  color: ${({ $valid }) => ($valid ? "var(--light)" : "var(--grayC)")};
  cursor: pointer;
  margin-top: 30px;
  background: ${({ $valid }) => ($valid ? "var(--dark)" : "var(--grayE)")};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ $valid }) =>
      $valid ? "var(--gray2)" : "var(--grayE)"};
  }
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.2rem;
  }
`;

const LogonFirst = () => {
  const { formData, setFormData, nextStep } = logonStore();
  const [isFormValid, setIsFormValid] = useState(false);
  const [modalState, setModalState] = useState({
    required: false,
    privacy: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleCheck = (key) => {
    setFormData({
      agreements: {
        ...formData.agreements,
        [key]: !formData.agreements[key],
        ...(key === "all" && {
          required: !formData.agreements.all,
          privacy: !formData.agreements.all,
          promotion: !formData.agreements.all,
        }),
        ...(key !== "all" && {
          all:
            (key === "required"
              ? !formData.agreements.required
              : formData.agreements.required) &&
            (key === "privacy"
              ? !formData.agreements.privacy
              : formData.agreements.privacy) &&
            (key === "promotion"
              ? !formData.agreements.promotion
              : formData.agreements.promotion),
        }),
      },
    });
  };

  useEffect(() => {
    const isValid = formData.agreements.required && formData.agreements.privacy;

    setIsFormValid(isValid);
  }, [formData]);

  const openModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AllCheckWrapper>
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.all}
              onClick={() => handleCheck("all")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText
              checked={formData.agreements.all}
              onClick={() => handleCheck("all")}
            >
              필수 및 선택 사항에 모두 동의합니다.
            </CheckText>
          </Checkoption>
        </CheckWrapper>
        <Line />
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.required}
              onClick={() => handleCheck("required")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText
              checked={formData.agreements.required}
              onClick={() => handleCheck("required")}
            >
              [필수] 이용약관에 동의합니다. <span>*</span>
            </CheckText>
          </Checkoption>
          <img
            src={RBarrow}
            alt="RBarrow"
            onClick={() => openModal("required")}
          />
        </CheckWrapper>
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.privacy}
              onClick={() => handleCheck("privacy")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText
              checked={formData.agreements.privacy}
              onClick={() => handleCheck("privacy")}
            >
              [필수] 개인정보 수집 및 이용에 동의 합니다. <span>*</span>
            </CheckText>
          </Checkoption>
          <img
            src={RBarrow}
            alt="RBarrow"
            onClick={() => openModal("privacy")}
          />
        </CheckWrapper>
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.promotion}
              onClick={() => handleCheck("promotion")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText
              checked={formData.agreements.promotion}
              onClick={() => handleCheck("promotion")}
            >
              Rookie가 제공하는 이벤트 등 프로모션 안내 메일을 수신에
              동의합니다.
            </CheckText>
          </Checkoption>
        </CheckWrapper>
        {/* {errors.agreements && <ErrorMessage>{errors.agreements}</ErrorMessage>} */}
      </AllCheckWrapper>
      <LoginBtn type="submit" $valid={isFormValid} disabled={!isFormValid}>
        다음
      </LoginBtn>

      <LogonModal
        isOpen={modalState.required}
        closeModal={() => closeModal("required")}
        contentType="required"
      />
      <LogonModal
        isOpen={modalState.privacy}
        closeModal={() => closeModal("privacy")}
        contentType="privacy"
      />
    </Form>
  );
};

export default LogonFirst;
