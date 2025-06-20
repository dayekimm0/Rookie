import { useState, useEffect } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import useBodyScrollLock from "../../hook/useBodyScrollLock";
import logo from "../../images/logos/Rookie_logo.svg";
import authStore from "../../stores/AuthStore";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

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
  z-index: 1500;
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
  z-index: 2000;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 30px;
  overflow-wrap: break-word;
  @media screen and (max-width: 1024px) {
    margin-bottom: 26px;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 22px;
  }
`;

const ModalText = styled.input`
  width: 100%;
  height: 62px;
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
    height: 50px;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    height: 44px;
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
  height: 62px;
  width: 60%;
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
    font-size: 1.4rem;
    &::placeholder,
    input {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    font-size: 1.2rem;
    &::placeholder,
    input {
      font-size: 1.2rem;
    }
  }
`;

const PostButton = styled.button`
  width: 39%;
  height: 62px;
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
    height: 44px;
    font-size: 1.2rem;
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

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
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

const AddressModal = ({ isOpen, closeAddressModal }) => {
  const { userProfile } = authStore();
  const [isAddressSetModalOpen, setIsAddressSetModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    postalCode: userProfile?.postalCode || "",
    address: userProfile?.address || "",
    detailedAddress: userProfile?.detailedAddress || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        postalCode: userProfile?.postalCode || "",
        address: userProfile?.address || "",
        detailedAddress: userProfile?.detailedAddress || "",
      });
    }
  }, [userProfile]);

  const openAddressModal = () => {
    setIsAddressSetModalOpen(true);
  };

  const closeAddressSetModal = () => {
    setIsAddressSetModalOpen(false);
  };

  const handleAddressComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname) extraAddress += data.bname;
      if (data.buildingName)
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }

    setFormData((prev) => ({
      ...prev,
      postalCode: data.zonecode,
      address: fullAddress,
      detailedAddress: "",
    }));

    closeAddressSetModal();
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("로그인이 필요합니다.");

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        postalCode: formData.postalCode,
        address: formData.address,
        detailedAddress: formData.detailedAddress,
      });

      alert("주소가 변경되었습니다.");
      closeAddressModal();
    } catch (error) {
      alert(`주소 저장 중 오류가 발생했습니다: ${error.message}`); // 정확한 오류 메시지를 출력
      console.error("Error updating address:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={closeAddressModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeAddressModal}>⨯</CloseButton>
          <LogoWrapper>
            <Logo>
              <LogoImg src={logo} alt="rookielogo" />
            </Logo>
            <ModalTitle>배송주소 변경</ModalTitle>
          </LogoWrapper>
          <ModalTWrapper>
            <PostWrapper>
              <PostInput
                type="text"
                name="postalCode"
                value={formData.postalCode}
                placeholder="우편번호"
                readOnly
              />
              <PostButton type="button" onClick={openAddressModal}>
                우편번호 검색
              </PostButton>
            </PostWrapper>
            <ModalText
              type="text"
              name="address"
              placeholder="주소"
              value={formData.address}
              readOnly
            />
            <ModalText
              type="text"
              name="detailedAddress"
              value={formData.detailedAddress}
              onChange={handleChange}
              placeholder="상세주소"
            />
          </ModalTWrapper>
          <ModalButton type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "저장 중..." : "변경하기"}
          </ModalButton>
        </ModalContent>
      </ModalOverlay>

      {isAddressSetModalOpen && (
        <ModalOverlay
          isOpen={isAddressSetModalOpen}
          onClick={closeAddressSetModal}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={closeAddressSetModal}>
              ×
            </ModalCloseButton>
            <DaumPostcode onComplete={handleAddressComplete} />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AddressModal;
