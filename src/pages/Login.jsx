import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import rookie_logo from "../images/logos/Rookie_logo.svg";
import google_icon from "../images/icons/google_icon.svg";
import kakao_talk from "../images/icons/kakao-talk.svg";
import naver_icon from "../images/icons/naver_icon.svg";
import logonStore from "../stores/LogonStore";

//style 시작
const Container = styled.div`
  width: 100%;
  height: 100vh;
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
    gap: 50px;
  }
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  @media screen and (max-width: 1024px) {
    gap: 30px;
  }
  @media screen and (max-width: 600px) {
    gap: 22.5px;
  }
`;

const Logo = styled.img`
  @media screen and (max-width: 1024px) {
    height: 60px;
  }
  @media screen and (max-width: 600px) {
    height: 45px;
  }
`;

const LogoLogin = styled.div`
  font-size: 3rem;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.4rem;
  }
`;

const Form = styled.form`
  width: 100%;
  gap: 40px;
  @media screen and (max-width: 600px) {
    gap: 50px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media screen and (max-width: 1024px) {
    gap: 12px;
  }
  @media screen and (max-width: 600px) {
    gap: 10px;
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
  @media screen and (max-width: 1024px) {
    height: 56px;
    font-size: 1.6rem;
    &::placeholder {
      font-size: 1.6rem;
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

const UnderInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 6px;
  margin-bottom: 40px;
  @media screen and (max-width: 1024px) {
    gap: 4px;
  }
  @media screen and (max-width: 600px) {
    gap: 3px;
  }
`;

const UnderInputBtn = styled.button`
  font-size: 1.4rem;
  border: none;
  background: none;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const UnderInputLine = styled.span`
  display: inline-block;
  width: 1px;
  height: 10px;
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
  @media screen and (max-width: 1024px) {
    height: 17px;
  }
  @media screen and (max-width: 600px) {
    height: 12px;
    margin-bottom: 22.5px;
  }
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
  padding: 6px 16px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
    padding: 4px 16px;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 4px 12px;
  }
`;

const SnsLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  @media screen and (max-width: 1024px) {
    img {
      height: 50px;
    }
  }
  @media screen and (max-width: 600px) {
    gap: 12px;
    img {
      height: 38px;
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

//

const Login = () => {
  const { setFormData } = logonStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다.";
    }
    if (!form.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

          setFormData({
            email: user.email,
            username: userData.username || "",
            nickname: userData.nickname || "",
            favoriteTeam: userData.favoriteTeam || "",
            birthdate: { year: "", month: "", date: "" },
            phoneNumber: { part1: "", part2: "", part3: "" },
            postalCode: userData.postalCode || "",
            address: userData.address || "",
            detailedAddress: userData.detailedAddress || "",
          });
      } else {
        console.warn("⚠️ Firestore 유저 데이터 없음");
      }

      setErrors({});
      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setErrors({ general: "이메일 또는 비밀번호가 올바르지 않습니다." });
      } else if (err.code === "auth/network-request-failed") {
        setErrors({
          general: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
        });
      } else {
        setErrors({ general: "이메일 또는 비밀번호가 올바르지 않습니다." }); // 기타 오류도 표시
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlelogonclick = () => {
    navigate("/logon");
  };

  const isFormValid =
    form.email && /\S+@\S+\.\S+/.test(form.email) && form.password;

  return (
    <Container>
      <Inner>
        <LogoWrapper>
          <Link to="/">
            <Logo src={rookie_logo} alt="rookie_logo" />
          </Link>
          <LogoLogin>로그인</LogoLogin>
        </LogoWrapper>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
            <UnderInputWrapper>
              <UnderInputBtn type="button" onClick={handlelogonclick}>
                계정만들기
              </UnderInputBtn>
              <UnderInputLine />
              <UnderInputBtn>이메일 • 비밀번호 찾기</UnderInputBtn>
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
          <LoginBtn
            type="submit"
            style={{
              background:
                isFormValid && !isLoading ? "var(--dark)" : "var(--grayE)",
              color:
                isFormValid && !isLoading ? "var(--light)" : "var(--grayC)",
            }}
          >
            {isLoading ? "로딩중..." : "로그인"}
          </LoginBtn>
        </Form>
      </Inner>
    </Container>
  );
};

export default Login;
