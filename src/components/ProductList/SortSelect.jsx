// SortSelect.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import updownIcon from "../../images/icons/arrowUpdown.svg";

const SortWrapper = styled.div`
  @media screen and (max-width: 1440px) {
    right: 12%;
  }
  @media screen and (max-width: 1024px) {
    position: static;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin: 0;
  }
`;

const Sort = styled.select`
  padding: 10px;
  padding-right: 20px;
  appearance: none;
  border: none;
  font-size: 1.4rem;
  color: var(--dark);
  font-weight: 500;
  cursor: pointer;
  background-image: ${({ $backgroundImageUrl }) =>
    `url("${$backgroundImageUrl}")`};
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 15px auto;
  z-index: 3;
  outline: none;
  &:active {
    outline: none;
  }

  @media screen and (max-width: 1440px) {
    padding: 10px 10px 10px 5px;
    background-size: 14px auto;
  }
  @media screen and (max-width: 1024px) {
    padding: 10px 10px 10px 0;
  }
  @media screen and (max-width: 768px) {
    padding: 10px 10px 10px 0;
    background-size: 13px auto;
  }
  @media screen and (max-width: 375px) {
    font-size: 1.2rem;
    padding: 10px 10px 10px 0;
    background-size: 12px auto;
  }
`;

const SelectSort = styled.option`
  font-size: 1.4rem;
`;

// SortSelect Component
const SortSelect = ({ defaultValue = "newest", onChange }) => {
  const [sortType, setSortType] = useState(defaultValue);

  useEffect(() => {
    if (onChange) {
      onChange(sortType);
    }
  }, [sortType, onChange]);

  return (
    <SortWrapper>
      <Sort
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        $backgroundImageUrl={updownIcon}
      >
        <SelectSort value="newest">신상품순</SelectSort>
        <SelectSort value="popular">인기순</SelectSort>
        <SelectSort value="lowPrice">낮은가격순</SelectSort>
        <SelectSort value="highPrice">높은가격순</SelectSort>
      </Sort>
    </SortWrapper>
  );
};

export default SortSelect;
