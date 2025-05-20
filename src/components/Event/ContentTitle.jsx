import React from "react";
import styled from "styled-components";
import Coupons from "./Coupons";

const Container = styled.div`
  width: 100%;
  text-align: center;
  color: var(--light);
  padding: 160px 0px 270px 0px;
  @media screen and (max-width: 1024px) {
    padding: 160px 0px 97px 0px;
  }
`;

const ContentOne = styled.div`
  font-family: "Gmarketsans";
  font-weight: bold;
  padding: 30px;
  user-select: none;
  & p {
    font-size: 1.8rem;
    color: var(--light);
    em {
      font-weight: bold;
    }
  }
`;

const TitleText = styled.div`
  font-size: 5rem;
  margin-bottom: 10px;
  @media screen and (max-width: 1024px) {
    font-size: 4rem;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 376px) {
    font-size: 2.8rem;
    margin-bottom: 8px;
  }
`;
const MediumText = styled.div`
  font-size: 7rem;
  padding-bottom: 3%;
  @media screen and (max-width: 1024px) {
    font-size: 6rem;
  }
  @media screen and (max-width: 376px) {
    font-size: 3.8rem;
  }
  & b {
    font-weight: bold;
    color: var(--main);
  }
`;
const LastText = styled.div`
  font-size: 1.8rem;
  font-family: "Pretendard";
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    margin-bottom: 5%;
  }
  @media screen and (max-width: 376px) {
    font-size: 1.1rem;
    margin-bottom: 3%;
  }
  b {
    font-weight: bold;
  }
`;

const ContentTwo = styled.div`
  margin-bottom: 26px;
  font-family: "Pretendard";
  user-select: none;
  @media screen and (max-width: 1024px) {
    margin-bottom: 3%;
  }
`;

const TextFirst = styled.div`
  font-size: 2.4rem;
  padding-bottom: 1.2rem;
  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 376px) {
    font-size: 1.6rem;
  }

  b {
    font-weight: bold;
  }
`;
const TextLast = styled.div`
  font-size: 1.6rem;
  @media screen and (max-width: 376px) {
    display: none;
  }
`;

const CouponBox = styled.div`
  img {
    margin-right: 30px;
  }

  @media screen and (max-width: 1176px) {
    display: grid;
    grid-template-columns: repeat(2, 0fr);
    grid-template-rows: repeat(2, 130px);
    justify-content: center;
    align-content: center;
    padding-left: 10px;
  }

  @media screen and (max-width: 1024px) {
    margin: 0 30px;
    display: grid;
    grid-template-columns: repeat(2, 0fr);
    grid-template-rows: repeat(2, 130px);
    justify-content: center;
    align-content: center;
  }
  @media screen and (max-width: 500px) {
    margin: 0 16px;
    display: grid;
    grid-template-columns: repeat(2, 220px);
    grid-template-rows: repeat(2, 130px);
    justify-content: center;
    align-content: center;
    img {
      margin-right: 0px;
    }
  }
  @media screen and (max-width: 376px) {
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 180px);
    grid-template-rows: repeat(2, 100px);
    justify-content: center;
    align-content: center;
    img {
      margin-right: 0px;
    }
  }
`;

const ContentsTitle = () => {
  return (
    <Container>
      <ContentOne>
        <TitleText>스트라이크존!</TitleText>
        <MediumText>
          <b>쿠폰</b>을 잡아라!
        </MediumText>
        <LastText>
          <b>이벤트 기간:</b> 2025년 04월 16일 ~ 05월 21일
        </LastText>
      </ContentOne>
      <ContentTwo>
        <TextFirst>
          <b>할인 쿠폰</b>을 얻을수 있는 단 한번의 기회!
        </TextFirst>
        <TextLast>그 한번의 기회에 당신의 운을 확인해보세요!</TextLast>
      </ContentTwo>
      <CouponBox>
        <Coupons />
      </CouponBox>
    </Container>
  );
};

export default ContentsTitle;
