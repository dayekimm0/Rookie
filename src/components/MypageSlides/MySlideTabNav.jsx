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
    font-weight: 500;
    border: none;
    border-radius: 100px;
    background: #f5f5f5;
    color: #111;
    cursor: pointer;

    &.active {
      background: var(--gray2);
      color: var(--main);
      font-weight: 600;
    }
  }
`;

const MySlideTabNav = ({
  allTabName = "전체",
  mypageTabs,
  selectedTab,
  isAllTab,
  onSelectTab,
}) => {
  return (
    <TabNav>
      <button
        className={isAllTab ? "active" : ""}
        onClick={() => onSelectTab("all", null)}
      >
        {allTabName}
      </button>
      {mypageTabs.map((tab) => (
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

export default React.memo(MySlideTabNav);
