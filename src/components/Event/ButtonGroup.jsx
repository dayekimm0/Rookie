import React from "react";
import styled from "styled-components";

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  color: var(--gray1);
  padding-bottom: 13%;
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 500px) {
    padding-bottom: 26%;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  width: 300px;
  height: 70px;
  font-size: 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background: var(--main);
  font-weight: bold;
  margin: 0px 20px 0px 20px;
  box-shadow: 0 12px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  &:hover {
    background: var(--light);
  }
  @media screen and (max-width: 1024px) {
    width: 220px;
    height: 55px;
    font-size: 1.6rem;
    box-shadow: 0 12px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
    &:hover {
      background: var(--light);
    }
  }
  @media screen and (max-width: 500px) {
    width: 180px;
    height: 45px;
    font-size: 1.2rem;
    box-shadow: 0 12px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
    &:hover {
      background: var(--light);
    }
  }
  @media screen and (max-width: 375px) {
    width: 140px;
    height: 44px;
  }
`;

const ButtonGroup = () => {
  return (
    <Buttons>
      <Button>플레이 보러가기</Button>
      <Button>스토어 가기</Button>
    </Buttons>
  );
};

export default ButtonGroup;
