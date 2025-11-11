// components/Error/SlideErrorFallback.jsx
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media screen and (max-width: 1024px) {
    height: 400px;
  }
  @media screen and (max-width: 768px) {
    height: 350px;
  }
  @media screen and (max-width: 500px) {
    height: 300px;
  }
`;

const ErrorIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.3);

  @media screen and (max-width: 1024px) {
    font-size: 4.5rem;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 18px;
  }
  @media screen and (max-width: 500px) {
    font-size: 3.5rem;
    margin-bottom: 15px;
  }
`;

const ErrorTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.4rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
`;

const RetryButton = styled.button`
  padding: 12px 30px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--light);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media screen and (max-width: 768px) {
    padding: 10px 24px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 500px) {
    padding: 8px 20px;
    font-size: 1.1rem;
  }
`;

const SlideErrorFallback = ({ resetErrorBoundary, onRetry }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </ErrorIcon>
      <ErrorTitle>영상을 불러올 수 없습니다</ErrorTitle>
      <ErrorMessage>잠시 후 다시 시도해주세요</ErrorMessage>

      <RetryButton
        onClick={() => {
          onRetry();
          resetErrorBoundary();
        }}
      >
        다시 시도
      </RetryButton>
    </ErrorContainer>
  );
};

export default SlideErrorFallback;
