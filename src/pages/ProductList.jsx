import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
  width: 1920px;
  height: 1000%;
  position: relative;
`;

const Banner = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
  background: #111;
`;

// const BannerPlayer = styled(ReactPlayer)`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 100vw !important;
//   height: auto !important;
//   transform: translate(-50%, -50%);
//   video {
//     object-fit: cover;
//   }
// `;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
`;

const Item = styled.div`
  font-size: 1.8rem;
  color: var(--gray8);
  padding: 10px 6px;
  cursor: pointer;
`;

const Sort = styled.select`
  position: absolute;
  left: 5%;
  padding: 10px;
  padding-right: 30px;
  appearance: none;
  border: none;
  background: transparent;
  font-size: 1.8rem;
  color: var(--gray2);
  font-weight: 500;
  margin-top: 40px;
  cursor: pointer;
  background: url("https://static-00.iconduck.com/assets.00/sort-icon-1024x822-vbivf60x.png");
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 18px auto;
`;

const SelectSort = styled.option`
  font-size: 1.4rem;
`;

const Products = styled.div`
  position: absolute;
  top: 10%;
  gap: 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: center;
  align-items: center;
`;

const ProductCard = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;

  img {
    width: 240px;
    height: 320px;
    margin-bottom: 27px;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  .brand {
    margin-bottom: 4px;
  }
  .name {
    margin-bottom: 10px;
  }
  .price {
    font-size: 1.8rem;
  }
`;

const ProductList = () => {
  return (
    <>
      <Container>
        <Banner>
          {/* <BannerPlayer
            url="/videos/banner_kbo.mov"
            playing
            loop
            muted
            // controls={false}
          /> */}
        </Banner>
        <Sort>
          <SelectSort value="newest">신상품순</SelectSort>
          <SelectSort value="popular">인기순</SelectSort>
          <SelectSort value="lowPrice">낮은가격순</SelectSort>
          <SelectSort value="highPrice">높은가격순</SelectSort>
        </Sort>
        <Category>
          <Item>ALL</Item>
          <Item>유니폼</Item>
          <Item>응원용품</Item>
          <Item>의류</Item>
          <Item>잡화</Item>
          <Item>COLLABORATION</Item>
        </Category>
        <Products>
          <ProductCard>
            <img
              src="https://www.twinscorestore.co.kr/web/product/medium/202504/02d39da816205124f12937d598399de4.jpg"
              alt="lgtwins"
            />
            <ProductInfo>
              <div className="brand">LG 트윈스</div>
              <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
              <div className="price">99,000원</div>
            </ProductInfo>
          </ProductCard>
          <ProductCard>
            <img
              src="https://www.twinscorestore.co.kr/web/product/medium/202504/02d39da816205124f12937d598399de4.jpg"
              alt="lgtwins"
            />
            <ProductInfo>
              <div className="brand">LG 트윈스</div>
              <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
              <div className="price">99,000원</div>
            </ProductInfo>
          </ProductCard>
          <ProductCard>
            <img
              src="https://www.twinscorestore.co.kr/web/product/medium/202504/02d39da816205124f12937d598399de4.jpg"
              alt="lgtwins"
            />
            <ProductInfo>
              <div className="brand">LG 트윈스</div>
              <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
              <div className="price">99,000원</div>
            </ProductInfo>
          </ProductCard>
          <ProductCard>
            <img
              src="https://www.twinscorestore.co.kr/web/product/medium/202504/02d39da816205124f12937d598399de4.jpg"
              alt="lgtwins"
            />
            <ProductInfo>
              <div className="brand">LG 트윈스</div>
              <div className="name">최고심 콜라보 캐릭터 유니폼(PINK)</div>
              <div className="price">99,000원</div>
            </ProductInfo>
          </ProductCard>
        </Products>
      </Container>
    </>
  );
};

export default ProductList;
