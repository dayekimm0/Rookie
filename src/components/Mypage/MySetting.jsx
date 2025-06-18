import { useState, useEffect } from "react";
import styled from "styled-components";
import { getTeamColor, getEmblem, getScrollbarWidth } from "../../util";
import authStore from "../../stores/AuthStore";
import MypageModal from "./MyTeamModal";
import SettingModal from "./SettingModal";
import AddressModal from "./AddressModal";
import partnerLogo from "../../images/logos/Partner_Logo.svg";

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const UpBox = styled.div`
  width: 100%;
  height: 120px;
  border: 1px solid var(--grayC);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  @media screen and (max-width: 1024px) {
    height: 96px;
    padding: 24px;
  }
  @media screen and (max-width: 500px) {
    margin-bottom: 0px;
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
    br {
      display: none;
    }
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    span {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 600px) {
    span {
      br {
        display: block;
      }
    }
  }
  @media screen and (max-width: 500px) {
    span {
      br {
        display: none;
      }
    }
  }
`;

const UpBoxSub = styled.span`
  font-size: 1.4rem;
  color: var(--gray6);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--dark);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
  .myinfoLine {
    width: 100%;
    border: none;
    height: 2px;
    background-color: var(--grayE);
    margin: 34px 0;
  }
  @media screen and (max-width: 500px) {
    .myinfoLine {
      margin: 24px 0;
    }
  }
`;

const MyInfoTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-left: 8px;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
`;

const MyInfoLine = styled.span`
  width: 100%;
  height: 1px;
  background: var(--dark);
  margin-bottom: 34px;
  @media screen and (max-width: 500px) {
    margin-bottom: 24px;
  }
`;

const InfoElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const InfoDetail = styled.h4`
  font-size: 1.6rem;
  line-height: 2;
  word-break: keep-all;
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
    font-size: 1.2rem;
    color: var(--grayC);
    cursor: pointer;
    transition: color 0.4s;
    margin-top: -14px;
    &:hover {
      color: var(--gray8);
    }
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

const Setting = () => {
  const { userProfile } = authStore();

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  const [teamModal, setTeamModal] = useState(false);

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

  const [modalState, setModalState] = useState({
    email: false,
    password: false,
    nickname: false,
  });

  const openModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
  };

  const [addressModal, setAddressModal] = useState(false);

  const openAddressModal = () => {
    setAddressModal(true);
  };

  const closeAddressModal = () => {
    setAddressModal(false);
    window.location.reload();
  };

  return (
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
            {userProfile.email === "gosim@naver.com" ||
            userProfile.email === "mangom@daum.net" ? (
              <PartnerLogo src={partnerLogo} alt="" />
            ) : null}
            <br />
            <span>
              계정 생성일 <br />
              {userProfile.createdAt}
            </span>
          </UpBoxTitle>
        </UpBoxLeft>
        <UpBoxSub onClick={openTeamModal}>구단변경 ›</UpBoxSub>
      </UpBox>

      <MyInfo>
        <MyInfoTitle>계정 상세정보</MyInfoTitle>
        <MyInfoLine />
        <InfoElement>
          <InfoDetail>
            <b> 이메일</b>
            <br />
            {userProfile.email}
          </InfoDetail>
        </InfoElement>
        <hr className="myinfoLine" />
        <InfoElement>
          <InfoDetail>
            <b> 비밀번호</b>
            <br />
            *********
          </InfoDetail>
          <InfoButton onClick={() => openModal("password")}>변경</InfoButton>
        </InfoElement>
        <hr className="myinfoLine" />
        <InfoElement>
          <InfoDetail>
            <b>닉네임</b>
            <br />
            {userProfile.nickname}
          </InfoDetail>
          <InfoButton onClick={() => openModal("nickname")}>변경</InfoButton>
        </InfoElement>
        <hr className="myinfoLine" />
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
          <InfoButton onClick={openAddressModal}>변경</InfoButton>
        </InfoElement>
        <hr className="myinfoLine" />
        <Delete>
          <h6
            onClick={() => {
              alert("준비중인 서비스 입니다.");
            }}
          >
            계정 삭제하기
          </h6>
        </Delete>
      </MyInfo>

      {teamModal && (
        <MypageModal isOpen={teamModal} closeTeamModal={closeTeamModal} />
      )}

      <SettingModal
        isOpen={modalState.email}
        closeModal={() => closeModal("email")}
        contentType="email"
      />
      <SettingModal
        isOpen={modalState.password}
        closeModal={() => closeModal("password")}
        contentType="password"
      />
      <SettingModal
        isOpen={modalState.nickname}
        closeModal={() => closeModal("nickname")}
        contentType="nickname"
      />
      <AddressModal
        isOpen={addressModal}
        closeAddressModal={closeAddressModal}
      />
    </Inner>
  );
};

export default Setting;
