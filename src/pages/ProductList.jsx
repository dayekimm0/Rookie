import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import useProductStore from "../stores/ProductStore";
import { filterAndSortProducts } from "../productlist_utils/filterSort";
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
  padding: 0 5%;
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
    min-width: 1024px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 760px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 500px;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
    min-width: 375px;
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

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { teamCode } = useParams();
  const {
    selectCollabo,
    selectedBrand,
    sort,
    setSelectedBrand,
    selectedCategory,
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

  // 데이터 fetch
  const {
    data: allProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teamProducts", teamCode || "all"],
    queryFn: async () => {
      if (teamCode) {
        const res = await fetch(
          `https://rookiejson.netlify.app/teamJson/${teamCode}.json`
        );
        if (!res.ok) throw new Error("팀 상품 로딩 실패");
        return res.json();
      } else {
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

  const baseProducts = sort === "random" ? shuffledProducts : allProducts;

  // 필터링
  const filteredProducts = useMemo(() => {
    return baseProducts.filter((p) => {
      if (selectCollabo === "COLLABORATION") {
        return selectedBrand ? p.brand === selectedBrand : true;
      }
      if (selectedCategory !== "ALL") {
        return p.category === selectedCategory;
      }
      return true;
    });
  }, [baseProducts, selectCollabo, selectedBrand, selectedCategory]);

  const finalProducts = useMemo(() => {
    if (selectedCategory === "ALL") {
      // 전체 카테고리일 땐 랜덤 섞기
      return shuffleArray(filteredProducts);
    } else {
      // 특정 카테고리일 땐 기존 필터 + 정렬 유지
      return filterAndSortProducts(filteredProducts, {
        selectCollabo,
        selectedBrand,
        sort,
        searchTerm,
      });
    }
  }, [
    filteredProducts,
    selectedCategory,
    selectCollabo,
    selectedBrand,
    sort,
    searchTerm,
  ]);

  if (isLoading)
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
  if (error) return <div>에러 :{error.message}</div>;

  return (
    <Container>
      <Contents>
        <ProductCategory
          products={allProducts}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {finalProducts.length > 0 ? (
          <PaginateProduct items={finalProducts} />
        ) : (
          <p style={{ color: "#888", fontSize: "16px" }}>상품이 없습니다.</p>
        )}
      </Contents>
    </Container>
  );
};

export default ProductList;
