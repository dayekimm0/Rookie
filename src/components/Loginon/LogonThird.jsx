import styled from "styled-components";
import LogonRookielogo from "../../images/logos/Logon_Rookie_logo.svg"

const LogonMiddle = styled.div`
width: 100vw;
height: 350px;
  position: relative;
`

const Logonimg = styled.img`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
z-index: 0;
`

const LogonEndmessage = styled.h4`
width: 100%;
line-height: 2;
font-size: 2.4rem;
font-weight: bold;
text-align: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
z-index: 1;
span{
  font-weight:400;
  color: var(--gray6);
  font-size: 1.8rem;
}
`

const ButtonWrapper = styled.div`
width: 100%;
justify-content: space-between;
  display: flex;
`

const HomeButton = styled.button`
  width: 297px;
  height: 70px;
  border: 1px solid var(--main);
  background: var(--main);
  color: var(--dark);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  cursor: pointer;
`

const LoginButton = styled.button`
  width: 297px;
  height: 70px;
  border: 1px solid var(--dark);
  background: var(--dark);
  color: var(--light);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  cursor: pointer;
`

const LogonThird = ()=>{
  return(
<>
      <LogonMiddle>
      <Logonimg src={LogonRookielogo} alt="LogonRookielogo" />
      <LogonEndmessage>ROOKie 회원가입이 완료되었습니다.<br/>
      <span>다양한 정보와 서비스를 이용해보세요!</span>
      </LogonEndmessage>
      </LogonMiddle>
    <ButtonWrapper>
        <HomeButton>홈으로</HomeButton>
        <LoginButton>로그인</LoginButton>
    </ButtonWrapper>
</>
  );
};

export default LogonThird;