import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { data } from "react-router-dom";

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

const PostModal = ({ isOpen, closeModal, onComplete }) => {
  const handleComplete = (data) => {
    onComplete({
      postalCode: data.zonecode,
      address: data.address,
    });
    closeModal();
  };
  console.log(data.address);

  return (
    <ModalOverlay isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>⨯</CloseButton>
        <DaumPostcode onComplete={handleComplete} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default PostModal;
