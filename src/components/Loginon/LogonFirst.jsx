import { useState, useEffect } from "react";
import styled from "styled-components";
import logonStore from "../../stores/LogonStore";

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
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    }
  }
`;

const AllInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (max-width: 600px) {
    gap: 8px;
  }
`;

const SubTWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 5px;
  @media screen and (max-width: 600px) {
    gap: 4px;
  }
`;

const Subsubtitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 500;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
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
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    font-size: 1rem;
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
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    font-size: 1rem;
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
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.4rem;
    &::placeholder {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    height: 44px;
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    }
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
  margin-top: 30px;
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.8rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.p`
  color: var(--red);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const currentyear = new Date().getFullYear();
const years = Array.from(
  { length: currentyear - 1920 + 1 },
  (_, i) => currentyear - i
);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const dates = Array.from({ length: 31 }, (_, i) => i + 1);

//

const LogonFirst = () => {
  const { formData, setFormData, nextStep } = logonStore();
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // 검증
    if (!formData.username) {
      newErrors.username = "이름을 입력해주세요.";
    }
    if (!formData.favoriteTeam) {
      newErrors.favoriteTeam = "응원 팀을 선택해주세요.";
    }
    if (
      !formData.birthdate.year ||
      !formData.birthdate.month ||
      !formData.birthdate.date
    ) {
      newErrors.birthdate = "생년월일을 모두 선택해 주세요.";
    }
    if (
      !formData.phoneNumber.part1 ||
      !formData.phoneNumber.part2 ||
      !formData.phoneNumber.part3
    ) {
      newErrors.phoneNumber = "휴대폰 번호를 모두 입력해주세요.";
    } else if (
      !/^\d{3}$/.test(formData.phoneNumber.part1) ||
      !/^\d{4}$/.test(formData.phoneNumber.part2) ||
      !/^\d{4}$/.test(formData.phoneNumber.part3)
    ) {
      newErrors.phoneNumber = "유효한 휴대폰 번호를 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    nextStep();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username" || name === "favoriteTeam") {
      setFormData({ [name]: value });
    } else if (name.startsWith("birthdate")) {
      const field = name.split(".")[1];
      setFormData({
        birthdate: { ...formData.birthdate, [field]: value },
      });
    } else if (name.startsWith("phoneNumber")) {
      const field = name.split(".")[1];
      setFormData({
        phoneNumber: { ...formData.phoneNumber, [field]: value },
      });
    }
  };

  useEffect(() => {
    const isFormValid =
      formData.username &&
      formData.favoriteTeam &&
      formData.birthdate.year &&
      formData.birthdate.month &&
      formData.birthdate.date &&
      /^\d{3}$/.test(formData.phoneNumber.part1) &&
      /^\d{4}$/.test(formData.phoneNumber.part2) &&
      /^\d{4}$/.test(formData.phoneNumber.part3);

    setIsFormValid(isFormValid);
  }, [formData]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AllInputWrapper>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="이름"
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          <SubTWrapper>
            <Subsubtitle>응원 팀 선택</Subsubtitle>
            <StyledSelect
              name="favoriteTeam"
              value={formData.favoriteTeam}
              onChange={handleChange}
              $isTeamPlaceholder={!formData.favoriteTeam}
            >
              <option value="" disabled>
                응원하는 구단을 선택해 주세요
              </option>
              <option value="기아 타이거즈">기아 타이거즈</option>
              <option value="삼성 라이온즈">삼성 라이온즈</option>
              <option value="LG 트윈스">LG 트윈스</option>
              <option value="두산 베어스">두산 베어스</option>
              <option value="KT 위즈">KT 위즈</option>
              <option value="SSG 랜더스">SSG 랜더스</option>
              <option value="롯데 자이언츠">롯데 자이언츠</option>
              <option value="한화 이글스">한화 이글스</option>
              <option value="NC 다이노스">NC 다이노스</option>
              <option value="키움 히어로즈">키움 히어로즈</option>
            </StyledSelect>
          </SubTWrapper>
          {errors.favoriteTeam && (
            <ErrorMessage>{errors.favoriteTeam}</ErrorMessage>
          )}
          <SubTWrapper>
            <Subsubtitle>생년월일</Subsubtitle>
            <StyledSelect2Wrapper>
              <StyledSelect2
                name="birthdate.year"
                value={formData.birthdate.year}
                onChange={handleChange}
                $isBirthPlaceholder={formData.birthdate.year === ""}
              >
                <option value="" disabled>
                  년
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </StyledSelect2>
              <StyledSelect2
                name="birthdate.month"
                value={formData.birthdate.month}
                onChange={handleChange}
                $isBirthPlaceholder={formData.birthdate.month === ""}
              >
                <option value="" disabled>
                  월
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </StyledSelect2>
              <StyledSelect2
                name="birthdate.date"
                value={formData.birthdate.date}
                onChange={handleChange}
                $isBirthPlaceholder={formData.birthdate.date === ""}
              >
                <option value="" disabled>
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
          {errors.birthdate && <ErrorMessage>{errors.birthdate}</ErrorMessage>}
          <SubTWrapper>
            <Subsubtitle>휴대폰 번호</Subsubtitle>
            <StyledSelect2Wrapper>
              <Input2
                name="phoneNumber.part1"
                value={formData.phoneNumber.part1}
                onChange={handleChange}
                placeholder="010"
              />
              <Input2
                name="phoneNumber.part2"
                value={formData.phoneNumber.part2}
                onChange={handleChange}
              />
              <Input2
                name="phoneNumber.part3"
                value={formData.phoneNumber.part3}
                onChange={handleChange}
              />
            </StyledSelect2Wrapper>
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
          </SubTWrapper>
        </AllInputWrapper>
        <LoginBtn
          type="submit"
          style={{
            background: isFormValid ? "var(--dark)" : "var(--grayE)",
            color: isFormValid ? "var(--light)" : "var(--grayC)",
          }}
        >
          다음
        </LoginBtn>
      </form>
    </>
  );
};

export default LogonFirst;
