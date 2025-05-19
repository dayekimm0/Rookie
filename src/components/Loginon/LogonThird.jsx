import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogonRookielogo from "../../images/logos/Logon_Rookie_logo.svg";
import logonStore from "../../stores/LogonStore";

const LogonMiddle = styled.div`
  width: 100vw;
  height: 350px;
  position: relative;
  @media screen and (max-width: 1024px) {
    height: 225px;
  }
  @media screen and (max-width: 600px) {
    height: 170px;
  }
`;

const Logonimg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  @media screen and (max-width: 1024px) {
    width: 576px;
  }
  @media screen and (max-width: 600px) {
    width: 322px;
  }
`;

const LogonEndmessage = styled.h4`
  width: 100%;
  line-height: 1.8;
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  span {
    font-weight: 400;
    color: var(--gray6);
    font-size: 1.8rem;
  }
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    span {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    span {
      font-size: 1rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
`;

const HomeButton = styled.button`
  width: 49%;
  height: 70px;
  border: 1px solid var(--main);
  background: var(--main);
  color: var(--dark);
  border-radius: 4px;
  font-size: 2.2rem;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.8rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.2rem;
  }
`;

const LoginButton = styled.button`
  width: 49%;
  height: 70px;
  border: 1px solid var(--dark);
  background: var(--dark);
  color: var(--light);
  border-radius: 4px;
  font-size: 2.2rem;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.8rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.2rem;
  }
`;

const LogonThird = () => {
  const { resetForm } = logonStore();
  const logonnavigation = useNavigate();
  const handlegohome = () => {
    logonnavigation("/");
    resetForm();
  };
  const handlegologin = () => {
    logonnavigation("/login");
    resetForm();
  };

  return (
    <>
      <LogonMiddle>
        <Logonimg src={LogonRookielogo} alt="LogonRookielogo" />
        <LogonEndmessage>
          ROOKie 회원가입이 완료되었습니다.
          <br />
          <span>다양한 정보와 서비스를 이용해보세요!</span>
        </LogonEndmessage>
      </LogonMiddle>
      <ButtonWrapper>
        <HomeButton onClick={handlegohome}>홈으로</HomeButton>
        <LoginButton onClick={handlegologin}>로그인</LoginButton>
      </ButtonWrapper>
    </>
  );
};

export default LogonThird;
