import React from "react";
import styled from "styled-components";
import CustomCheckbox from "./CustomCheckbox";

const DeskTopGrid = `
  140px
  minmax(150px, 300px) 
  minmax(80px, 90px) 
  minmax(90px, 100px)
  minmax(100px, 110px)  
`;

const TabletGrid = `
  100px
  minmax(100px, 250px) 
  minmax(70px, 80px) 
  minmax(80px, 90px)
  minmax(90px, 100px)
`;

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ul {
    width: 100%;
    display: grid;
    grid-template-columns: ${DeskTopGrid};
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    margin-bottom: 10px;

    :nth-child(1) {
      display: flex;
      align-items: center;
      gap: 5%;
    }
    :nth-child(2) {
      text-align: start;
    }
    :nth-child(3),
    :nth-child(4),
    :nth-child(5) {
      text-align: center;
    }
  }

  span {
    width: 102%;
    height: 1px;
    background: var(--gray1);
    transform: translateX(-1%);
  }

  @media screen and (max-width: 1024px) {
    ul {
      grid-template-columns: ${TabletGrid};
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 768px) {
    ul {
      grid-template-columns: minmax(100px, 200px) minmax(200px, 400px);
      font-size: 1.8rem;
    }

    :nth-child(3),
    :nth-child(4),
    :nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 375px) {
    ul {
      grid-template-columns: 140px 200px;
      font-size: 1.6rem;
    }
  }
`;

const CartMenuBar = ({ allChecked, onToggleAll }) => {
  const handleChange = (e) => {
    onToggleAll(e.target.checked);
  };

  return (
    <MenuBar>
      <ul>
        <li>
          <CustomCheckbox checked={allChecked} onChange={handleChange} />
          <p>전체선택</p>
        </li>
        <li>상품정보</li>
        <li>옵션</li>
        <li>상품금액</li>
        <li>결제금액</li>
      </ul>
      <span></span>
    </MenuBar>
  );
};

export default CartMenuBar;
