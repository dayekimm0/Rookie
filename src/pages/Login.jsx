import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import rookie_logo from "../images/logos/Rookie_logo.svg";
import google_icon from "../images/icons/google_icon.svg";
import kakao_talk from "../images/icons/kakao-talk.svg";
import naver_icon from "../images/icons/naver_icon.svg";

//style 시작
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Logo = styled.img`
cursor: pointer;
`;

const LogoLogin = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  gap: 40px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
`;

const UnderInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 6px;
  margin-bottom: 40px;
`;

const UnderInputBtn = styled.button`
  font-size: 1.4rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const UnderInputLine = styled.span`
  display: inline-block;
  width: 1px;
  height: 12px;
  background: var(--dark);
`;

const SnsWrapper = styled.div`
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
`;

const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: var(--gray6);
`;

const SnsLogin = styled.h5`
  font-size: 1.6rem;
  color: var(--gray6);
  font-weight: bold;
  position: absolute;
  background: var(--light);
  padding: 6px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const SnsLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
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
`;

const Login = () => {
  const logonnavigation = useNavigate();
    const mainnavigation = useNavigate();
  const handlelogonclick = () => {
    logonnavigation("/logon");
  };
  const handleMainclick = () => {
    mainnavigation("/");
  };

  return (
    <Container>
      <Inner>
        <LogoWrapper>
          <Logo onClick={handleMainclick} src={rookie_logo} />
          <LogoLogin>로그인</LogoLogin>
        </LogoWrapper>
        <Form>
          <InputWrapper>
            <Input type="text" placeholder="아이디" />
            <Input type="password" placeholder="비밀번호" />
            <UnderInputWrapper>
              <UnderInputBtn onClick={handlelogonclick}>
                계정만들기
              </UnderInputBtn>
              <UnderInputLine />
              <UnderInputBtn>아이디 • 비밀번호 찾기</UnderInputBtn>
            </UnderInputWrapper>
          </InputWrapper>
          <SnsWrapper>
            <Line />
            <SnsLogin>SNS 로그인</SnsLogin>
          </SnsWrapper>
          <SnsLogoWrapper>
            <img src={google_icon} alt="google_icon" />
            <img src={kakao_talk} alt="kakao_talk" />
            <img src={naver_icon} alt="naver_icon" />
          </SnsLogoWrapper>
          <Link to="/">
            <LoginBtn>로그인</LoginBtn>
          </Link>
        </Form>
      </Inner>
    </Container>
  );
};

export default Login;
