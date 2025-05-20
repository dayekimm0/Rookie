import { useState, useEffect } from "react";
import styled from "styled-components";
import authStore from "../stores/AuthStore";
import { getEmblem, getTeamColor } from "../util";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import partnerLogo from "../images/logos/Partner_logo.svg";
import MypageModal from "../components/Loginon/MypageModal";
import { getScrollbarWidth } from "../util";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--light);
  @media screen and (max-width: 600px) {
    padding: 0 15px;
  }
`;

const Inner = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (max-width: 1024px) {
    width: 480px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const UpBox = styled.div`
  width: 100%;
  height: 120px;
  border: 1px solid var(--gray3);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin: 50px 0 20px;
  @media screen and (max-width: 1024px) {
    height: 96px;
    padding: 24px;
    margin: 30px 0 20px;
  }
`;

const UpBoxLeft = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const UserTeam = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  img {
    width: 100%;
    scale: ${({ $isTeam6 }) => ($isTeam6 ? "80%" : "100%")};
    height: 100%;
    object-fit: cover;
    overflow: visible;
  }
  @media screen and (max-width: 1024px) {
    width: 48px;
    height: 48px;
  }
`;

const PartnerLogo = styled.img`
  position: absolute;
  margin-left: 5px;
`;

const UpBoxTitle = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  span {
    font-size: 1.2rem;
    font-weight: 400;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    span {
      font-size: 1rem;
    }
  }
`;

const UpBoxSub = styled.span`
  font-size: 1.2rem;
  color: var(--gray6);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--dark);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const MyShopping = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
  margin-bottom: 30px;
`;

const MyShoppingTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const MyShoppingInner = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 60px;
  @media screen and (max-width: 1024px) {
    gap: 40px;
  }
  @media screen and (max-width: 500px) {
    gap: 35px;
  }
`;

const MyShoppingDetail = styled.h6`
  font-size: 1.2rem;
  line-height: 2.5;
  b {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
    b {
      font-size: 1.6rem;
    }
  }
`;

const MyShoppingLine = styled.span`
  width: 1px;
  height: 54px;
  background: var(--dark);
  @media screen and (max-width: 1024px) {
    height: 48px;
  }
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyInfoTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
`;

const MyInfoLine = styled.span`
  width: 100%;
  height: 1px;
  background: var(--dark);
`;

const InfoElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 60px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 40px;
  }
`;

const InfoDetail = styled.h4`
  font-size: 1.6rem;
  line-height: 2;
  b {
    font-size: 1.8rem;
    font-weight: 700;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
    b {
      font-size: 1.6rem;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    b {
      font-size: 1.4rem;
    }
  }
`;

const InfoDetailDetail = styled.p`
  font-size: 1.4rem;
  color: var(--gray8);
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const InfoButton = styled.button`
  width: 80px;
  height: 40px;
  background: var(--dark);
  color: var(--light);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: var(--gray3);
  }
  @media screen and (max-width: 1024px) {
    width: 60px;
    height: 30px;
    font-size: 1.2rem;
  }
`;

const Delete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  h6 {
    margin-top: 17px;
    font-size: 1.2rem;
    color: var(--gray8);
    cursor: pointer;
  }
  h6:hover + span {
    opacity: 1;
  }
`;

const DeleteLine = styled.span`
  width: 66px;
  height: 1px;
  background: var(--gray8);
  margin-top: 2px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const LoadingSpinner = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--grayC);
`;

const InquiryLink = styled.a`
  padding: 10px 20px;
  background: var(--light);
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: var(--grayF5);
  }
  svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
    height: 40px;
  }
