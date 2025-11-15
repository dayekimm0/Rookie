import { memo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getEmblem, getTeamColor } from "../../util";
import kbologo2 from "../../images/emblem/emblem_kbo2.svg";
import HeaderToggle from "./HeaderToggle";
import authStore from "../../stores/AuthStore";
import logonStore from "../../stores/LogonStore";
import { useToggleStore } from "../../stores/headersStore";

const UserWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media screen and (max-width: 500px) {
    gap: 5px;
  }
`;

const Emblem = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: visible;
  }
  @media screen and (max-width: 1440px) {
    width: 45px;
    height: 45px;
  }
  @media screen and (max-width: 1024px) {
    width: 36px;
    height: 36px;
  }
  @media screen and (max-width: 500px) {
    width: 25px;
    height: 25px;
  }
`;

const Emblem2 = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
    width: 33px;
    height: 33px;
  }
  @media screen and (max-width: 500px) {
    width: 23px;
    height: 23px;
  }
`;

const UserName = styled.p`
  font-weight: bold;
  font-family: var(--Pretendard);
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const User = styled.div`
  width: 260px;
  height: 300px;
  border-radius: 8px;
  border: 1px solid var(--gray6);
  background: var(--light);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  right: -3%;
  top: 68px;
  position: absolute;
  display: ${(props) => (props.$isopen ? "block" : "none")};
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const InfoBtn = styled.i`
  margin-left: 5px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    margin-left: 5px;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 30px 35px;
`;

const UserDesc = styled.div`
  width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const UserId = styled.p`
  font-size: 2rem;
  font-weight: 600;
  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
  }
`;

const SelectTeam = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
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

const Gnb = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
  padding: 26px 35px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  @media screen and (max-width: 1024px) {
    a {
      font-size: 1.4rem;
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

const TeamEmblem = memo(({ emblemId }) => {
  const emblem = getEmblem(emblemId);
  return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
});

const HeaderProfile = memo(() => {
  const { user, userProfile, isLoading } = authStore();
  const { resetForm } = logonStore();
  const [isToggleUseropen, setIsToggleUserOpen] = useState(false);
  const navigate = useNavigate();

  // 토글 버튼을 누르면 유저 정보 오픈
  const toggleUserBox = () => {
    setIsToggleUserOpen((prev) => !prev);
  };

  //로그아웃 버튼 클릭
  const handleLogout = async () => {
    try {
      await signOut(auth);
      authStore.getState().clearUser();
      alert("로그아웃 되었습니다.");
      resetForm();
      useToggleStore.getState().setTeamMode(false);
      localStorage.removeItem("toggle-mode");
      navigate("/");
    } catch (e) {
      alert("로그아웃 실패", e);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Emblem2>
            <img src={kbologo2} alt="kbologo2" />
          </Emblem2>
          <UserName>
            <Link>로딩중..</Link>
          </UserName>
        </>
      ) : user && userProfile ? (
        <>
          <HeaderToggle />
          <UserWrap>
            <Emblem>
              <TeamEmblem
                emblemId={teamToEmblemId[userProfile.favoriteTeam] || "2"}
              />
            </Emblem>
            <UserName>
              <Link to="/mypage">{userProfile.nickname}</Link>
              <InfoBtn className="info-btn" onClick={toggleUserBox}>
                {isToggleUseropen ? "▲" : "▼"}
              </InfoBtn>
            </UserName>
          </UserWrap>
          <User $isopen={isToggleUseropen}>
            <UserInfo>
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
              <UserDesc>
                <UserId>{userProfile.nickname}</UserId>
                <SelectTeam>{userProfile.favoriteTeam}</SelectTeam>
              </UserDesc>
            </UserInfo>
            <hr />
            <Gnb>
              <Link to="/mypage">마이페이지</Link>
              <Link to="/cart">장바구니</Link>
              <Link onClick={handleLogout}>로그아웃</Link>
            </Gnb>
          </User>
        </>
      ) : (
        <>
          <Emblem2>
            <img src={kbologo2} alt="kbologo2" />
          </Emblem2>
          <UserName>
            <Link to="/login">로그인</Link>
          </UserName>
        </>
      )}
    </>
  );
});

export default HeaderProfile;
