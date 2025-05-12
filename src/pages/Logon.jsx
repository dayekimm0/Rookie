import styled from "styled-components";
import RGarrow from "../images/icons/RGarrow_logo.svg"; 
import LogonFirst from "../components/Loginon/LogonFirst";
import LogonSecond from "../components/Loginon/LogonSecond";
import LogonThird from "../components/Loginon/LogonThird";


const Container = styled.div`
  width: 100%;
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

const LogonTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const TitleSWrapper = styled.div`
width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogonTitleS = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--grayC);
`;

const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: var(--gray1);
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

const Logon = () => {

  return (
    <Container>
      <Inner>
        <LogonTitle>정보입력</LogonTitle>
      <TitleSWrapper>
          <LogonTitleS>1. 정보입력</LogonTitleS>
          <img src={RGarrow} alt="RGarrow" />
          <LogonTitleS>2. 계정생성</LogonTitleS>
          <img src={RGarrow} alt="RGarrow" />
          <LogonTitleS>3. 가입완료</LogonTitleS>
      </TitleSWrapper>
<Line/>

<LogonFirst/>
<LogonSecond/>
<LogonThird/>
      <LoginBtn>다음</LoginBtn>
      </Inner>
    </Container>
  );
};

export default Logon;
