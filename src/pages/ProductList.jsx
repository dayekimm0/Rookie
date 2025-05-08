import React, { useState } from "react";
import { motion } from "framer-motion";
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
  height: 440px;
`;

const Banner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
  }
`;

const BannerPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1020px !important;
  height: 440px !important;
  video {
    object-fit: cover;
  }
`;

const Category = styled.div`
  height: 50px;
  background: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CollaboCategory = styled.div`
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 26px;
  margin-top: 2%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--grayF5);
`;

const CollaboBrand = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--dark);
    color: var(--main);
    font-weight: 600;
    border-radius: 26px;
  }
`;

const Item = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: var(--gray8);
  padding: 10px 30px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--main);
    color: var(--dark);
    font-weight: 600;
  }
`;

const Sort = styled.select`
  position: absolute;
  margin-top: 5%;
  right: 22%;
  padding: 10px;
  padding-right: 30px;
  appearance: none;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  color: var(--dark);
  font-weight: 500;
  cursor: pointer;
  background: url("https://static-00.iconduck.com/assets.00/sort-icon-1024x822-vbivf60x.png");
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 16px auto;
  z-index: 3;
`;

const SelectSort = styled.option`
  font-size: 1.4rem;
`;

const Products = styled.div`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  align-content: center;
  align-items: center;
`;

const ProductList = () => {
  const [selectCollabo, setSelectCollabo] = useState("ALL");
  return (
    <>
      <Container>
        <BannerBox>
          <Banner>
            <img src={headerbg} alt="bg" />
            <BannerPlayer
              url="/videos/banner_kbo.mov"
              playing
              loop
              muted
              controls={false}
            />
          </Banner>
        </BannerBox>
        <Sort>
          <SelectSort value="newest">신상품순</SelectSort>
          <SelectSort value="popular">인기순</SelectSort>
          <SelectSort value="lowPrice">낮은가격순</SelectSort>
          <SelectSort value="highPrice">높은가격순</SelectSort>
        </Sort>
        <Category>
          {["ALL", "유니폼", "응원용품", "의류", "잡화", "COLLABORATION"].map(
            (category) => (
              <Item
                key={category}
                onClick={() => setSelectCollabo(category)}
                style={{
                  background:
                    selectCollabo === category ? "var(--main)" : "transparent",
                  color:
                    selectCollabo === category ? "var(--dark)" : "var(--gray8)",
                  fontWeight: selectCollabo === category ? 600 : 400,
                }}
              >
                {category}
              </Item>
            )
          )}
        </Category>
        {selectCollabo === "COLLABORATION" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CollaboCategory>
              <CollaboBrand>최고심</CollaboBrand>
              <CollaboBrand>빠더너스</CollaboBrand>
              <CollaboBrand>마루는 강쥐</CollaboBrand>
              <CollaboBrand>잔망루피</CollaboBrand>
              <CollaboBrand>위글위글</CollaboBrand>
              <CollaboBrand>1993STUDIO</CollaboBrand>
              <CollaboBrand>키니키니</CollaboBrand>
            </CollaboCategory>
          </motion.div>
        )}
        <Products>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Products>
      </Container>
    </>
  );
};

export default ProductList;
