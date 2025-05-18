import { useState, useEffect } from "react";
import styled from "styled-components";

import RBarrow from "../../images/icons/RBarrow_logo.svg";
import logon_check from "../../images/icons/logon_check.svg";
import LogonModal from "./LogonModal";

import logonStore from "../../stores/LogonStore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import DaumPostcode from "react-daum-postcode"

// styled 부분
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SubTWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 15px;
  @media screen and (max-width: 1024px) {
  gap: 12px;
  }  
  @media screen and (max-width: 500px) {
  gap: 10px;
  } 
`;

const Subsubtitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  span {
    font-weight: 400;
    color: var(--gray8);
  }
    @media screen and (max-width: 1024px) {
  font-size: 1.6rem;
  }  
  @media screen and (max-width: 500px) {
  font-size: 1.2rem;
  } 
`;

const Input = styled.input`
  width: 100%;
  height: 70px;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  &::placeholder {
    font-size: 1.8rem;
    color: var(--grayC);
  }
  @media screen and (max-width: 1024px) {
  height: 50px;
  font-size: 1.4rem;
    &::placeholder {
    font-size: 1.4rem;
  }
  }
  @media screen and (max-width: 500px) {
  height: 40px;
  font-size: 1rem;
    &::placeholder {
    font-size: 1rem;
  }
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostInput = styled.input`
  width: 60%;
  height: 70px;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  &::placeholder {
    font-size: 1.8rem;
    color: var(--grayC);
  }
  @media screen and (max-width: 1024px) {
  height: 50px;
  font-size: 1.4rem;
    &::placeholder {
    font-size: 1.4rem;
  }
  }
  @media screen and (max-width: 500px) {
  height: 40px;
  font-size: 1rem;
    &::placeholder {
    font-size: 1rem;
  }
  }
`;

const PostButton = styled.button`
  width: 38%;
  height: 70px;
  border: 1px solid var(--dark);
  background: var(--dark);
  color: var(--light);
  border-radius: 4px;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
  height: 50px;
  font-size: 1.4rem;
  }
  @media screen and (max-width: 500px) {
  height: 40px;
  font-size: 1rem;
  }
`;

const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: var(--dark);
`;

const AllCheckWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1024px) {
  gap: 16px;
  }
  @media screen and (max-width: 500px) {
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
  @media screen and (max-width: 500px) {
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

const LoginBtn = styled.button`
  width: 100%;
  height: 70px;
  background: var(--grayE);
  border: none;
  border-radius: 4px;
  font-size: 2.4rem;
  color: var(--grayC);
  cursor: pointer;
  @media screen and (max-width: 1024px) {
  height: 56px;
  font-size: 1.8rem;
  }
  @media screen and (max-width: 500px) {
  height: 40px;
  font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.p`
  color: var(--red);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
  font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
  font-size: 1rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--light);
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media screen and (max-width: 500px) {
  width: 90%;
}
`;

const ModalCloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
`;
// styled 부분

const LogonSecond = () => {
  const { formData, setFormData, nextStep } = logonStore();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [modalState, setModalState] = useState({
    required: false,
    privacy: false,
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 유효성 검사
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6 || formData.password.length > 16) {
      newErrors.password = "비밀번호는 6자 이상 16자 이하로 입력해주세요.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }

    if (!formData.agreements.required || !formData.agreements.privacy) {
      newErrors.agreements = "필수 약관에 동의해야 합니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Firebase Auth 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 사용자 displayName 업데이트
      await updateProfile(user, {
        displayName: formData.username,
      });

      console.log("Firestore에 저장 시도:", {
        uid: user.uid,
        username: formData.username,
        favoriteTeam: formData.favoriteTeam,
        birthdate: `${
          formData.birthdate.year
        }-${formData.birthdate.month.padStart(
          2,
          "0"
        )}-${formData.birthdate.date.padStart(2, "0")}`,
        phoneNumber: `${formData.phoneNumber.part1}-${formData.phoneNumber.part2}-${formData.phoneNumber.part3}`,
        nickname: formData.nickname,
        email: formData.email,
        postalCode: formData.postalCode, // 우편번호 저장
        address: formData.address, // 주소 저장
        detailedAddress: formData.detailedAddress, // 상세주소 저장
        createdAt: new Date().toISOString().split("T")[0],
      });

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: formData.username,
        favoriteTeam: formData.favoriteTeam,
        birthdate: `${
          formData.birthdate.year
        }-${formData.birthdate.month.padStart(
          2,
          "0"
        )}-${formData.birthdate.date.padStart(2, "0")}`,
        phoneNumber: `${formData.phoneNumber.part1}-${formData.phoneNumber.part2}-${formData.phoneNumber.part3}`,
        nickname: formData.nickname,
        email: formData.email,
        postalCode: formData.postalCode, // 우편번호 저장
        address: formData.address, // 주소 저장
        detailedAddress: formData.detailedAddress, // 상세주소 저장
        createdAt: new Date().toISOString().split("T")[0],
      });

      await signOut(auth);
      nextStep(); // → 가입 완료 페이지로 이동
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "이미 가입된 이메일입니다." });
      } else {
        setErrors({ firebase: "회원가입 중 오류가 발생했습니다." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleAddressComplete = (data) => {
    let fullAddress = data.address; // 도로명 주소
    let extraAddress = "";

    if (data.addressType === "R") {
      // 도로명 주소인 경우
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFormData({
      postalCode: data.zonecode, // 우편번호
      address: fullAddress, // 도로명 주소 + 추가 정보
      detailedAddress: "", // 상세주소는 사용자가 입력
    });

    setIsAddressModalOpen(false); // 모달 닫기
  };

const openModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
  };

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

    useEffect(() => {
    const isValid =
      formData.email &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password &&
      formData.password.length >= 6 &&
      formData.password.length <= 16 &&
      formData.password === formData.confirmPassword &&
      formData.nickname &&
      formData.agreements.required &&
      formData.agreements.privacy;

    setIsFormValid(isValid);
  }, [formData]);

  return (
    <Form onSubmit={handleSubmit}>
      <SubTWrapper>
        <Subsubtitle>필수 입력란</Subsubtitle>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호 재입력"
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        )}
        <Input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
        {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
      </SubTWrapper>
      <Line />
      <SubTWrapper>
        <Subsubtitle>
          우편번호 <span>(선택)</span>
        </Subsubtitle>
        <PostWrapper>
          <PostInput
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="우편번호"
            readOnly
          />
          <PostButton type="button"onClick={openAddressModal}>우편번호 검색</PostButton>
        </PostWrapper>
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="주소"
          readOnly
        />
        <Input
          type="text"
          name="detailedAddress"
          value={formData.detailedAddress}
          onChange={handleChange}
          placeholder="상세주소"
        />
      </SubTWrapper>
      <AllCheckWrapper>
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.all}
              onClick={() => handleCheck("all")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText>필수 및 선택 사항에 모두 동의합니다.</CheckText>
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
            <CheckText>
              [필수] 이용약관에 동의합니다. <span>*</span>
            </CheckText>
          </Checkoption>
          <img src={RBarrow} alt="RBarrow" onClick={() => openModal("required")}/>
        </CheckWrapper>
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.privacy}
              onClick={() => handleCheck("privacy")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText>
              [필수] 개인정보 수집 및 이용에 동의 합니다. <span>*</span>
            </CheckText>
          </Checkoption>
          <img src={RBarrow} alt="RBarrow" onClick={() => openModal("privacy")} />
        </CheckWrapper>
        <CheckWrapper>
          <Checkoption>
            <CheckCircle
              checked={formData.agreements.promotion}
              onClick={() => handleCheck("promotion")}
            >
              <img src={logon_check} alt="logon_check" />
            </CheckCircle>
            <CheckText>
              Rookie가 제공하는 이벤트 등 프로모션 안내 메일을 수신에
              동의합니다.
            </CheckText>
          </Checkoption>
        </CheckWrapper>
        {errors.agreements && <ErrorMessage>{errors.agreements}</ErrorMessage>}
      </AllCheckWrapper>
      {errors.firebase && <ErrorMessage>{errors.firebase}</ErrorMessage>}

      <LoginBtn
        type="submit"
        disabled={isLoading}
        style={{
          background: isFormValid && !isLoading ? "var(--dark)" : "var(--grayE)",
          color: isFormValid && !isLoading ? "var(--light)" : "var(--grayC)",
        }}
      >
        {isLoading ? "로딩중..." : "회원가입"}
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

      {isAddressModalOpen && (
        <ModalOverlay onClick={closeAddressModal}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <ModalCloseButton onClick={closeAddressModal}>×</ModalCloseButton>
      <DaumPostcode onComplete={handleAddressComplete} />
    </ModalContent>
          </ModalOverlay>
      )}
    </Form>
  );
};

export default LogonSecond;
