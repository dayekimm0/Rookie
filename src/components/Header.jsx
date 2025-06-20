import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getEmblem,
  getTeamJsonCode,
  getTeamColor,
  getScrollbarWidth,
  getTeamCodeEng,
} from "../util";
import authStore from "../stores/AuthStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import rookieemblem from "../images/logos/emblem_rookie.png";
import logo from "../images/logos/Rookie_logo.svg";
import kbologo2 from "../images/emblem/emblem_kbo2.svg";
import TopSchedule from "./TopSchedule";
import useHeaderStore from "../stores/headerHeightStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import logonStore from "../stores/LogonStore";
import arrowSmall from "../images/icons/RBarrow_logo.svg";
import HeaderToggle from "./HeaderItem/HeaderToggle";
import { useToggleStore, useSearchStore } from "../stores/headersStore";
import SearchPc from "./Search/SearchPc";
import SearchMobile from "./Search/SearchMobile";

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
    padding: 0 15px;
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
    gap: 12px;
  }
  @media screen and (max-width: 500px) {
    right: 15px;
    gap: 10px;
  }
`;

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

const SearchPcBtn = styled.div`
  width: 21px;
  font-size: 21px;
  cursor: pointer;
  .closemark {
    font-size: 25px;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const MobileMenuBtn = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;
    width: 18px;
    cursor: pointer;
    span {
      width: 20px;
      height: 2px;
      background: var(--gray1);
      border-radius: 10px;
      transition: all 0.4s;
    }
    &.active {
      span {
        &:nth-child(1) {
          transform: rotate(45deg);
          transform-origin: left center;
        }
        &:nth-child(2) {
          opacity: 0;
          transform: translateX(100%);
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
          transform-origin: left center;
        }
      }
    }
  }
`;

const MobileMenuWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
    &.active {
      display: block;
      .bg_black {
        display: block;
      }
      .menu_inner {
        transform: translateX(0%);
      }
    }
  }
  .bg_black {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: none;
  }
  .menu_inner {
    position: fixed;
    width: 430px;
    height: 100vh;
    top: 0;
    right: 0;
    transform: translateX(100%);
    transition: transform 0.4s;
    background: #fff;
    padding: 50px 50px 0;
    @media screen and (max-width: 500px) {
      width: 100%;
    }

    .inner_wrap {
      padding-top: ${({ $headerHeight, $folded }) =>
        $folded ? `55px` : `${$headerHeight - 1}px`};

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 40px;
      transition: padding-top 0.4s ease;

      @media screen and (max-width: 500px) {
        padding-top: ${({ $headerHeight, $folded }) =>
          $folded ? `45px` : `${$headerHeight - 1}px`};
      }
    }

    .mb_menus {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 30px;
      overflow-y: auto;
      padding-bottom: 50px;
      & > li {
        font-size: 1.6rem;
        font-weight: 700;
        a {
          display: flex;
          align-items: center;
          img {
            margin-left: 10px;
            width: 6px;
            display: inline-block;
            transform: rotate(90deg);
          }
        }
        &.active {
          a {
            img {
              transform: rotate(-90deg);
            }
          }
          .store_depth2 {
            display: flex;
          }
        }
        .store_depth2 {
          display: none;
          /* display: flex; */
          margin-top: 14px;
          flex-direction: column;
          gap: 12px;
          & > li {
            font-size: 1.4rem;
            font-weight: 400;
            color: var(--gray8);
          }
        }
      }
    }
  }
`;

