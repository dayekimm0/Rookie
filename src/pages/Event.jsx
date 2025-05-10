import React from "react";
import styled from "styled-components";
import backgroundImg from "../images/coupon/back1.png";
import ContentsTitle from "../components/Event/ContentTitle";
import Game from "../components/Event/Game";

const Container = styled.div`
  width: 100%;
  height: 2000px;
  background: url(${backgroundImg}) center/cover no-repeat;
  text-align: center;
`;

const Event = () => {
  return (
    <Container>
      <ContentsTitle />
      <Game />
    </Container>
  );
};

export default Event;
