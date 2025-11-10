import { useMemo } from "react";
import useAllProductsQuery from "../../hook/useAllProductsQuery";
import HomeProducts from "./HomeProducts";
import styled from "styled-components";

const ProductCardWrap = styled.div`
  margin-top: 120px;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 50px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  }
`;

const HomeProductSection = () => {
  const { data: allProducts } = useAllProductsQuery();

  const { kiaTinypingCollabo, newest, popular } = useMemo(() => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());

    const kiaTinypingCollabo = allProducts
      .filter(
        (item) =>
          item.team === "kia_tgs" &&
          item.collaboration &&
          item.collaboration.includes("티니핑")
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    const usedIds = new Set(kiaTinypingCollabo.map((p) => p.id));
    const newest = shuffled.filter((item) => !usedIds.has(item.id)).slice(0, 4);
    newest.forEach((p) => usedIds.add(p.id));
    const popular = shuffled
      .filter((item) => !usedIds.has(item.id))
      .slice(0, 8);

    return { kiaTinypingCollabo, newest, popular };
  }, [allProducts]);

  return (
    <>
      <ProductCardWrap>
        <h3>COLLABORATION</h3>
        <HomeProducts products={kiaTinypingCollabo} />
      </ProductCardWrap>
      <ProductCardWrap>
        <h3>RELEASE</h3>
        <HomeProducts products={newest} />
      </ProductCardWrap>
      <ProductCardWrap>
        <h3>FAVORITE</h3>
        <HomeProducts products={popular} />
      </ProductCardWrap>
    </>
  );
};

export default HomeProductSection;