const Header = ({ mode }) => {
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);
  const isTeamMode = useToggleStore((state) => state.isTeamMode);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const headerRef = useRef(null);

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

  const teamStores = [
    { name: "KBO", code: "kbo" },
    { name: "기아 타이거즈", code: "kia_tgs" },
    { name: "삼성 라이온즈", code: "ss_lns" },
    { name: "LG 트윈스", code: "lg_twins" },
    { name: "두산 베어스", code: "ds_bas" },
    { name: "KT 위즈", code: "kt_wiz" },
    { name: "SSG 랜더스", code: "ssg_lds" },
    { name: "롯데 자이언츠", code: "lt_gnt" },
    { name: "한화 이글스", code: "hw_egs" },
    { name: "NC 다이노스", code: "nc_dns" },
    { name: "키움 히어로즈", code: "kw_hrs" },
  ];

  useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeight(headerEl.offsetHeight);
    });

    resizeObserver.observe(headerEl);

    // 초기 측정 (필요할 수 있음)
    setHeaderHeight(headerEl.offsetHeight);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setHeaderHeight]);

  const { user, userProfile, isLoading } = authStore();

  const goToMain = () => navigate("/");

  //메뉴 Line 스타일
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const [lineVisible, setLineVisible] = useState(true);
  const itemRefs = useRef([]);
  let activeIndex = -1;
  if (
    (!isTeamMode && pathname === "/") || // ROOKie일 때 메인 홈
    (isTeamMode && pathname.startsWith("/teamhome")) // TEAM일 때 구단 홈
  ) {
    activeIndex = 0;
  } else if (pathname.startsWith("/play")) {
    activeIndex = 1;
  } else if (pathname.startsWith("/store")) {
    activeIndex = 2;
  } else if (pathname.startsWith("/event")) {
    activeIndex = 3;
  }

  useLayoutEffect(() => {
    const updateLineStyle = () => {
      const activeEl = itemRefs.current[activeIndex];
      if (activeEl) {
        setLineStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
        setLineVisible(true);
      } else {
        setLineVisible(false);
      }
    };

    updateLineStyle();
    window.addEventListener("resize", updateLineStyle);
    return () => window.removeEventListener("resize", updateLineStyle);
  }, [location.pathname, activeIndex]);

  // 토글 버튼을 누르면 유저 정보 오픈
  const [isopen, setIsOpen] = useState(false);
  const toggleUserBox = () => {
    setIsOpen((prev) => !prev);
  };

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
      resetForm();
      resetForm();
    } catch (e) {
      alert("로그아웃 실패", e);
    }
  };

  //searchPc 버튼 토글
  const { searchOpen, toggleSearch, closeSearch } = useSearchStore();

  //mobile 메뉴 토글
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleClickMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  //mobile 스토어메뉴 토글
  const [mobileStoreOpen, setMobileStoreOpen] = useState(false);
  const handleClickMobileStore = () => {
    setMobileStoreOpen((prev) => !prev);
  };

  //mobile 스토어 스크롤 막기
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = getScrollbarWidth();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [mobileMenuOpen]);

  // 페이지 이동 시 search, user dropdown 닫기
  useEffect(() => {
    closeSearch();
    setIsOpen(false);
    setMobileMenuOpen(false);
    setMobileStoreOpen(false);
  }, [location.pathname]);
  const teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //헤더 팀 토글 클릭 시

  const handleClickHome = (e) => {
    if (isTeamMode && user && userProfile) {
      e.preventDefault();
      const teamCode = getTeamCodeEng(userProfile.favoriteTeam);
      if (teamCode) navigate(`/teamhome/${teamCode}`);
    }
  };
  const handleClickMobileHome = (e) => {
    setMobileMenuOpen(false);
    if (isTeamMode && user && userProfile) {
      e.preventDefault();
      const teamCode = getTeamCodeEng(userProfile.favoriteTeam);
      if (teamCode) navigate(`/teamhome/${teamCode}`);
    }
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
            <Link to="/" onClick={handleClickHome}>
              {isTeamMode ? "TEAM" : "HOME"}
            </Link>
          </Item>
          <Item ref={(el) => (itemRefs.current[1] = el)}>
            <Link to="/play">PLAY</Link>
          </Item>

          <Item ref={(el) => (itemRefs.current[2] = el)}>
            <StoreWrapper>
              <Link to="/store/kbo">STORE</Link>
              <StoreContainer className="store-dropdown">
                <Stores>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      alert("ROOKie 준비 중입니다.");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <RookieEmblem src={rookieemblem} alt="rookieemblem" />
                  </div>
                  {teams.map((id) => {
                    const teamCode = getTeamJsonCode(id);
                    return (
                      <Link key={id} to={`/store/${teamCode}`}>
                        <TeamEmblem emblemId={id} />
                      </Link>
                    );
                  })}
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
            transition={
              lineVisible ? { duration: 0.3, ease: "easeOut" } : { duration: 0 }
            }
            style={{
              opacity: lineVisible ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />
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
                    {isopen ? "▲" : "▼"}
                  </InfoBtn>
                </UserName>
              </UserWrap>
              <User $isopen={isopen}>
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
          <SearchPcBtn>
            <FontAwesomeIcon
              icon={searchOpen ? faXmark : faMagnifyingGlass}
              onClick={toggleSearch}
              className={searchOpen ? "closemark" : ""}
            />
          </SearchPcBtn>
          <MobileMenuBtn
            onClick={handleClickMobileMenu}
            className={mobileMenuOpen ? "active" : ""}
          >
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuBtn>
        </Profile>
      </Nav>
      <SearchPc mode={mode} />

      <MobileMenuWrap
        className={mobileMenuOpen ? "active" : ""}
        $headerHeight={headerHeight}
        $folded={isFolded}
        data-lenis-prevent
      >
        <div className="bg_black"></div>
        <div className="menu_inner">
          <div className="inner_wrap">
            <SearchMobile
              mobileSearchOpen={mobileSearchOpen}
              setMobileSearchOpen={setMobileSearchOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
            <ul className="mb_menus">
              <li>
                <Link to={"/"} onClick={handleClickMobileHome}>
                  {isTeamMode ? "TEAM" : "HOME"}
                </Link>
              </li>
              <li>
                <Link to={"/play"} onClick={() => setMobileMenuOpen(false)}>
                  PLAY
                </Link>
              </li>
              <li
                onClick={handleClickMobileStore}
                className={mobileStoreOpen ? "active" : null}
              >
                <Link to={"#"} disabled>
                  STORE
                  <img src={arrowSmall} alt="arrow" />
                </Link>
                <ul className="store_depth2">
                  <li>
                    <Link
                      to={`/store/${getTeamJsonCode(0)}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ROOKie
                    </Link>
                  </li>
                  {teamStores.map(({ name, code }) => (
                    <li key={code}>
                      <Link
                        to={`/store/${code}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to={"/event"} onClick={() => setMobileMenuOpen(false)}>
                  EVENT
                </Link>
              </li>
              {isLoading ? (
                <></>
              ) : user && userProfile ? (
                <>
                  <li>
                    <Link
                      to={"/mypage"}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ACCOUNT
                    </Link>
                  </li>
                  <li>
                    <Link to={"/cart"} onClick={() => setMobileMenuOpen(false)}>
                      CART
                    </Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout}>LOGOUT</Link>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </MobileMenuWrap>
    </Container>
  );
};

export default Header;
