import styled, { keyframes } from "styled-components";

// 펄스 애니메이션
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ProductCardWrap = styled.div`
  margin-top: 120px;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 50px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  }
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const SkeletonCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonImage = styled.div`
  width: 100%;
  padding-top: 100%;
  background: rgba(255, 255, 255, 0.08);
`;

const SkeletonContent = styled.div`
  padding: 15px;
`;

const SkeletonTitle = styled.div`
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  margin-bottom: 10px;
  width: 80%;
`;

const SkeletonPrice = styled.div`
  height: 16px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  width: 50%;
`;

const HomeProductSkeleton = () => {
  return (
    <>
      {/* COLLABORATION 섹션 */}
      <ProductCardWrap>
        <h3>COLLABORATION</h3>
        <SkeletonGrid>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i}>
              <SkeletonImage />
              <SkeletonContent>
                <SkeletonTitle />
                <SkeletonPrice />
              </SkeletonContent>
            </SkeletonCard>
          ))}
        </SkeletonGrid>
      </ProductCardWrap>

      {/* RELEASE 섹션 */}
      <ProductCardWrap>
        <h3>RELEASE</h3>
        <SkeletonGrid>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i}>
              <SkeletonImage />
              <SkeletonContent>
                <SkeletonTitle />
                <SkeletonPrice />
              </SkeletonContent>
            </SkeletonCard>
          ))}
        </SkeletonGrid>
      </ProductCardWrap>

      {/* FAVORITE 섹션 */}
      <ProductCardWrap>
        <h3>FAVORITE</h3>
        <SkeletonGrid>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonCard key={i}>
              <SkeletonImage />
              <SkeletonContent>
                <SkeletonTitle />
                <SkeletonPrice />
              </SkeletonContent>
            </SkeletonCard>
          ))}
        </SkeletonGrid>
      </ProductCardWrap>
    </>
  );
};

export default HomeProductSkeleton;
