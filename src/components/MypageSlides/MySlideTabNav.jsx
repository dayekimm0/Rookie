import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TabNav = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 40px;

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

const MySlideTabNav = ({}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let activeTab = "allvideo";
  if (pathname.includes("/myplay")) activeTab = "myplay";
  if (pathname.includes("/myclip")) activeTab = "myclip";

  return (
    <TabNav>
      <button
        className={activeTab === "allvideo" ? "active" : ""}
        onClick={() => navigate("/mypage/myvideo")}
      >
        전체
      </button>
      <button
        className={activeTab === "myplay" ? "active" : ""}
        onClick={() => navigate("myplay")}
      >
        PLAY
      </button>
      <button
        className={activeTab === "myclip" ? "active" : ""}
        onClick={() => navigate("myclip")}
      >
        CLIP
      </button>
    </TabNav>
  );
};

export default React.memo(MySlideTabNav);
