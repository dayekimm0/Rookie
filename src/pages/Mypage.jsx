import styled from "styled-components";
import authStore from "../stores/AuthStore";
import { getEmblem, getTeamColor } from "../util";
// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import partnerLogo from "../images/logos/Partner_logo.svg";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--light);
`;
const Inner = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 100px;
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
`;
const UpBoxSub = styled.span`
  font-size: 1.2rem;
  color: var(--gray6);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--dark);
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
`;
const MyShoppingInner = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 60px;
`;
const MyShoppingDetail = styled.h6`
  font-size: 1.2rem;
  line-height: 2.5;
  b {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
  }
`;
const MyShoppingLine = styled.span`
  width: 1px;
  height: 54px;
  background: var(--dark);
`;
const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const MyInfoTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
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
`;
const InfoDetail = styled.h4`
  font-size: 1.6rem;
  line-height: 2;
  b {
    font-size: 1.8rem;
    font-weight: 700;
  }
`;
const InfoDetailDetail = styled.h5`
  font-size: 1.4rem;
  color: var(--gray8);
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
  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };
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
            <UpBoxSub>구단변경 ›</UpBoxSub>
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
                <br />
                {userProfile.address}
                <br />
                <InfoDetailDetail>
                  {userProfile.detailedAddress}
                </InfoDetailDetail>
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
    </Container>
  );
};
export default Mypage;
