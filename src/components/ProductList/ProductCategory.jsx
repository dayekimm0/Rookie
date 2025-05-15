import React, { useState, useRef, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import styled from "styled-components";
import SortSelect from "./SortSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faW,
} from "@fortawesome/free-solid-svg-icons";

const CategoryWrapper = styled.div`
  width: 100%;
`;

const CategoryContainer = styled.div`
  width: 100%;
  background: var(--light);
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }

  @media screen and (max-width: 500px) {
  }

  @media screen and (max-width: 375px) {
  }
`;

const Category = styled.div`
  height: 50px;
  background: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1440px) {
    height: 40px;
  }
  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 500px) {
  }

  @media screen and (max-width: 375px) {
  }
`;

const CollaboCategory = styled.div`
  position: absolute;
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
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 500px) {
  }

  @media screen and (max-width: 375px) {
  }
`;

const CollaboBrand = styled.div`
  padding: 10px 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  span {
    color: var(--gray8);
    font-weight: 400;
    transition: all 0.3s ease;
    &.active {
      color: var(--main);
      font-weight: 600;
    }
  }
  @media screen and (max-width: 1440px) {
    font-size: 1.5rem;
    span {
      &.active {
        font-weight: 500;
      }
    }
  }
  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 500px) {
  }

  @media screen and (max-width: 375px) {
  }
`;

const MotionBg = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--dark);
  border-radius: 26px;
  z-index: 1;
  @media screen and (max-width: 1440px) {
  }
  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 500px) {
  }

  @media screen and (max-width: 375px) {
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
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 500px) {
  }

  @media screen and (max-width: 375px) {
  }
`;

const TabletContainer = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
    position: absolute;
    left: 3%;
    margin-top: 5%;
  }
  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const Sidebar = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 12px;
  span {
    font-weight: bold;
    margin-bottom: 4px;
  }
  .category-item {
    cursor: pointer;
    font-size: 1.6rem;
    color: var(--gray8);
    margin-bottom: 4px;
    transition: all 0.3s;
    &:hover {
      color: var(--bg);
    }
    &.active {
      color: var(--bg);
      font-weight: 600;
    }
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      &:first-child {
        display: none;
      }
    }
    svg {
      display: none;
    }
    .category-item {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const Sort = styled.div`
  padding: 0;
  margin-left: -10px;
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
  const [bgStyle, setBgStyle] = useState([0]);
  const [showCategories, setShowCategories] = useState(true);
  const [showCollaborationBrands, setShowCollaborationBrands] = useState(true);
  const brandRefs = useRef({});
  const [sort, setSort] = useState("newest");
  const handleSortChange = (value) => {
    setSort(value);
  };

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
    <CategoryWrapper>
      <CategoryContainer>
        <SortSelect defaultValue={sort} onChange={handleSortChange} />
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
      <TabletContainer>
        <Sidebar>
          <div
            className="sidebar-title"
            onClick={() => setShowCategories(!showCategories)}
          >
            <span>CATEGORY</span>
            <FontAwesomeIcon
              icon={showCategories ? faChevronUp : faChevronDown}
              style={{ marginLeft: "6px", fontSize: "14px", cursor: "pointer" }}
            />
          </div>
          {showCategories &&
            ["ALL", "유니폼", "응원용품", "의류", "잡화", "COLLABORATION"].map(
              (cat) => (
                <div
                  key={cat}
                  className={`category-item ${
                    selectCollabo === cat ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectCollabo(cat);
                    if (cat === "COLLABORATION") {
                      (fontWeight = 600), setShowCollaborationBrands(true);
                    }
                  }}
                >
                  {cat}
                </div>
              )
            )}
          {selectCollabo === "COLLABORATION" && (
            <>
              {showCollaborationBrands &&
                brands.map((brand) => (
                  <div
                    key={brand}
                    className={`category-item ${
                      selectedBrand === brand ? "active" : ""
                    }`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </div>
                ))}
            </>
          )}

          <Sort style={{ marginTop: "10px" }}>
            <SortSelect
              defaultValue={sort}
              onChange={handleSortChange}
              style={{ position: "static", marginTop: "10px" }}
            />
          </Sort>
        </Sidebar>
      </TabletContainer>
    </CategoryWrapper>
  );
};

export default ProductCategory;
