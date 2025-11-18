import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faHouse,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import GlobalStyles from "../../styles/Globalstyles.styles";

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--dark);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--light);

  @media screen and (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const TopLine = styled.div`
  width: 100%;
  height: 1px;
  background: var(--gray6);
  margin-top: auto;
`;

const BottomLine = styled.div`
  width: 100%;
  height: 1px;
  background: var(--gray6);
  margin-bottom: auto;
`;

const IconWrapper = styled.div`
  font-size: 6rem;
  color: var(--main);
  margin-bottom: 32px;

  @media screen and (max-width: 768px) {
    font-size: 4.5rem;
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: var(--grayD);
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.6;

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

const SubDescription = styled.p`
  font-size: 1.4rem;
  color: var(--grayA);
  margin-bottom: 40px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 32px;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const ErrorDetails = styled.details`
  margin-bottom: 32px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--gray3);
  border-radius: 8px;
  max-width: 700px;
  width: 100%;

  summary {
    cursor: pointer;
    font-size: 1.3rem;
    color: var(--grayA);
    user-select: none;

    &:hover {
      color: var(--grayD);
    }
  }

  pre {
    margin-top: 12px;
    font-size: 1.2rem;
    color: #ff9999;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.5;
  }

  @media screen and (max-width: 768px) {
    padding: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 1.6rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  svg {
    font-size: 1.4rem;
  }

  &.primary {
    background: var(--main);
    color: var(--dark);

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: transparent;
    color: var(--light);
    border: 2px solid var(--gray6);

    &:hover {
      border-color: var(--grayD);
      background: rgba(255, 255, 255, 0.05);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 12px 24px;
    font-size: 1.5rem;
  }
`;

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <TopLine />
        <Container>
          <IconWrapper>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </IconWrapper>

          <Title>일시적인 오류가 발생했습니다</Title>

          <Description>페이지를 불러오는 중 문제가 발생했습니다.</Description>

          <SubDescription>
            잠시 후 다시 시도해 주시거나, 페이지를 새로고침해 주세요.
          </SubDescription>

          {import.meta.env.DEV && error && (
            <ErrorDetails>
              <summary>에러 상세 정보 (개발 모드)</summary>
              <pre>
                {error.message || error.statusText || "알 수 없는 오류"}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </ErrorDetails>
          )}

          <ButtonGroup>
            <Button className="primary" onClick={handleReload}>
              <FontAwesomeIcon icon={faRotateRight} />
              새로고침
            </Button>
            <Button className="secondary" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHouse} />
              홈으로 가기
            </Button>
          </ButtonGroup>
        </Container>
        <BottomLine />
      </Wrapper>
    </>
  );
};

export default ErrorPage;
