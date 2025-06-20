import { useState, useEffect } from "react";
import styled from "styled-components";

import logonStore from "../../stores/LogonStore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

// import { getScrollbarWidth } from "../../util";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import DaumPostcode from "react-daum-postcode";
import useBodyScrollLock from "../../hook/useBodyScrollLock";

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
  @media screen and (max-width: 600px) {
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
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 70px;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 1.6rem;
  font-family: "Figtree", "Pretendard", sans-serif;
  padding: 15px;
  &:focus {
    outline: none;
    border: 1px solid var(--dark);
  }
  &::placeholder {
    font-size: 1.6rem;
    color: var(--grayC);
  }
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.6rem;
    &::placeholder {
      font-size: 1.6rem;
    }
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
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
  font-size: 1.6rem;
  padding: 15px;
  &:focus {
    outline: none;
    border: 1px solid var(--dark);
  }
  &::placeholder,
  input {
    font-size: 1.6rem;
    color: var(--grayC);
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
    &::placeholder,
    input {
      font-size: 1.6rem;
    }
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.2rem;
    &::placeholder,
    input {
      font-size: 1.2rem;
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
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: var(--gray2);
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.2rem;
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
  border: none;
  border-radius: 4px;
  font-size: 2.4rem;
  color: var(--light);
  cursor: pointer;
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

const ErrorMessage = styled.p`
  color: var(--red);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
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
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const ModalCloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
`;
// styled 부분

const LogonThird = () => {
  const { formData, setFormData, nextStep } = logonStore();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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

    // if (!formData.agreements.required || !formData.agreements.privacy) {
    //   newErrors.agreements = "필수 약관에 동의해야 합니다.";
    // }

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

      // 회원가입 완료시 쿠폰 발급
      const welcomeCouponRef = collection(
        db,
        "users",
        user.uid,
        "welcomeCoupons"
      );
      await addDoc(welcomeCouponRef, {
        title: "WELCOME!",
        discountRate: 10,
        condition: "최초 회원가입 완료시 쿠폰 발급",
        timestamp: new Date(),
        used: false,
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
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
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
      formData.nickname;

    setIsFormValid(isValid);
  }, [formData]);

  //스크롤 막기
  useBodyScrollLock(isAddressModalOpen);

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
          placeholder="비밀번호 6~16자 입력"
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
          배송주소 <span>(선택)</span>
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
          <PostButton type="button" onClick={openAddressModal}>
            우편번호 검색
          </PostButton>
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
      {errors.firebase && <ErrorMessage>{errors.firebase}</ErrorMessage>}

      <LoginBtn type="submit" disabled={isLoading} $valid={isFormValid}>
        {isLoading ? "로딩중..." : "회원가입"}
      </LoginBtn>

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

export default LogonThird;
