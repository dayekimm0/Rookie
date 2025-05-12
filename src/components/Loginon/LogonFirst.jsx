import { useState } from "react";
import styled from "styled-components";

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

const AllInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubTWrapper = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 5px;

`;

const Subsubtitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 500;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 70px;
  border: 1px solid var(--grayC, #ccc);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  background: var(--grayF5, #f5f5f5);
  color: ${({ isPlaceholder }) => (isPlaceholder ? "var(--grayC, #ccc)" : "black")};

  /* 모든 option의 기본 스타일 */
  option {
    color: black;
    background: var(--grayF5, #f5f5f5);
  }
`;

const StyledSelect2Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

  const StyledSelect2 = styled.select`
  width: 32%;
  height: 70px;
  border: 1px solid var(--grayC, #ccc);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  background: var(--grayF5, #f5f5f5);
  color: black;
  `

const Input2 = styled.input`
  width: 32%;
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

const LogonFirst = ()=>{
  const [selectedTeam, setSelectedTeam] = useState("응원하는 구단을 선택해 주세요");

  const handleChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  return(
    <>
    <AllInputWrapper>
  <Input type="text" placeholder="이름" />
  <SubTWrapper>
    <Subsubtitle value={selectedTeam} onChange={handleChange} isPlaceholder={selectedTeam === "응원하는 구단을 선택해 주세요"}>응원 팀 선택</Subsubtitle>
    <StyledSelect
          name="team"
          value={selectedTeam}
          onChange={handleChange}
          isPlaceholder={selectedTeam === "응원하는 구단을 선택해 주세요"}
        >
          <option value="응원하는 구단을 선택해 주세요" disabled>
            응원하는 구단을 선택해 주세요
          </option>
          <option value="두산베어스">두산베어스</option>
          <option value="엘지트윈스">엘지트윈스</option>
          <option value="키움히어로즈">키움히어로즈</option>
          <option value="한화이글스">한화이글스</option>
          <option value="삼성라이온즈">삼성라이온즈</option>
          <option value="케이티위즈">케이티위즈</option>
          <option value="엔씨다이노스">엔씨다이노스</option>
          <option value="쓱랜더스">쓱랜더스</option>
          <option value="롯데자이언츠">롯데자이언츠</option>
          <option value="기아타이거즈">기아타이거즈</option>
        </StyledSelect>
  </SubTWrapper>
  <SubTWrapper>
    <Subsubtitle>생년월일</Subsubtitle>
  <StyledSelect2Wrapper>
      <StyledSelect2 name="year">
        <option value="년">년</option>
      </StyledSelect2>
      <StyledSelect2 name="year">
        <option value="월">월</option>
      </StyledSelect2>
      <StyledSelect2 name="year">
        <option value="일">일</option>
      </StyledSelect2>
  </StyledSelect2Wrapper>
  </SubTWrapper>
  <SubTWrapper>
    <Subsubtitle>휴대폰 번호</Subsubtitle>
  <StyledSelect2Wrapper>
      <StyledSelect2 name="phonenum">
        <option value="010">010</option>
      </StyledSelect2>
      <Input2/>
      <Input2/>
  </StyledSelect2Wrapper>
  </SubTWrapper>
</AllInputWrapper>
    </>
  );
};

export default LogonFirst;