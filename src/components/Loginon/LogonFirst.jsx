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
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  background: ${({ $isTeamPlaceholder }) =>
    $isTeamPlaceholder ? "var(--grayF5)" : "var(--light)"};

  color: ${({ $isTeamPlaceholder }) =>
    $isTeamPlaceholder ? "var(--grayC)" : "var(--dark)"};

  option {
    color: black;
    background: var(--grayF5);
  }
`;

const StyledSelect2Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledSelect2 = styled.select`
  width: 32%;
  height: 70px;
  border: 1px solid var(--grayC);
  border-radius: 4px;
  font-size: 1.8rem;
  padding: 15px;
  background: ${({ $isBirthPlaceholder }) =>
    $isBirthPlaceholder ? "var(--grayF5)" : "var(--light)"};

  color: ${({ $isBirthPlaceholder }) =>
    $isBirthPlaceholder ? "var(--grayC)" : "var(--dark)"};

  option {
    color: black;
    background: var(--grayF5);
  }
`;

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

const currentyear = new Date().getFullYear();
const years = Array.from(
  { length: currentyear - 1920 + 1 },
  (_, i) => currentyear - i
);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const dates = Array.from({ length: 31 }, (_, i) => i + 1);

const LogonFirst = ({ nextStep }) => {
  const [selectedTeam, setSelectedTeam] =
    useState("응원하는 구단을 선택해 주세요");

  const [selectedYear, setSelectedYear] = useState("년");
  const [selectedMonth, setSelectedMonth] = useState("월");
  const [selectedDate, setSelectedDate] = useState("일");

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <>
      <AllInputWrapper>
        <Input type="text" placeholder="이름" />
        <SubTWrapper>
          <Subsubtitle>응원 팀 선택</Subsubtitle>
          <StyledSelect
            name="team"
            value={selectedTeam}
            onChange={handleTeamChange}
            $isTeamPlaceholder={
              selectedTeam === "응원하는 구단을 선택해 주세요"
            }
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
            <option value="다음에 선택">다음에 선택</option>
          </StyledSelect>
        </SubTWrapper>
        <SubTWrapper>
          <Subsubtitle>생년월일</Subsubtitle>
          <StyledSelect2Wrapper>
            <StyledSelect2
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              $isBirthPlaceholder={selectedYear === "년"}
            >
              <option value="년" disabled>
                년
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </StyledSelect2>
            <StyledSelect2
              name="year"
              value={selectedMonth}
              onChange={handleMonthChange}
              $isBirthPlaceholder={selectedMonth === "월"}
            >
              <option value="월" disabled>
                월
              </option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </StyledSelect2>
            <StyledSelect2
              name="year"
              value={selectedDate}
              onChange={handleDateChange}
              $isBirthPlaceholder={selectedDate === "일"}
            >
              <option value="일" disabled>
                일
              </option>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </StyledSelect2>
          </StyledSelect2Wrapper>
        </SubTWrapper>
        <SubTWrapper>
          <Subsubtitle>휴대폰 번호</Subsubtitle>
          <StyledSelect2Wrapper>
            <Input2 placeholder="010" />
            <Input2 />
            <Input2 />
          </StyledSelect2Wrapper>
        </SubTWrapper>
      </AllInputWrapper>
      <LoginBtn onClick={nextStep}>다음</LoginBtn>
    </>
  );
};

export default LogonFirst;
