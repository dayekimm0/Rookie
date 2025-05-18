import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getEmblem } from "../util";
import authStore from "../stores/AuthStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import logo from "../images/logos/Rookie_logo.svg";
import kbologo2 from "../images/emblem/emblem_kbo2.svg";
import TopSchedule from "./TopSchedule";
import useHeaderStore from "../stores/headerStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.header`
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
  @media screen and (max-width: 1024px) {
    height: 56px;
    padding: 0 3%;
  }
  @media screen and (max-width: 500px) {
    height: 46px;
    padding: 0 15%;
  }
`;

const Logo = styled.div`
  width: 130px;
  top: 50%;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  @media screen and (max-width: 1024px) {
    width: 100px;
  }
  @media screen and (max-width: 500px) {
    width: 80px;
  }
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
  height: 100%;
  gap: 50px;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Item = styled.div`
  height: 100%;
  a {
    display: block;
    height: 100%;
    font-weight: 600;
    font-family: var(--Figtree);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Line = styled(motion.span)`
  position: absolute;
  height: 6px;
  bottom: 0;
  background: var(--dark);
  pointer-events: none;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5%;
  gap: 16px;
  top: 50%;
  transform: translateY(-50%);
  @media screen and (max-width: 1024px) {
    right: 3%;
  }
  @media screen and (max-width: 500px) {
    right: 15px;
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

const StoreWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover .store-dropdown {
    display: flex;
  }
`;

const StoreContainer = styled.div`
  width: 100vw;
  height: 160px;
  z-index: 105;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  &.store-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  @media screen and (max-width: 1440px) {
    height: 130px;
  }
`;

const Stores = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid #fff; */
    width: 6.2%;
  }

  img {
    max-width: 100%;
  }

  @media screen and (max-width: 1650px) {
    gap: 15px;
    a {
      width: 6.8%;
    }
  }
  @media screen and (max-width: 1440px) {
    gap: 8px;
    a {
      width: 7.2%;
    }
  }
`;

const RookieEmblem = styled.img`
  max-width: 100%;
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

const SearchPcBtn = styled.div`
  font-size: 21px;
  cursor: pointer;
  .closemark {
    font-size: 25px;
  }
`;

const SearchPcWrap = styled.div`
  position: absolute;
  width: 100%;
  padding: 40px;
  background: ${({ mode }) => (mode === "light" ? "#fff" : "#222")};
  border-bottom: 1px solid;
  border-color: ${({ mode }) => (mode === "light" ? "#ddd" : "#444")};

  .searchPc {
    margin: 0 auto;
    padding: 15px;
    width: 700px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 1px solid;
    border-color: ${({ mode }) => (mode === "light" ? "#ddd" : "#444")};

    input {
      flex: 1;
      background: none;
      border: none;
      color: ${({ mode }) => (mode === "light" ? "#111" : "#fff")};
      font-size: 1.6rem;
      font-family: "Figtree", "Pretendard", sans-serif;
      &::placeholder {
        color: ${({ mode }) => (mode === "light" ? "#aaa" : "#aaa")};
        transition: opacity 0.4s;
        opacity: 1;
      }
      &:focus {
        outline: none;
        &::placeholder {
          opacity: 0;
        }
      }
    }

    button {
      border: none;
      padding: 0;
      background: none;
      color: ${({ mode }) => (mode === "light" ? "#111" : "#fff")};
      font-size: 20px;
      cursor: pointer;
    }
  }
`;

const Header = ({ mode }) => {
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [setHeaderHeight]);

  const { user, userProfile, isLoading } = authStore();

  console.log(
    "🔵 Header 렌더링, isLoading:",
    isLoading,
    "user:",
    user,
    "userProfile:",
    userProfile
  );

  const goToMain = () => navigate("/");

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

  // 토글 버튼을 누르면 유저 정보 오픈
  const [isopen, setIsOpen] = useState(false);
  const toggleUserBox = () => {
    setIsOpen((prev) => !prev);
  };

  // const [isStoreOpen, setIsStoreOpen] = useState(false);

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      authStore.getState().clearUser();
      console.log("🟢 로그아웃 성공");
    } catch (error) {
      console.error("🔴 로그아웃 실패:", error);
    }
  };

  //search 버튼 토글
  const [searchOpen, setSearchOpen] = useState(false);
  const handleClickSearchPc = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <Container ref={headerRef}>
      <TopSchedule />
      <Nav>
        <Logo onClick={goToMain}>
          <LogoImg src={logo} alt="rookielogo" />
        </Logo>
        <Items>
          <Item ref={(el) => (itemRefs.current[0] = el)}>
            <Link to="/">HOME</Link>
          </Item>

          <Item ref={(el) => (itemRefs.current[1] = el)}>
            <Link
              to="/play"
              onClick={(e) => {
                e.preventDefault();
                alert("준비 중입니다.");
              }}
            >
              PLAY
            </Link>
          </Item>

          <Item ref={(el) => (itemRefs.current[2] = el)}>
            <StoreWrapper>
              <Link to="/store">STORE</Link>
              <StoreContainer className="store-dropdown">
                <Stores>
                  <Link to={"/store"}>
                    <RookieEmblem
                      src="./src/images/logos/emblem_rookie.png"
                      alt="rookieemblem"
                    />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="0" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="1" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="2" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="3" />
                  </Link>
                  <Link to={"/store"}>
                    {" "}
                    <TeamEmblem emblemId="4" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="5" />
                  </Link>
                  <Link to={"/store"}>
                    {" "}
                    <TeamEmblem emblemId="6" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="7" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="8" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="9" />
                  </Link>
                  <Link to={"/store"}>
                    <TeamEmblem emblemId="10" />
                  </Link>
                </Stores>
              </StoreContainer>
            </StoreWrapper>
          </Item>

          <Item ref={(el) => (itemRefs.current[3] = el)}>
            <Link to="/event">EVENT</Link>
          </Item>
          <Line
            as={motion.div}
            initial={false}
            animate={lineStyle}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </Items>
        {/* 모바일 메뉴 아이콘 자리리 */}
        <Profile>
          <SearchPcBtn>
            {searchOpen ? (
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleClickSearchPc}
                className="closemark"
              />
            ) : (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleClickSearchPc}
              />
            )}
          </SearchPcBtn>
          {isLoading ? (
            <>
              <Emblem2>
                <img src={kbologo2} alt="kbologo2" />
              </Emblem2>
              <UserName>
                <Link>Loading..</Link>
              </UserName>
            </>
          ) : user && userProfile ? (
            <>
              <Emblem>
                <TeamEmblem emblemId="2" />
              </Emblem>
              <UserName>
                <Link to="/mypage">{userProfile.nickname}</Link>
                <InfoBtn className="info-btn" onClick={toggleUserBox}>
                  {isopen ? "▲" : "▼"}
                </InfoBtn>
              </UserName>
              <User $isopen={isopen}>
                <UserInfo>
                  <UserTeam>
                    <TeamEmblem emblemId="2" />
                  </UserTeam>
                  <UserDesc>
                    <UserId>{userProfile.nickname}</UserId>
                    <SelectTeam>
                      {userProfile.favoriteTeam}{" "}
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
      {searchOpen && (
        <SearchPcWrap mode={mode}>
          <form
            id="searchPc"
            className="searchPc"
            name="searchPc"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="찾으시는 상품을 입력해주세요."
              // onKeyUp={onCheckEnter}
            />
            {/* {showNoResult && (
                      <div className="noSearchbox">
                        검색하신 상품이 존재하지 않습니다.
                      </div>
                    )} */}
            <button>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleClickSearchPc}
              />
            </button>
          </form>
        </SearchPcWrap>
      )}
      {/* 모바일 오른쪽메뉴 모달 영역 */}
      {/* {isStoreOpen && (
        <StoreContainer
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
            <TeamEmblem emblemId="10" />
          </Stores>
        </StoreContainer>
      )} */}
    </Container>
  );
};

export default Header;
