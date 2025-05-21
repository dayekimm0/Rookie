import React from "react";
import { useNavigate } from "react-router-dom";
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
    padding-bottom: 15%;
  }
  @media screen and (max-width: 500px) {
    padding-bottom: 26%;
    gap: 20px;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-bottom: 10%;
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

  @media screen and (max-width: 1440px) {
    width: 250px;
    height: 60px;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 1024px) {
    width: 220px;
    height: 50px;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 1768px) {
    width: 200px;
  }
  @media screen and (max-width: 500px) {
    width: 150px;
    height: 45px;
    font-size: 1.2rem;
    margin: 0 auto;
  }
  @media screen and (max-width: 376px) {
    width: 130px;
    height: 38px;
  }
`;

const ButtonGroup = () => {
  const navigate = useNavigate();
  return (
    <Buttons>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        플레이 보러가기
      </Button>
      <Button
        onClick={() => {
          navigate("/store");
        }}
      >
        스토어 가기
      </Button>
    </Buttons>
  );
};

export default ButtonGroup;
