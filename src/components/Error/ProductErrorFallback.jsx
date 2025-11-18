import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorContainer = styled.div`
  padding: 120px 0;
  text-align: center;

  @media screen and (max-width: 1024px) {
    padding: 90px 0;
  }
  @media screen and (max-width: 768px) {
    padding: 80px 0;
  }
  @media screen and (max-width: 500px) {
    padding: 60px 0;
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
  }
  @media screen and (max-width: 500px) {
    font-size: 1.4rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.4);

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.1rem;
  }
`;

const ProductErrorFallback = () => {
  return (
    <ErrorContainer>
      <ErrorIcon>
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </ErrorIcon>
      <ErrorTitle>상품을 불러올 수 없습니다</ErrorTitle>
      <ErrorMessage>잠시 후 다시 시도해주세요</ErrorMessage>
    </ErrorContainer>
  );
};

export default ProductErrorFallback;
