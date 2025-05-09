import React, { useState, useRef, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import styled from "styled-components";

const CategoryContainer = styled.div``;

const Category = styled.div`
  height: 50px;
  background: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CollaboCategory = styled.div`
  position: relative;
  width: 680px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grayF5);
  border-radius: 26px;
  margin-top: 2%;
  left: 50%;
  transform: translateX(-50%);
`;

const CollaboBrand = styled.div`
  position: relative;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  span {
    color: var(--gray8);
    font-weight: 400;
    transition: all 0.3s ease;
  }
  span.active {
    color: var(--main);
    font-weight: 600;
  }
`;

const MotionBg = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--dark);
  border-radius: 26px;
  z-index: 1;
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

const ProductCategory = () => {
  const brands = [
    "최고심",
    "빠더너스",
    "마루는 강쥐",
    "잔망루피",
    "위글위글",
    "1993STUDIO",
    "키니키니",
  ];
  const [selectCollabo, setSelectCollabo] = useState("ALL");
  const [selectedBrand, setSelectedBrand] = useState("최고심");
  const [bgStyle, setBgStyle] = useState({ left: 0, width: 0 });
  const brandRefs = useRef({});
  useEffect(() => {
    if (selectCollabo === "COLLABORATION") {
      setSelectedBrand(brands[0]);
    }
  }, [selectCollabo]);
  useEffect(() => {
    const el = brandRefs.current[selectedBrand];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setBgStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [selectedBrand]);

  return (
    <CategoryContainer>
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
          <LayoutGroup>
            <CollaboCategory>
              {/* 배경은 가장 밑에 단 하나 */}
              <MotionBg
                animate={bgStyle}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              {brands.map((brand) => (
                <CollaboBrand
                  key={brand}
                  ref={(el) => (brandRefs.current[brand] = el)}
                  onClick={() => setSelectedBrand(brand)}
                >
                  <span className={selectedBrand === brand ? "active" : ""}>
                    {brand}
                  </span>
                </CollaboBrand>
              ))}
            </CollaboCategory>
          </LayoutGroup>
        </motion.div>
      )}
    </CategoryContainer>
  );
};

export default ProductCategory;
