import { useState } from "react";
import styled from "styled-components";
import NewAddress from "./NewAddress";
import PostModal from "./PostModal";
import logo from "../../images/logos/Rookie_logo.svg";
import authStore from "../../stores/AuthStore";

const ModalOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  padding: 0 2%;
`;

const ModalContent = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 12px;
  gap: 20px;
  padding: 70px;
  background: var(--light);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 1024px) {
    width: 480px;
    padding: 50px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 50px 30px 30px;
    margin: 0 15px;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 130px;
  height: 40px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: 1;
  @media screen and (max-width: 500px) {
    scale: 0.8;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  @media screen and (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const Button = styled.input`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--main);
  color: var(--dark);
  border: none;
  border-radius: 4px;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    height: 40px;
    font-size: 1.6rem;
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

const AddressModal = ({ isOpen, closeModal }) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    username: "",
    postalCode: "",
    address: "",
    detailAddress: "",
    phone: "",
  });

  const openPostModal = () => setPostModalOpen(true);
  const closePostModal = () => setPostModalOpen(false);

  const onAddressSelect = (data) => {
    console.log(data);
    setSelectedAddress((prev) => ({
      ...prev,
      postalCode: data.postalCode,
      address: data.address,
    }));
    closePostModal();
  };

  console.log(selectedAddress);

  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={closeModal}>⨯</CloseButton>
          <LogoWrapper>
            <Logo>
              <LogoImg src={logo} alt="rookielogo" />
            </Logo>
            <ModalTitle>배송지 정보 변경</ModalTitle>
          </LogoWrapper>

          <NewAddress
            openPostModal={openPostModal}
            postalCode={selectedAddress.postalCode}
            address={selectedAddress.address}
            detailAddress={selectedAddress.detailAddress}
            recipient={selectedAddress.username}
            phone={selectedAddress.phone}
            setSelectedAddress={setSelectedAddress}
            onAddressSelect={onAddressSelect}
          />

          <Button type="button" value="수정하기" />
        </ModalContent>
      </ModalOverlay>

      {postModalOpen && (
        <PostModal
          isOpen={postModalOpen}
          closeModal={closePostModal}
          onComplete={onAddressSelect}
        />
      )}
    </>
  );
};

export default AddressModal;
