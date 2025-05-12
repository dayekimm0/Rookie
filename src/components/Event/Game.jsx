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

  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 375px) {
    padding: 22px 0px 60px 0px;
  }
`;

const GameBoxBackground = styled.div`
  width: 130px;
  height: 130px;
  background: var(--light);
  border-radius: 7px;
  justify-content: center;
  align-content: center;
  padding: 5px;
  /* 임시 */
  transition: all 0.5s;
  &:hover {
    background: var(--main);
  }
  /* 임시 */
  @media screen and (max-width: 1024px) {
    width: 120px;
    height: 120px;
  }
  @media screen and (max-width: 375px) {
    width: 98px;
    height: 98px;
  }
`;

const GameBoxContent = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 14px;
  background: var(--gray8);
  border-radius: 8px;
  @media screen and (max-width: 375px) {
  }
`;

const TextBoxImg = styled.img`
  @media screen and (max-width: 375px) {
    width: 80%;
  }
`;

const Game = () => {
  return (
    <>
      <Container>
        <TextBoxImg src={TextBox} />
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
