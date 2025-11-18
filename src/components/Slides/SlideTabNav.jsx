import React from "react";
import styled from "styled-components";

const TabNav = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 24px;
  flex-wrap: wrap;

  button {
    padding: 8px 18px;
    font-size: 1.4rem;
    border: none;
    border-radius: 100px;
    background: var(--gray2);
    color: var(--grayE);
    cursor: pointer;
    word-break: keep-all;

    &.active {
      background: #f5f5f5;
      color: #111;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 1024px) {
    gap: 10px;
    padding-bottom: 18px;
    button {
      padding: 7px 16px;
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 500px) {
    gap: 8px;
    padding-bottom: 14px;
    button {
      padding: 6px 14px;
      font-size: 1.2rem;
    }
  }
`;

const SlideTabNav = ({
  allTabName = "전체",
  tabs,
  selectedTab,
  isAllTab,
  onSelectTab,
}) => {
  return (
    <TabNav className="inner">
      <button
        className={isAllTab ? "active" : ""}
        onClick={() => onSelectTab("all", null)}
      >
        {allTabName}
      </button>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={
            !isAllTab && selectedTab?.name === tab.name ? "active" : ""
          }
          onClick={() => onSelectTab("single", tab)}
        >
          {tab.name}
        </button>
      ))}
    </TabNav>
  );
};

export default React.memo(SlideTabNav);
