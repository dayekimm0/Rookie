import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useMatch, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getEmblem } from "../util";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import logo from "../images/logos/Rookie_logo.svg";
import kbologo2 from "../images/emblem/emblem_kbo2.svg";
import logonStore from "../stores/LogonStore";
import TopSchedule from "./TopSchedule";
import useHeaderStore from "../stores/headerStore";

const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1500;
`;

const Nav = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  padding: 0 5%;
  background: var(--main);
  z-index: 101;
`;

const Logo = styled.div`
  width: 130px;
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
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
  position: absolute;
  height: 6px;
  bottom: -27px;
  background: var(--dark);
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
  top: 54px;
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
`;

const SelectTeam = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const UserTeam = styled.div`
  width: 60px;
  height: 60px;
  background: #0066b3;
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

const Header = ({ isActive }) => {
  const navigate = useNavigate();
  const goToMain = () => navigate("/");
  const isHeaderFolded = useHeaderStore((state) => state.isHeaderFolded);

  //메뉴 Line 스타일
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef([]);
  const menus = [
    { label: "HOME", path: "/" },
    { label: "PLAY", path: "/play", disabled: true },
    { label: "STORE", path: "/store" },
    { label: "EVENT", path: "/event" },
  ];
  const location = useLocation();

  const activeIndex = menus.findIndex(({ path, disabled }) => {
    if (disabled) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  });

  useLayoutEffect(() => {
    const activeEl = itemRefs.current[activeIndex];
    if (activeEl) {
      setLineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [location.pathname]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 토글 버튼을 누르면 유저 정보 오픈
  const [isopen, setIsOpen] = useState(false);
  const toggleUserBox = () => setIsOpen((prev) => !prev);

  // store 카테고리 오버하면 나오는 앰블럼
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);

    logonStore.getState().resetForm();
    alert("로그아웃 되었습니다");
  };

  return (
    <Container className={isActive ? "active" : ""}>
      <TopSchedule />
      <Nav>
        <Logo onClick={goToMain}>
          <LogoImg src={logo} alt="rookielogo" />
        </Logo>
        <Items>
          {menus.map((menu, i) => (
            <Item
              key={menu.label}
              ref={(el) => (itemRefs.current[i] = el)}
              onMouseEnter={
                menu.label === "STORE" ? () => setIsStoreOpen(true) : undefined
              }
              onMouseLeave={
                menu.label === "STORE" ? () => setIsStoreOpen(false) : undefined
              }
            >
              <Link
                to={menu.path}
                onClick={(e) => {
                  if (menu.disabled) {
                    e.preventDefault();
                    alert("준비 중입니다.");
                  }
                }}
              >
                {menu.label}
              </Link>
            </Item>
          ))}
          <Line
            as={motion.div}
            initial={false}
            animate={lineStyle}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </Items>
        <Profile>
          {isLoggedIn ? (
            <>
              <Emblem>
                <TeamEmblem emblemId="2" />
              </Emblem>
              <UserName>
                <Link to="/mypage">갓효바</Link>
                <InfoBtn className="info-btn" onClick={toggleUserBox}>
                  {isopen ? "▼" : "▲"}
                </InfoBtn>
              </UserName>
              <User $isopen={isopen}>
                <UserInfo>
                  <UserTeam>
                    <TeamEmblem emblemId="2" />
                  </UserTeam>
                  <UserDesc>
                    <UserId>갓효바</UserId>
                    <SelectTeam>
                      구단을 선택해주세요{" "}
                      <i className="fas fa-chevron-right"></i>
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
