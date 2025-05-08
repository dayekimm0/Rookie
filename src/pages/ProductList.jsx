import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import headerbg from "../images/banners/banner-headerbg.png";
import ProductCard from "../components/ProductCard";

const Container = styled.div`
  width: 1920px;
  height: 1000%;
  position: relative;
`;
const BannerBox = styled.div`
  position: relative;
  height: 500px;
`;

const Banner = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
  }
`;

const BannerPlayer = styled(ReactPlayer)`
  position: absolute;

  left: 50%;
  transform: translateX(-50%);
  width: 800px !important;
  height: 500px !important;
  video {
    object-fit: cover;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
  top: 8%;
  gap: 10%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: center;
  align-items: center;
`;

const ProductList = () => {
  return (
    <>
      <Container>
        <BannerBox>
          <Banner>
            <img src={headerbg} alt="bg" />
          </Banner>
          <BannerPlayer
            url="/videos/banner_kbo.mov"
            playing
            loop
            muted
            // controls={false}
          />
        </BannerBox>
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
          <ProductCard />
        </Products>
      </Container>
    </>
  );
};

export default ProductList;
