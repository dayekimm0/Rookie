import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import useProductStore from "../stores/ProductStore";
import { filterAndSortProducts } from "../utils/filterSort";
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
  const { teamCode } = useParams();
  const {
    selectCollabo,
    selectedBrand,
    sort,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
  } = useProductStore();

  const teamCodes = [
    "nc_dns",
    "ss_lns",
    "lg_twins",
    "ds_bas",
    "kia_tgs",
    "lt_gnt",
    "kt_wiz",
    "hw_egs",
    "kw_hrs",
    "ssg_lds",
  ];

  // React Query로 직접 fetch
  const {
    data: allProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teamProducts", teamCode || "all"],
    queryFn: async () => {
      if (teamCode) {
        // 특정 팀만 fetch
        const res = await fetch(
          `https://rookiejson.netlify.app/teamJson/${teamCode}.json`
        );
        if (!res.ok) throw new Error("팀 상품 로딩 실패");
        const data = await res.json();
        return data;
      } else {
        // 전체 팀 fetch
        const requests = teamCodes.map((code) =>
          fetch(`https://rookiejson.netlify.app/teamJson/${code}.json`).then(
            (res) => {
              if (!res.ok) throw new Error(`데이터 로드 실패: ${code}`);
              return res.json();
            }
          )
        );
        const results = await Promise.all(requests);
        return results.flat();
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  // 브랜드 리스트 추출
  const brands = Array.from(
    new Set(allProducts.map((item) => item.brand))
  ).filter((brand) => brand && brand.trim() !== "");

  // 최초 로딩 시 선택 브랜드 설정
  useEffect(() => {
    if (!selectedBrand?.trim() && brands.length > 0) {
      setSelectedBrand(brands[0]);
    }
  }, [brands, selectedBrand, setSelectedBrand]);

  const sortedProducts = filterAndSortProducts(allProducts, {
    selectCollabo,
    selectedBrand,
    sort,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 :{error.message}</div>;

  const filteredAndSortedProducts = filterAndSortProducts(
    allProducts.filter((p) => {
      if (selectCollabo === "COLLABORATION") {
        return selectedBrand ? p.brand === selectedBrand : true;
      }
      if (selectedCategory !== "ALL") {
        return p.category === selectedCategory;
      }
      return true;
    }),
    { selectCollabo, selectedBrand, sort }
  );

  return (
    <Container>
      <ProductBanner />
      <ProductCategory brands={brands} />
      <PaginateProduct items={filteredAndSortedProducts} itemsPerPage={16} />
    </Container>
  );
};

export default ProductList;
