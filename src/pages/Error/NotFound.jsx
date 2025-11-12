// src/pages/error/NotFound.jsx
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faHouse,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 377px); // 헤더 + 푸터 제외
  background: var(--dark);
  color: var(--light);
  padding: 60px 20px;

  @media screen and (max-width: 1024px) {
    min-height: calc(100vh - 300px);
  }
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

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconWrapper>
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </IconWrapper>

      <Title>페이지를 찾을 수 없습니다</Title>

      <Description>
        지금 입력하신 주소의 페이지는 사라졌거나
        <br />
        다른 페이지로 변경되었습니다.
      </Description>

      <SubDescription>주소를 다시 확인해 주세요.</SubDescription>

      <ButtonGroup>
        <Button className="primary" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHouse} />
          홈으로 가기
        </Button>
        <Button className="secondary" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
          이전 페이지
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NotFound;
