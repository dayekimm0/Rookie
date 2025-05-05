import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
  width: 1920px;
  height: 6000px;
`;

const Banner = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
`;

const BannerPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw !important;
  height: auto !important;
  transform: translate(-50%, -50%);
  video {
    object-fit: cover;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
`;

const Item = styled.div`
  font-size: 2rem;
  color: var(--gray8);
  padding: 10px 6px;
  cursor: pointer;
  &:last-child {
    color: var(--dark);
    font-weight: 600;
  }
`;

const Sort = styled.div``;

const SelectSort = styled.div``;

const ProductList = () => {
  return (
    <>
      <Container>
        <Banner>
          <BannerPlayer
            url="/videos/banner_kbo.mov"
            playing
            loop
            muted
            // controls={false}
          />
        </Banner>
        <Sort>
          <SelectSort>신상품순</SelectSort>
          <SelectSort>인기순</SelectSort>
          <SelectSort>낮은 가격순</SelectSort>
          <SelectSort>높은 가격순</SelectSort>
        </Sort>
        <Category>
          <Item>ALL</Item>
          <Item>유니폼</Item>
          <Item>응원용품</Item>
          <Item>의류</Item>
          <Item>잡화</Item>
          <Item>COLLABORATION</Item>
        </Category>
      </Container>
    </>
  );
};

export default ProductList;
