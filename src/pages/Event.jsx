import React from "react";
import styled from "styled-components";
import backgroundImg from "../images/coupon/back1.png";
import ContentsTitle from "../components/Event/ContentTitle";
import Game from "../components/Event/Game";
import { getEmblem } from "../util";

const Container = styled.div`
  width: 100%;
  height: 1817px;
  background: url(${backgroundImg}) center/cover no-repeat;
  text-align: center;
`;

const Event = ({ mascort }) => {
  const MascortComponent = getEmblem(mascort);
  console.log(MascortComponent);
  return (
    <Container>
      <ContentsTitle />
      <Game />
    </Container>
  );
};

export default Event;
