import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductBanner from "../components/ProductList/ProductBanner";
import ProductCategory from "../components/ProductList/ProductCategory";
import PaginateProduct from "../components/ProductList/PaginateProduct";

const Container = styled.div`
  width: 1920px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light);
  @media screen and (max-width: 1440px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectCollabo, setSelectCollabo] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sort, setSort] = useState("newest");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("https://rookiejson.netlify.app/teamJson/nc_dns.json")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        // 콜라보 브랜드만 추출 (중복 제거)
        const collaboBrands = Array.from(
          new Set(data.map((item) => item.brand))
        ).filter((brand) => brand && brand.trim() !== "");
        setBrands(collaboBrands);
        setSelectedBrand(collaboBrands[0] || "");
      })
      .catch((err) => console.error("데이터 로딩 오류:", err));
  }, []);

  // 필터링: ALL, COLLABORATION, 기타 카테고리 구분
  const filteredProducts = allProducts.filter((item) => {
    if (selectCollabo === "ALL") return true;
    if (selectCollabo === "COLLABORATION") {
      return item.brand === selectedBrand;
    }
    return item.category === selectCollabo;
  });

  // 정렬 기능 (예시: 최신순, 가격순 등 구현 가능)
  const sortedProducts = [...filteredProducts];
  if (sort === "newest") {
    sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // date 필드가 있다고 가정
  }

  return (
    <Container>
      <ProductBanner />
      <ProductCategory
        brands={brands}
        selectCollabo={selectCollabo}
        setSelectCollabo={setSelectCollabo}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        sort={sort}
        setSort={setSort}
      />
      <PaginateProduct items={sortedProducts} itemsPerPage={8} />
    </Container>
  );
};

export default ProductList;
