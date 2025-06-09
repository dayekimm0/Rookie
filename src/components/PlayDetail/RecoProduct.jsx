import styled from "styled-components";
import itemMockup from "/src/images/mockup/lgtwins_uniform.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RecoProductImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecoProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .brandGo {
    width: 100%;
    margin-bottom: 4px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
    .brand {
      color: var(--light);
    }
    svg {
      padding-bottom: 1px;
      width: 6px;
      stroke-width: 2;
      stroke: var(--light);
    }
  }
  .name {
    margin-bottom: 18px;
    cursor: pointer;
    font-size: 1.6rem;
    color: var(--light);
    line-height: 1.3;
  }
  .price {
    color: var(--light);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const RecoProduct = () => {
  return (
    <Container>
      <RecoProductImg>
        <img src={itemMockup} alt="lgtwins" />
      </RecoProductImg>
      <RecoProductInfo>
        <div className="brandGo">
          <div className="brand">LG트윈스</div>
          <svg viewBox="0 0 8 15" fill="none">
            <path
              d="M1.48926 1.98944L6.99982 7.5L1.48926 13.0106"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
        <div className="price">99,000원</div>
      </RecoProductInfo>
    </Container>
  );
};

export default RecoProduct;
