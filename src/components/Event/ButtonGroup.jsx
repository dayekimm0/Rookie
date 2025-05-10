import React from "react";
import styled from "styled-components";

const Buttons = styled.div`
  width: 100%;
  height: 70px;
  color: var(--gray1);
`;

const Button = styled.button`
  font-size: 2.4rem;
  padding: 20.5px 80px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background: var(--main);
  font-weight: bold;
  margin-right: 30px;
  box-shadow: 0 12px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  &:hover {
    background: var(--light);
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
