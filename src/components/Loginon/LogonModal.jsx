import styled from "styled-components";
import logo from "../../images/logos/Rookie_logo.svg";

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
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
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
    padding: 50px 30px 30px;
    margin: 0 15px;
  }
`;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: none;
//   border: none;
//   font-size: 3rem;
//   cursor: pointer;
//   color: var(--dark);
//   @media screen and (max-width: 500px) {
//     font-size: 1.4rem;
//   }
// `;

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
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 40px;
  overflow-wrap: break-word;
  @media screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const ModalTextT = styled.p`
  font-size: 1.8rem;
  line-height: 1.3;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const ModalText = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 400;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ModalButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  border: none;
  background: var(--dark);
  color: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.4rem;
  }
`;

const LogonModal = ({ isOpen, closeModal, contentType }) => {
  const getModalContent = () => {
    switch (contentType) {
      case "required":
        return {
          title: "ROOKie 계정 & 웹사이트 이용약관",
          text1T: "제1조 (목적)",
          text1:
            "이 약관은 온라인으로 제공하는 ROOKie 계정, 홈페이지 등 · 제반 서비스(이하 서비스)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.",
          text2T: "제2조 (용어의 정의)",
          text2:
            "이 약관에서 사용하는 정의는 다음과 같습니다. 회사라 함은 온라인을 통하여 서비스를 제공하는 사업자를 의미합니다. “회원” 또는 “이용자”라 함은 본 약관에 동의하고 서비스 이용 자격을 부여받은 자를 의미합니다. 크래프톤 계정(이하 계정)이라 함은 회원의 식별과 서비스 이용을 위하여 회원이 선정하고 회사가 부여하는 문자, 숫자 또는 특수문자의 조합을 의미합니다.",
        };
      case "privacy":
        return {
          title: "개인정보 수집 및 이용",
          text1T: "",
          text1:
            "본 개인정보 처리방침은 Rookie (본 방침에서 “Rookie”, “당사”, “당사의” 또는 “당사를”로 칭함) 가 디지털 체험, 모바일 앱, 매장, 온라인 또는 오프라인 행사, 프로모션 또는 기타 제품 또는 서비스를 포함하여 Rookie 웹사이트를 통해 고객이 Rookie와 상호 작용할 때 수집, 생성 및 처리하는 개인 데이터에 적용되며 이 모든 것은 “플랫폼”의 일부입니다. 또한 개인 데이터의 사용, 공유 및 보호 방법, 개인 데이터와 관련된 선택 사항 및 당사에 연락할 수 있는 방법에 대해서 설명합니다.",
          text2T:
            "개인 데이터 처리를 담당하는 Rookie 법인은 귀하가 플랫폼과 상호작용하는 방식 및 귀하가 거주하는 장소에 따라 달라집니다.",
          text2:
            "대한민국(“한국”)의 경우, 유한회사 Rookie는 Rookie 및 앱을 통한 한국 내 제품 구매, 마케팅, 특정 행사, 콘테스트, 프로모션 참여와 관련된 개인 데이터 처리에 대한 책임이 있습니다. Rookie는 Rookie앱을 포함하여 플랫폼과 관련된 기타 모든 개인 데이터 처리에 대한 책임이 있습니다.",
        };
      default:
        return { title: "약관", text1: "약관 내용이 없습니다." };
    }
  };

  const { title, text1T, text2T, text1, text2 } = getModalContent();

  return (
    <ModalOverlay isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <LogoWrapper>
          <Logo>
            <LogoImg src={logo} alt="rookielogo" />
          </Logo>
          <ModalTitle>{title}</ModalTitle>
        </LogoWrapper>
        <ModalTWrapper>
          <ModalTextT>{text1T}</ModalTextT>
          <ModalText>{text1}</ModalText>
        </ModalTWrapper>
        <ModalTWrapper>
          <ModalTextT>{text2T}</ModalTextT>
          <ModalText>{text2}</ModalText>
        </ModalTWrapper>
        <ModalButton type="button" onClick={closeModal}>
          돌아가기
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LogonModal;
