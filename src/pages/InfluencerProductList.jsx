import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import useProductStore from "../stores/ProductStore";
import InfluencerProductCategory from "../components/ProductList/InfluencerProductCategory";
import InfluencerPaginateProduct from "../components/ProductList/InfluencerPaginateProduct";
import { shuffleArray } from "../productlist_utils/productShuffle";
import influencerProducts from "../data/rookie.json";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [influencerProducts, setInfluencerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://rookiejson.netlify.app/teamJson/rookie.json"
        );
        if (!res.ok) throw new Error("데이터 로딩 실패");
        const data = await res.json();
        setInfluencerProducts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setSelectedCategory("ALL");
  }, [setSelectedCategory]);

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
  }, [sort, initialShuffleDone, influencerProducts]);

  const baseProducts =
    sort === "random" && initialShuffleDone
      ? shuffledProducts
      : influencerProducts;

  const filteredProducts = useMemo(() => {
    let filtered = baseProducts;

    if (selectedCategory && selectedCategory !== "ALL") {
      filtered = filtered.filter(
        (p) => p.category && p.category.trim() === selectedCategory.trim()
      );
    }

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.trim().toLowerCase();
      filtered = filtered.filter((p) =>
        [p.name, p.brand, p.influencer, p.team].some((field) =>
          field?.toLowerCase().includes(lower)
        )
      );
    }

    return filtered;
  }, [baseProducts, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <SlideLoaderWrapper>
        <SvgSpinner viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </SvgSpinner>
      </SlideLoaderWrapper>
    );
  }

  if (error) {
    return (
      <Container>
        <Contents>
          <p style={{ color: "red" }}>데이터 로딩 실패: {error}</p>
        </Contents>
      </Container>
    );
  }

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
