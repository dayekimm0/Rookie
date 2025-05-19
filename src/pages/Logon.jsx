import styled from "styled-components";
import RGarrow from "../images/icons/RGarrow_logo.svg";
import RBarrow from "../images/icons/RBarrow_logo.svg";
import LogonFirst from "../components/Loginon/LogonFirst";
import LogonSecond from "../components/Loginon/LogonSecond";
import LogonThird from "../components/Loginon/LogonThird";
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
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const LogonTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @media screen and (max-width: 1024px) {
    gap: 32px;
  }
  @media screen and (max-width: 600px) {
    gap: 24px;
  }
`;

const LogonTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const TitleSWrapper = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    width: 320px;
  }
  @media screen and (max-width: 600px) {
    width: 240px;
  }
`;

const LogonTitleS = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--grayC);
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: var(--gray1);
`;

const Logon = () => {
  const { step } = logonStore();

  return (
    <Container
      style={{
        height: step === 2 ? "100%" : "100vh",
        margin: step === 2 ? "40px 0" : "0",
      }}
    >
      <Inner>
        <LogonTitleWrapper>
          <LogonTitle>정보입력</LogonTitle>
          <TitleSWrapper>
            <LogonTitleS
              style={{ color: step >= 1 ? "var(--dark)" : "var(--grayC)" }}
            >
              1. 정보입력
            </LogonTitleS>
            {step >= 2 ? (
              <img src={RBarrow} alt="RBarrow" />
            ) : (
              <img src={RGarrow} alt="RBarrow" />
            )}
            <LogonTitleS
              style={{ color: step >= 2 ? "var(--dark)" : "var(--grayC)" }}
            >
              2. 계정생성
            </LogonTitleS>
            {step >= 3 ? (
              <img src={RBarrow} alt="RBarrow" />
            ) : (
              <img src={RGarrow} alt="RBarrow" />
            )}
            <LogonTitleS
              style={{ color: step >= 3 ? "var(--dark)" : "var(--grayC)" }}
            >
              3. 가입완료
            </LogonTitleS>
          </TitleSWrapper>
        </LogonTitleWrapper>
        <Line />
        {step === 1 && <LogonFirst />}
        {step === 2 && <LogonSecond />}
        {step === 3 && <LogonThird />}
      </Inner>
    </Container>
  );
};

export default Logon;
