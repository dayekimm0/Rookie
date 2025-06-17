import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import SortSelect from "./SortSelect";
import useProductStore from "../../stores/ProductStore";

const CategoryWrapper = styled.div`
  width: 100%;
  @media screen and (max-width: 1440px) {
    width: 68%;
  }
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CategoryItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grayF5);
  border-radius: 50px;
  color: ${({ active }) => (active ? "var(--main)" : "var(--gray1)")};
  background: ${({ active }) => (active ? "var(--gray1)" : "var(--grayF5)")};
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.3s;

  @media screen and (max-width: 1440px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 1024px) {
  }
`;

const SearchPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SearchBar = styled.div`
  .search_bar {
    position: relative;
    border-bottom: 1px solid var(--gray1);
    padding-bottom: 4px;
    #search_form_mb {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      button,
      input {
        border: none;
        background: none;
      }
      font-size: 0;
      position: relative;
      .search_txt {
        border-radius: 100px;
        background: var(--light);
        width: 100%;
        overflow: hidden;
        transition: all 0.3s;
        font-size: 1.4rem;
        color: var(--gray1);
        &::placeholder {
          font-size: 1.6rem;
          font-family: "pretendard";
          transition: all 0.3s;
          color: var(--grayC);
        }
        &:focus {
          outline: none;
          &::placeholder {
            color: transparent;
          }
        }
      }
      .search_btn {
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    width: 80%;
    margin-bottom: 20%;
  }
`;

const TabletContainer = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
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
    gap: 0;
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

const Sort = styled.div`
  margin-top: 10px;
  @media screen and (max-width: 1024px) {
  }
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

const ProductCategory = ({ products = [], searchTerm, setSearchTerm }) => {
  const {
    selectCollabo,
    setSelectCollabo,
    selectedBrand,
    setSelectedBrand,
    sort,
    setSort,
    setSelectedCategory,
  } = useProductStore();

  const [showCategories, setShowCategories] = useState(true);
  const brandRefs = useRef({});

  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const collaborationBrands = [
    ...new Set(
      products
        .map((p) => p.collaboration)
        .filter((c) => typeof c === "string" && c.trim() !== "")
    ),
  ];

  // const subBrands =
  //   selectCollabo === "COLLABORATION" ? collaborationBrands : brands;

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectCollabo(cat);

    if (cat === "COLLABORATION") {
      setSelectedBrand(null);
    }
  };

  useEffect(() => {
    if (
      selectCollabo === "COLLABORATION" &&
      brands.length > 0 &&
      selectedBrand !== brands[0]
    ) {
      setSelectedBrand(brands[0]);
    }
  }, [selectCollabo, brands, selectedBrand, setSelectedBrand]);

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
        <Category>
          {Categories.map((category) => (
            <CategoryItem
              key={category}
              active={selectCollabo === category ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryItem>
          ))}
        </Category>
        <SearchPart>
          <SearchBar>
            <div className="search_bar">
              <form
                id="search_form_mb"
                name="search_bar_mb"
                className="search_form_mb"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="search_txt"
                  type="text"
                  placeholder="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search_btn">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>
          </SearchBar>
          <SortSelect value={sort} onChange={setSort} />
        </SearchPart>
      </CategoryContainer>

      {/* Mobile/Tablet */}
      <TabletContainer>
        <SearchBar>
          <div className="search_bar">
            <form
              id="search_form_mb"
              name="search_bar_mb"
              className="search_form_mb"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="search_txt"
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search_btn">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
        </SearchBar>
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
                  handleCategoryClick(cat); // 통일된 동작
                }}
              >
                {cat}
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
