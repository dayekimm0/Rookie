import styled from "styled-components";
import logo from "../../images/logos/Rookie_logo.svg";
import useBodyScrollLock from "../../hook/useBodyScrollLock";
import { useState } from "react";
import authStore from "../../stores/AuthStore";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail, updatePassword } from "firebase/auth";

const ModalOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
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
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.form`
  background: var(--light);
  width: 600px;
  border-radius: 12px;
  padding: 70px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1024px) {
    width: 480px;
    padding: 50px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 462px;
    padding: 50px 30px 30px;
    margin: 0 15px;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  @media screen and (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const Logo = styled.div`
  width: 130px;
  height: 40px;
  cursor: pointer;
  transform: translateY(-50%);
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: 1;
  @media screen and (max-width: 1024px) {
    scale: 0.9;
  }
  @media screen and (max-width: 600px) {
    scale: 0.8;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const ModalTWrapper = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 30px;
  overflow-wrap: break-word;
  @media screen and (max-width: 1024px) {
    height: 50px;
    margin-bottom: 26px;
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    margin-bottom: 22px;
  }
`;

const ModalTextT = styled.p`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  line-height: 1.3;
  font-weight: bold;
  word-break: keep-all;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const ModalText = styled.input`
  width: 83%;
  height: 100%;
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
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;

const ModalButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  border: none;
  background: var(--main);
  color: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.4rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: var(--dark);
`;

const SettingModal = ({ isOpen, closeModal, contentType }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, userProfile, gamePlayed, setUser } = authStore();

  useBodyScrollLock(isOpen);
  const getModalContent = () => {
    switch (contentType) {
      // case "email":
      //   return {
      //     title: "이메일 변경",
      //     text1T: "이메일",
      //     text1: "변경하실 이메일을 입력해 주세요.",
      //   };
      case "password":
        return {
          title: "비밀번호 변경",
          text1T: "비밀번호",
          text1: "변경하실 비밀번호를 입력해 주세요.",
        };
      case "nickname":
        return {
          title: "닉네임 변경",
          text1T: "닉네임",
          text1: "변경하실 닉네임을 입력해 주세요.",
        };
      default:
        return { title: "No Data" };
    }
  };

  const { title, text1, text1T } = getModalContent();

  const handleUpdate = async () => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return;

    if (!inputValue.trim()) {
      alert("다시 입력해 주세요.");
      setLoading(false);
      return;
    }

    // if (contentType === "email") {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(inputValue)) {
    //     alert("올바른 이메일 형식이 아닙니다.");
    //     setLoading(false);
    //     return;
    //   }
    //   if (user?.email === inputValue) {
    //     alert("이전 이메일과 동일합니다.");
    //     setLoading(false);
    //     return;
    //   }
    // }

    if (contentType === "password") {
      if (inputValue.length < 6 || inputValue.length > 16) {
        alert("비밀번호는 6자 이상 16자 이하로 입력해주세요.");
        setLoading(false);
      }
      // 비번은 값 불러오기가 없다네요.. 생략
    }

    if (contentType === "nickname") {
      if (userProfile?.nickname === inputValue) {
        alert("이전 닉네임과 동일합니다.");
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    try {
      switch (contentType) {
        // case "email":
        //   console.log("이메일 업데이트 시도:", inputValue);
        //   await updateEmail(firebaseUser, inputValue);
        //   await firebaseUser.reload();
        //   setUser({ ...user, email: inputValue }, userProfile, gamePlayed);
        //   break;

        case "password":
          console.log("비밀번호 업데이트 시도");
          await updatePassword(firebaseUser, inputValue);
          break;

        case "nickname":
          console.log("nickname 업데이트 시도");
          await updateDoc(doc(db, "users", firebaseUser.uid), {
            nickname: inputValue,
          });
          setUser(user, { ...userProfile, nickname: inputValue }, gamePlayed);
          break;

        default:
          break;
      }
      alert("변경이 완료되었습니다.");
      closeModal();
    } catch (error) {
      console.log("업데이트 오류:", error);
      alert("변경중 오류가 생겼습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>⨯</CloseButton>
        <LogoWrapper>
          <Logo>
            <LogoImg src={logo} alt="rookielogo" />
          </Logo>
          <ModalTitle>{title}</ModalTitle>
        </LogoWrapper>
        <ModalTWrapper>
          <ModalTextT>{text1T}</ModalTextT>
          <ModalText
            placeholder={text1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ModalTWrapper>
        <ModalButton
          type="button"
          onClick={handleUpdate}
          disabled={loading || !inputValue}
        >
          {loading ? "저장 중..." : "변경하기"}
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SettingModal;
