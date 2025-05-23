import React from "react";
import styled from "styled-components";
import backgroundImg from "../images/coupon/back1.png";
import ContentsTitle from "../components/Event/ContentTitle";
import Game from "../components/Event/Game";
import { getMascort } from "../util_mascort";
import authStore from "../stores/AuthStore";

const Container = styled.div`
  width: 100%;
  background: url(${backgroundImg}) center/cover no-repeat;
  text-align: center;
  position: relative;
`;
const MascortImg = styled.div`
  img {
    width: 332px;
    height: 332px;
    position: absolute;
    bottom: 15%;
    right: 20%;
    @media screen and (max-width: 1800px) {
      width: 322px;
      height: 322px;
      bottom: 14%;
      right: 18.5%;
    }

    @media screen and (max-width: 1700px) {
      width: 312px;
      height: 312px;
      bottom: 13%;
      right: 17.5%;
    }

    @media screen and (max-width: 1600px) {
      width: 302px;
      height: 302px;
      bottom: 13%;
      right: 17.5%;
    }

    @media screen and (max-width: 1500px) {
      width: 292px;
      height: 292px;
      bottom: 13%;
      right: 17.5%;
    }

    @media screen and (max-width: 1440px) {
      width: 282px;
      height: 282px;
      bottom: 12%;
      right: 15%;
    }

    @media screen and (max-width: 1340px) {
      width: 272px;
      height: 272px;
      bottom: 11.5%;
      right: 13%;
    }

    @media screen and (max-width: 1240px) {
      width: 262px;
      height: 262px;
      bottom: 11%;
      right: 12%;
    }

    @media screen and (max-width: 1140px) {
      width: 252px;
      height: 252px;
      bottom: 10.5%;
      right: 8%;
    }

    @media screen and (max-width: 1024px) {
      width: 242px;
      height: 242px;
      bottom: 10%;
      right: 6%;
    }

    @media screen and (max-width: 960px) {
      width: 232px;
      height: 232px;
      bottom: 9.5%;
      right: 4%;
    }

    @media screen and (max-width: 860px) {
      width: 222px;
      height: 222px;
      bottom: 9%;
      right: 0%;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }

    @media screen and (max-width: 500px) {
      display: none;
    }

    @media screen and (max-width: 375px) {
      display: none;
    }
  }
`;

const teamToMascortId = {
  "두산 베어스": "0",
  "한화 이글스": "7",
  "기아 타이거즈": "1",
  "키움 히어로즈": "9",
  "KT 위즈": "4",
  "LG 트윈스": "3",
  "롯데 자이언츠": "6",
  "NC 다이노스": "8",
  "삼성 라이온즈": "2",
  "SSG 랜더스": "5",
};

const Event = () => {
  const { userProfile } = authStore();

  const teamName = userProfile?.favoriteTeam;
  const mascortId = teamToMascortId[teamName] || null;
  const mascortImg = getMascort(mascortId);

  return (
    <Container>
      <ContentsTitle />
      <Game />
      <MascortImg>
        {mascortImg ? (
          <img src={mascortImg} alt={`${teamName} 마스코트`} />
        ) : (
          <p>마스코트 없음</p>
        )}
      </MascortImg>
    </Container>
  );
};

export default Event;
