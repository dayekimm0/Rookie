import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import useProductStore from "../stores/ProductStore";
import InfluencerProductCategory from "../components/ProductList/InfluencerProductCategory";
import InfluencerPaginateProduct from "../components/ProductList/InfluencerPaginateProduct";
import { shuffleArray } from "../productlist_utils/productShuffle";
import influencerProducts from "../data/rookie.json";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light);
  padding: 0 5%;
  overflow: hidden;
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 3%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 0 15px;
  }
`;

const Contents = styled.div`
  margin-top: 5%;
  min-width: 1310px;
  min-height: 500px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  p {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    min-width: 0px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const SlideLoaderWrapper = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
  }
`;

const SvgSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  .path {
    stroke: var(--main);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const InfluencerProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    selectedCategory,
    setSelectedCategory,
    sort,
    setSort,
    initialShuffleDone,
    setInitialShuffleDone,
    shuffledProducts,
    setShuffledProducts,
  } = useProductStore();

  // 최초 카테고리 초기화 (ALL)
  useEffect(() => {
    setSelectedCategory("ALL");
  }, [setSelectedCategory]);

  // 정렬이 'random'이고 최초 셔플이 안 된 경우 셔플
  useEffect(() => {
    if (
      sort === "random" &&
      !initialShuffleDone &&
      influencerProducts.length > 0
    ) {
      const shuffled = shuffleArray(influencerProducts);
      setShuffledProducts(shuffled);
      setInitialShuffleDone();
    }
  }, [sort, initialShuffleDone, setShuffledProducts, setInitialShuffleDone]);

  // 필터링된 상품 목록
  const baseProducts =
    sort === "random" && initialShuffleDone
      ? shuffledProducts
      : influencerProducts;

  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === "ALL") return baseProducts;
    // 대소문자, 공백 주의하여 필터링
    return baseProducts.filter(
      (p) => p.category && p.category.trim() === selectedCategory.trim()
    );
  }, [baseProducts, selectedCategory]);

  return (
    <Container>
      <Contents>
        <InfluencerProductCategory
          products={influencerProducts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {filteredProducts.length > 0 ? (
          <InfluencerPaginateProduct items={filteredProducts} />
        ) : (
          <p style={{ color: "#888", fontSize: "16px" }}>상품이 없습니다.</p>
        )}
      </Contents>
    </Container>
  );
};

export default InfluencerProductList;
