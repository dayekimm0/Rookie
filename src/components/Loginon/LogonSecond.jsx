import styled from "styled-components";

const SubTWrapper = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 15px;
`;

const Subsubtitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  span {
    font-weight: 400;
    color: var(--gray8);
  }
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

const PostWrapper = styled.div`
width: 100%;
  display: flex;
  justify-content: space-between;
`

const PostInput = styled.input`
  width: 380px;
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

const PostButton = styled.button`
  width: 210px;
  height: 70px;
  border: 1px solid var(--dark);
  background: var(--dark);
  color: var(--light);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  cursor: pointer;
`

const Line = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background: var(--gray1);
`;

const AllCheckWrapper= styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CheckWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`
const Checkoption = styled.div`
  display: flex;
  justify-content: start;
  gap: 5px;
`

const CheckCircle = styled.div`
width: 14px;
height: 14px;
  border: 1px solid var(--grayC);
  border-radius: 50% ;
`
const CheckText = styled.h5`
  font-size: 1.6rem;
  span{
    color: var(--red);
  }
`

const LogonSecond = ()=>{
  return(
    <>
    <SubTWrapper>
      <Subsubtitle>필수 입력란</Subsubtitle>
      <Input type="text" placeholder="아이디"/>
      <Input type="password" placeholder="비밀번호"/>
      <Input type="password" placeholder="비밀번호 재입력"/>
      <Input type="text" placeholder="닉네임"/>
    </SubTWrapper>
    <Line/>
    <SubTWrapper>
      <Subsubtitle>우편번호 <span>(선택)</span></Subsubtitle>
    <PostWrapper>
        <PostInput type="text" placeholder="우편번호"/>
        <PostButton>우편번호 검색</PostButton>
    </PostWrapper>
      <Input type="text" placeholder="주소"/>
      <Input type="text" placeholder="상세주소"/>
    </SubTWrapper>
<AllCheckWrapper>
  <CheckWrapper>
        <Checkoption>
          <CheckCircle/>
          <CheckText>필수 및 선택 사항에 모두 동의합니다.</CheckText>
        </Checkoption>
  </CheckWrapper>
      <Line/>
      <CheckWrapper>
        <Checkoption>
          <CheckCircle/>
          <CheckText>[필수] 이용약관에 동의합니다. * <span>*</span></CheckText>
        </Checkoption>
  </CheckWrapper>
      <CheckWrapper>
        <Checkoption>
          <CheckCircle/>
          <CheckText>[필수] 개인정보 수집 및 이용에 동의 합니다. <span>*</span></CheckText>
        </Checkoption>
  </CheckWrapper>
      <CheckWrapper>
        <Checkoption>
          <CheckCircle/>
          <CheckText>Rookie가 제공하는 이벤트 등 프로모션 안내 메일을 수신에 동의합니다.</CheckText>
        </Checkoption>
  </CheckWrapper>
</AllCheckWrapper>
    </>
  );
};

export default LogonSecond;