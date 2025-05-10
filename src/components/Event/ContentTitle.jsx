import React from "react";
import styled from "styled-components";
import Coupon_Ultra from "./Coupon_Ultra";
import Coupon_High from "./Coupon_High";
import Coupon_Medium from "./Coupon_Medium";
import Coupon_Low from "./Coupon_Low";

const Container = styled.div`
  width: 100%;
  text-align: center;
  color: var(--light);
  padding: 160px 0px 270px 0px;
`;

const ContentOne = styled.div`
  font-family: "Gmarketsans";
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
`;
const MediumText = styled.div`
  font-size: 7rem;
  padding-bottom: 20px;
  & b {
    font-weight: bold;
    color: var(--main);
  }
`;
const LastText = styled.div`
  font-size: 1.8rem;
  font-family: "Pretendard";
  b {
    font-weight: bold;
  }
`;

const ContentTwo = styled.div`
  margin-bottom: 26px;
  font-family: "Pretendard";
  user-select: none;
`;

const TextFirst = styled.div`
  font-size: 2.4rem;
  padding-bottom: 1.2rem;
  b {
    font-weight: bold;
  }
`;
const TextLast = styled.div`
  font-size: 1.6rem;
`;

const Coupons = styled.div`
  img {
    margin-right: 30px;
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
      <Coupons>
        <Coupon_Ultra />
        <Coupon_High />
        <Coupon_Medium />
        <Coupon_Low />
      </Coupons>
    </Container>
  );
};

export default ContentsTitle;
