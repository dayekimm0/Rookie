import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, LayoutGroup } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import SortSelect from "./SortSelect";

const CategoryWrapper = styled.div`
  width: 100%;
`;

const CategoryContainer = styled.div`
  width: 100%;
  background: var(--light);

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Category = styled.div`
  height: 50px;
  background: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: ${({ active }) => (active ? "var(--dark)" : "var(--gray8)")};
  background: ${({ active }) => (active ? "var(--main)" : "transparent")};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  padding: 10px 30px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: var(--main);
    color: var(--dark);
    font-weight: 600;
  }

  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
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
`;

const CollaboBrand = styled.div`
  padding: 10px 18px;
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
`;

const MotionBg = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--dark);
  border-radius: 26px;
  z-index: 1;
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
    width: 100%;
    left: 0;
    right: 0;
    margin-top: 0;
  }
`;

const Sidebar = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 0 3%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span:first-child {
      display: none;
    }
    svg {
      display: none;
    }
  }
`;

const SidebarToggle = styled.div`
  cursor: pointer;
  span {
    font-weight: bold;
  }
`;

const SidebarItem = styled.div`
  font-size: 1.6rem;
  color: ${({ active }) => (active ? "var(--bg)" : "var(--gray8)")};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: var(--bg);
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    padding: 12px 0;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%; /* 사이드바 바로 아래 */
  left: 0;
  background: #fff;
  border: 1px solid var(--gray5);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 180px;

  @media screen and (max-width: 500px) {
    position: fixed; /* 화면에 고정 */
    top: 50px; /* 적절히 조절 (필요시 조정) */
    left: 0;
    right: 0;
    width: auto;
    margin: 0 10px;
    border-radius: 8px;
  }
`;

const Sort = styled.div`
  margin-top: 10px;
  @media screen and (max-width: 500px) {
    margin-left: 3%;
  }
`;

const Categories = [
  "ALL",
  "유니폼",
  "응원용품",
  "의류",
  "잡화",
  "COLLABORATION",
];

const ProductCategory = ({
  products = [],
  selectCollabo,
  setSelectCollabo,
  selectedBrand,
  setSelectedBrand,
  sort,
  setSort,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bgStyle, setBgStyle] = useState({ left: 0, width: 0 });
  const [showCategories, setShowCategories] = useState(true);
  const [showCollaborationBrands, setShowCollaborationBrands] = useState(true);
  const brandRefs = useRef({});

  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const collaborationBrands = [
    ...new Set(products?.map((p) => p.collaboration).filter(Boolean)),
  ];

  // ▼ 카테고리 클릭 핸들러 수정: 콜라보 선택 시 드롭다운 토글, 아닐 때 닫기
  const handleCategoryClick = (cat) => {
    setSelectCollabo(cat);
    if (cat === "COLLABORATION") {
      setDropdownOpen(!dropdownOpen); // 토글
    } else {
      setDropdownOpen(false); // 다른 카테고리 선택 시 닫기
    }
  };

  // ▼ 브랜드 클릭 시 드롭다운 닫고 브랜드 선택
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (selectCollabo === "COLLABORATION") {
      setSelectedBrand(brands[0]);
    }
  }, [selectCollabo, brands, setSelectedBrand]);

  useEffect(() => {
    const el = brandRefs.current[selectedBrand];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setBgStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [selectedBrand]);

  return (
    <CategoryWrapper>
      {/* PC */}
      <CategoryContainer>
        <SortSelect value={sort} onChange={setSort} />
        <Category>
          {Categories.map((category) => (
            <CategoryItem
              key={category}
              active={selectCollabo === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryItem>
          ))}
        </Category>

        {selectCollabo === "COLLABORATION" && dropdownOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
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

      {/* Mobile/Tablet */}
      <TabletContainer>
        <Sidebar>
          <SidebarToggle onClick={() => setShowCategories((prev) => !prev)}>
            <span>CATEGORY</span>
            <FontAwesomeIcon
              icon={showCategories ? faChevronUp : faChevronDown}
            />
          </SidebarToggle>

          {showCategories &&
            Categories.map((cat) => (
              <SidebarItem
                key={cat}
                active={selectCollabo === cat}
                onClick={() => {
                  setSelectCollabo(cat);
                  if (cat === "COLLABORATION") setShowCollaborationBrands(true);
                }}
              >
                {cat}
              </SidebarItem>
            ))}

          {selectCollabo === "COLLABORATION" &&
            showCollaborationBrands &&
            brands.map((brand) => (
              <SidebarItem
                key={brand}
                active={selectedBrand === brand}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </SidebarItem>
            ))}
        </Sidebar>
        <Sort>
          <SortSelect value={sort} onChange={setSort} />
        </Sort>
      </TabletContainer>
    </CategoryWrapper>
  );
};

export default ProductCategory;
