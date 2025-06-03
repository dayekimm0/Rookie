import styled from "styled-components";
import RecoProduct from "./RecoProduct";

const RecoProductWrapper = styled.div`
  width: 100%;
  margin-top: 26px;
`;

const RecoProductList = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 60px;
  padding-bottom: 18px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--grayF5);
    cursor: pointer;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: var(--gray3);
    border-radius: 4px;
  }
`;

const RecoProductTitle = styled.h1`
  font-size: 2.2rem;
  color: var(--light);
  font-weight: 600;
  margin-bottom: 26px;
`;

const RecoProductPart = () => {
  return (
    <RecoProductWrapper>
      <RecoProductTitle>여기서 추천하는 ROOK</RecoProductTitle>
      <RecoProductList>
        <RecoProduct />
        <RecoProduct />
        <RecoProduct />
        <RecoProduct />
        <RecoProduct />
        <RecoProduct />
      </RecoProductList>
    </RecoProductWrapper>
  );
};

export default RecoProductPart;
