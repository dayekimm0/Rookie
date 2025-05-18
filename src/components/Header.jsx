import { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getEmblem, getTeamColor } from "../util";
import authStore from "../stores/AuthStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import headermockup from "../images/banners/banner-headermockup.png";
import logo from "../images/logos/Rookie_logo.svg";
import kbologo2 from "../images/emblem/emblem_kbo2.svg";
import logonStore from "../stores/LogonStore";

const Container = styled.div`
  width: 100%;
  top: 0;
  height: 180px;
  position: fixed;
  z-index: 1000;
`;

const HeaderGameList = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 110px;
  background: var(--bg);
  transform: ${({ $hide }) => ($hide ? "translateY(-110px)" : "translateY(0)")};
  transition: transform 0.3s ease-out;
  z-index: 100;
`;

const HeaderMockup = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Nav = styled.div`
  position: fixed;
  top: ${({ $hide }) => ($hide ? "0" : "110px")};
  left: 0;
  width: 100%;
  height: 70px;
  padding: 0 5%;
  background: var(--main);
  z-index: 101;
  transition: top 0.3s ease;
`;

const Logo = styled.div`
  width: 130px;
  height: 40px;
  top: 50%;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Items = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  gap: 50px;
`;

const Item = styled.div`
  font-weight: 600;
  font-family: var(--Figtree);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Line = styled(motion.span)`
  width: 48px;
  height: 6px;
  left: 0;
  right: 0;
  bottom: -27px;
  margin: 0 auto;
  background: var(--dark);
  position: absolute;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 96px;
  gap: 16px;
  top: 50%;
  transform: translateY(-50%);
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
`;

const StoreContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 160px;
  top: ${({ $hide }) => ($hide ? "70px" : "180px")};
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
`;

const Stores = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  img {
    cursor: pointer;
    width: 130px;
    height: 80%;
    &:nth-of-type(1) {
      width: 120px;
      height: 86px;
    }
    &:nth-child(2) {
      width: 100px;
      height: 100px;
    }
  }
`;

const RookieEmblem = styled.img`
  width: 100px;
  height: 70px;
`;

const UserName = styled.p`
  font-weight: bold;
  font-family: var(--Pretendard);
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
`;

const InfoBtn = styled.i`
  margin-left: 16px;
  cursor: pointer;
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
    height: 100%;
    object-fit: cover;
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
`;

  const teamToEmblemId = {
  "두산베어스": "4",
  "엘지트윈스": "3",
  "키움히어로즈": "10",
  "한화이글스": "8",
  "삼성라이온즈": "2",
  "케이티위즈": "5",
  "엔씨다이노스": "9",
  "쓱랜더스": "6",
  "롯데자이언츠": "7",
  "기아타이거즈": "1",
};

const Header = ({ isActive }) => {
  const navigate = useNavigate();

  const { user, userProfile, isLoading } = authStore();

  const goToMain = () => {
    navigate("/");
  };
  const homeMatch = useMatch("/");
  const playMatch = useMatch("/play");
  const storeMatch = useMatch("/store");
  const eventMatch = useMatch("/event");

  // 토글 버튼을 누르면 유저 정보 오픈
  const [isopen, setIsOpen] = useState(false);
  const toggleUserBox = () => {
    setIsOpen((prev) => !prev);
  };

  // store 카테고리 오버하면 나오는 앰블럼
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

const { resetForm } = logonStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      authStore.getState().clearUser();
      alert("로그아웃 되었습니다.");
      resetForm()
    } catch (e) {
      alert("로그아웃 실패", e);
    }
  };

  return (
    <Container className={isActive ? "active" : ""}>
      <HeaderGameList $hide={isActive}>
        <HeaderMockup src={headermockup} alt="헤더목업" />
      </HeaderGameList>
      <Nav $hide={isActive}>
        <Logo onClick={goToMain}>
          <LogoImg src={logo} alt="rookielogo" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">HOME</Link>
            {homeMatch && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link to="/">PLAY</Link>
            {playMatch && <Line layoutId="line" />}
          </Item>
          <Item
            onMouseEnter={() => setIsStoreOpen(true)}
            onMouseLeave={() => setIsStoreOpen(false)}
          >
            <Link to="/store">STORE</Link>

            {storeMatch && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link to="/event">EVENT</Link>
            {eventMatch && <Line layoutId="line" />}
          </Item>
        </Items>
        <Profile>
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
              <Emblem>
                <TeamEmblem emblemId={teamToEmblemId[userProfile.favoriteTeam] || "2"} />
              </Emblem>
              <UserName>
                <Link to="/mypage">{userProfile.nickname}</Link>
                <InfoBtn className="info-btn" onClick={toggleUserBox}>
                  {isopen ? "▲" : "▼"}
                </InfoBtn>
              </UserName>
              <User $isopen={isopen}>
                <UserInfo>
                  <UserTeam style={{
                      backgroundColor: getTeamColor(teamToEmblemId[userProfile.favoriteTeam] || "#fff"),
                    }}>
                    <TeamEmblem emblemId={teamToEmblemId[userProfile.favoriteTeam] || "2"} />
                  </UserTeam>
                  <UserDesc>
                    <UserId>{userProfile.nickname}</UserId>
                    <SelectTeam>
                      {userProfile.favoriteTeam}
                    </SelectTeam>
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
        </Profile>
      </Nav>
      {isStoreOpen && (
        <StoreContainer
          $hide={isActive}
          onMouseEnter={() => setIsStoreOpen(true)}
          onMouseLeave={() => setIsStoreOpen(false)}
        >
          <Stores>
            <RookieEmblem
              src="./src/images/logos/emblem_rookie.png"
              alt="rookieemblem"
            />
            <TeamEmblem emblemId="0" />
            <TeamEmblem emblemId="1" />
            <TeamEmblem emblemId="2" />
            <TeamEmblem emblemId="3" />
            <TeamEmblem emblemId="4" />
            <TeamEmblem emblemId="5" />
            <TeamEmblem emblemId="6" />
            <TeamEmblem emblemId="7" />
            <TeamEmblem emblemId="8" />
            <TeamEmblem emblemId="9" />
          </Stores>
        </StoreContainer>
      )}
    </Container>
  );
};

export default Header;
