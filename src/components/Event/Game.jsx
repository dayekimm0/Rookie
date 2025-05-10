import React from "react";
import styled from "styled-components";
import TextBox from "../../images/coupon/text_box.png";
import BallImg from "../../images/coupon/baseball.png";
import ButtonGroup from "./ButtonGroup";

const Container = styled.div`
  font-family: "Pretendard";
`;

const GameBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0fr);
  grid-template-rows: repeat(3, 0fr);
  justify-content: center;
  align-content: center;
  gap: 8px;
  padding: 22px 0px 81px 0px;
`;

const GameBoxBackground = styled.div`
  background: var(--light);
  border-radius: 7px;
  justify-content: center;
  align-content: center;
  padding: 5px;
`;

const GameBoxContent = styled.img`
  width: 120px;
  height: 120px;
  cursor: pointer;
  padding: 15px;
  background: var(--gray8);
  border-radius: 8px;
`;

const Game = () => {
  return (
    <>
      <Container>
        <img src={TextBox} />
        <GameBox>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
          <GameBoxBackground>
            <GameBoxContent src={BallImg} />
          </GameBoxBackground>
        </GameBox>
        <ButtonGroup />
      </Container>
    </>
  );
};

export default Game;
