// SortSelect.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Wrapper for responsive positioning
const SortWrapper = styled.div`
  position: absolute;
  right: 22%;
  margin-top: 5%;

  @media screen and (max-width: 1440px) {
    right: 12%;
  }
  @media screen and (max-width: 1024px) {
    position: static;
    right: auto;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin: 0;
  }
`;

const Sort = styled.select`
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

  @media screen and (max-width: 375px) {
    font-size: 1.1rem;
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
      <Sort value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <SelectSort value="newest">신상품순</SelectSort>
        <SelectSort value="popular">인기순</SelectSort>
        <SelectSort value="lowPrice">낮은가격순</SelectSort>
        <SelectSort value="highPrice">높은가격순</SelectSort>
      </Sort>
    </SortWrapper>
  );
};

export default SortSelect;