`;

const teamToEmblemId = {
  "기아 타이거즈": "1",
  "삼성 라이온즈": "2",
  "LG 트윈스": "3",
  "두산 베어스": "4",
  "KT 위즈": "5",
  "SSG 랜더스": "6",
  "롯데 자이언츠": "7",
  "한화 이글스": "8",
  "NC 다이노스": "9",
  "키움 히어로즈": "10",
};

const Mypage = () => {
  const { userProfile, isLoading } = authStore();
  const [teamModal, setTeamModal] = useState(false);

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  const openTeamModal = () => {
    setTeamModal(true);
  };

  const closeTeamModal = () => {
    setTeamModal(false);
  };

  //mobile 스토어 스크롤 막기
  useEffect(() => {
    if (teamModal) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [teamModal]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <Inner>
          <UpBox>
            <UpBoxLeft>
              <UserTeam
                $isTeam6={teamToEmblemId[userProfile.favoriteTeam] === "6"}
                style={{
                  backgroundColor: getTeamColor(
                    teamToEmblemId[userProfile.favoriteTeam] || "#fff"
                  ),
                }}
              >
                <TeamEmblem
                  emblemId={teamToEmblemId[userProfile.favoriteTeam] || "2"}
                />
              </UserTeam>
              <UpBoxTitle>
                {userProfile.username}
                {userProfile.email === "gosim@naver.com" ? (
                  <PartnerLogo src={partnerLogo} alt="" />
                ) : null}
                <br />
                <span>계정 생성일 {userProfile.createdAt}</span>
              </UpBoxTitle>
            </UpBoxLeft>
            <UpBoxSub onClick={openTeamModal}>구단변경 ›</UpBoxSub>
          </UpBox>
          <MyShopping>
            <MyShoppingTitle>마이 쇼핑</MyShoppingTitle>
            <MyShoppingInner>
              <MyShoppingDetail>
                <b>2</b>
                <br />
                장바구니
              </MyShoppingDetail>
              <MyShoppingLine />
              <MyShoppingDetail>
                <b>1</b>
                <br />
                구매완료
              </MyShoppingDetail>
              <MyShoppingLine />
              <MyShoppingDetail>
                <b>0</b>
                <br />
                배송완료
              </MyShoppingDetail>
              <MyShoppingLine />
              <MyShoppingDetail>
                <b>1</b>
                <br />
                쿠폰
              </MyShoppingDetail>
            </MyShoppingInner>
          </MyShopping>
          <MyInfo>
            <MyInfoTitle>계정 상세정보</MyInfoTitle>
            <MyInfoLine style={{ marginBottom: "40px" }} />
            <InfoElement>
              <InfoDetail>
                <b> 이메일</b>
                <br />
                {userProfile.email}
              </InfoDetail>
              <InfoButton>변경</InfoButton>
            </InfoElement>
            <InfoElement>
              <InfoDetail>
                <b> 비밀번호</b>
                <br />
                *********
              </InfoDetail>
              <InfoButton>변경</InfoButton>
            </InfoElement>
            <InfoElement>
              <InfoDetail>
                <b>닉네임</b>
                <br />
                {userProfile.nickname}
              </InfoDetail>
              <InfoButton>변경</InfoButton>
            </InfoElement>
            <InfoElement>
              <InfoDetail>
                <b>주소</b>
                {userProfile.address ? (
                  <>
                    <br />
                    {userProfile.address}
                    <br />
                    <InfoDetailDetail>
                      {userProfile.detailedAddress}
                    </InfoDetailDetail>
                  </>
                ) : (
                  <InfoDetailDetail>주소를 등록해 주세요.</InfoDetailDetail>
                )}
              </InfoDetail>
              <InfoButton>변경</InfoButton>
            </InfoElement>
            <Delete>
              <h6
                onClick={() => {
                  alert("준비중인 서비스 입니다.");
                }}
              >
                계정 삭제하기
              </h6>
              <DeleteLine />
            </Delete>
          </MyInfo>
          {userProfile.email === "gosim@naver.com" ? (
            <>
              <InquiryLink
                href="https://docs.google.com/forms/d/e/1FAIpQLScLQEzsdPMIHZiFxtQlq50tSpVLsZtvmxE3anLsND5uvQAQiw/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faEdit} />
                상품등록
              </InquiryLink>
            </>
          ) : (
            <>
              <InquiryLink
                href="https://docs.google.com/forms/d/e/1FAIpQLSfS2-2IsVBBub-rmSk97nz1Fsw0eYLMsd5iOHtNdUNwH1HgKQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                ROOKie 파트너 입점신청 관련 공지
              </InquiryLink>
            </>
          )}
        </Inner>
      )}
      {teamModal && (
        <MypageModal isOpen={teamModal} closeTeamModal={closeTeamModal} />
      )}
    </Container>
  );
};
export default Mypage;
