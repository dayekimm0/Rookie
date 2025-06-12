import styled from "styled-components";
import LogonFirst from "../components/Loginon/LogonFirst";
import LogonSecond from "../components/Loginon/LogonSecond";
import LogonThird from "../components/Loginon/LogonThird";
import LogonFourth from "../components/Loginon/LogonFourth";
import logonStore from "../stores/LogonStore";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    padding: 0 15px;
  }
`;

const Inner = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  @media screen and (max-width: 1024px) {
    width: 480px;
    gap: 36px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 462px;
    gap: 32px;
  }
`;

const LogonTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 1024px) {
    gap: 26px;
  }
  @media screen and (max-width: 600px) {
    gap: 20px;
  }
`;

const LogonTitle = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.2rem;
  }
`;

const TitleSWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    max-width: 462px;
  }
`;

const LogonTitleS = styled.span`
  width: 33.3333334%;
  height: 5px;
  background: var(--grayF5);
`;

const Logon = () => {
  const { step } = logonStore();

  return (
    <Container
      style={{
        height: step === 3 ? "100%" : "100vh",
        margin: step === 3 ? "40px 0" : "0",
      }}
    >
      <Inner>
        <LogonTitleWrapper>
          <LogonTitle>회원가입</LogonTitle>
          <TitleSWrapper>
            <LogonTitleS
              style={{
                backgroundColor: step >= 1 ? "var(--dark)" : "var(--grayE)",
              }}
            />
            <LogonTitleS
              style={{
                backgroundColor: step >= 2 ? "var(--dark)" : "var(--grayE)",
              }}
            />
            <LogonTitleS
              style={{
                backgroundColor: step >= 3 ? "var(--dark)" : "var(--grayE)",
              }}
            />
          </TitleSWrapper>
        </LogonTitleWrapper>
        {step === 1 && <LogonFirst />}
        {step === 2 && <LogonSecond />}
        {step === 3 && <LogonThird />}
        {step === 4 && <LogonFourth />}
      </Inner>
    </Container>
  );
};

export default Logon;
