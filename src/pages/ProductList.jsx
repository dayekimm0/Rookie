import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import useProductStore from "../stores/ProductStore";
import { filterAndSortProducts } from "../productlist_utils/filterSort";
import ProductBanner from "../components/ProductList/ProductBanner";
import ProductCategory from "../components/ProductList/ProductCategory";
import PaginateProduct from "../components/ProductList/PaginateProduct";
import { shuffleArray } from "../productlist_utils/productShuffle";

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--light);
  overflow: hidden;
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
    initialShuffleDone,
    setInitialShuffleDone,
    shuffledProducts,
    setShuffledProducts,
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

  const teamCodeToBannerKey = {
    ssg_lds: "ssg",
    ds_bas: "doosan",
    hw_egs: "hanwha",
    kiwoom: "kiwoom",
    lg_twins: "lg",
    lt_gnt: "lotte",
    nc_dns: "nc",
    ss_lns: "samsung",
    kia_tgs: "kia",
    kt_wiz: "kt",
  };

  const bannerKey = teamCodeToBannerKey[teamCode] || "kbo";

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

  // 최초 브랜드 셋팅
  useEffect(() => {
    if (!selectedBrand?.trim() && allProducts.length > 0) {
      const brands = Array.from(
        new Set(allProducts.map((p) => p.brand).filter(Boolean))
      );
      if (brands.length > 0) setSelectedBrand(brands[0]);
    }
  }, [allProducts, selectedBrand, setSelectedBrand]);

  // 최초 랜덤 셔플 한 번 실행
  useEffect(() => {
    if (sort === "random" && !initialShuffleDone && allProducts.length > 0) {
      const shuffled = shuffleArray(allProducts);
      setShuffledProducts(shuffled);
      setInitialShuffleDone();
    }
  }, [
    sort,
    initialShuffleDone,
    allProducts,
    setShuffledProducts,
    setInitialShuffleDone,
  ]);

  // // 최초 로딩 시 선택 브랜드 초기화
  // useEffect(() => {
  //   if (!selectedBrand?.trim() && brands.length > 0) {
  //     setSelectedBrand(brands[0]);
  //   }
  // }, [brands, selectedBrand, setSelectedBrand]);

  const baseProducts = sort === "random" ? shuffledProducts : allProducts;

  // 필터링 & 정렬
  const filteredAndSortedProducts = filterAndSortProducts(
    baseProducts.filter((p) => {
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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 :{error.message}</div>;

  return (
    <Container>
      <ProductBanner team={bannerKey || "kbo"} />
      <ProductCategory />
      <PaginateProduct items={filteredAndSortedProducts} />
    </Container>
  );
};

export default ProductList;
