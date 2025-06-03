import React from "react";
import styled from "styled-components";

const TabNav = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;

  button {
    padding: 8px 18px;
    font-size: 1.4rem;
    border: none;
    border-radius: 100px;
    background: var(--gray2);
    color: var(--grayE);
    cursor: pointer;

    &.active {
      background: #f5f5f5;
      color: #111;
      font-weight: 600;
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
