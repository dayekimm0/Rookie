import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getScrollbarWidth, getTeamCodeEng } from "../util";
import authStore from "../stores/AuthStore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import TopSchedule from "./HeaderItem/TopSchedule";
import useHeaderStore from "../stores/headerHeightStore";
import logonStore from "../stores/LogonStore";
import { useToggleStore, useSearchStore } from "../stores/headersStore";
import SearchPc from "./Search/SearchPc";
import HeaderLogo from "./HeaderItem/HeaderLogo";
import HeaderProfile from "./HeaderItem/HeaderProfile";
import NavigationItems from "./HeaderItem/NavigationItems";
import HeaderSearchBtn from "./HeaderItem/HeaderSearchBtn";
import MobileMenuBtn from "./HeaderItem/MobileMenuBtn";
import MobileMenu from "./HeaderItem/MobileMenu";

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

const Header = memo(({ mode }) => {
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);
  const { user, userProfile, isLoading } = authStore();
  const { resetForm } = logonStore();
  const isTeamMode = useToggleStore((state) => state.isTeamMode);
  const { searchOpen, toggleSearch, closeSearch } = useSearchStore();
  const [isToggleUseropen, setIsToggleUserOpen] = useState(false);
  const [mobileStoreOpen, setMobileStoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lineVisible, setLineVisible] = useState(true);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  //현재 메뉴 위치 체크
  const activeIndex = useMemo(() => {
    if (
      (!isTeamMode && pathname === "/") ||
      (isTeamMode && pathname.startsWith("/teamhome"))
    ) {
      return 0;
    } else if (pathname.startsWith("/play")) {
      return 1;
    } else if (pathname.startsWith("/store")) {
      return 2;
    } else if (pathname.startsWith("/event")) {
      return 3;
    }
    return -1;
  }, [pathname, isTeamMode]);

  // 헤더 높이 체크
  useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeight(headerEl.offsetHeight);
    });
    resizeObserver.observe(headerEl);
    // 초기 측정
    setHeaderHeight(headerEl.offsetHeight);
    return () => {
      resizeObserver.disconnect();
    };
  }, [setHeaderHeight]);

  //메뉴 라인 그리기
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

  //헤더-팀 전환토글 클릭 시
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

  //mobile 메뉴 토글
  const handleClickMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  //mobile 스토어메뉴 토글
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
    setIsToggleUserOpen(false);
    setMobileMenuOpen(false);
    setMobileStoreOpen(false);
  }, [location.pathname]);

  return (
    <Container ref={headerRef}>
      <TopSchedule />
      <Nav>
        <HeaderLogo />
        <NavigationItems
          isTeamMode={isTeamMode}
          handleClickHome={handleClickHome}
          itemRefs={itemRefs}
          lineStyle={lineStyle}
          lineVisible={lineVisible}
        />
        <Profile>
          {/* 프로필 / 로그인 관련 */}
          <HeaderProfile
            user={user}
            userProfile={userProfile}
            isLoading={isLoading}
            isToggleUseropen={isToggleUseropen}
            toggleUserBox={toggleUserBox}
            handleLogout={handleLogout}
          />
          <HeaderSearchBtn
            searchOpen={searchOpen}
            toggleSearch={toggleSearch}
          />
          <MobileMenuBtn
            mobileMenuOpen={mobileMenuOpen}
            handleClickMobileMenu={handleClickMobileMenu}
          />
        </Profile>
      </Nav>
      <SearchPc mode={mode} />
      <MobileMenu
        handleClickMobileMenu={handleClickMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
        headerHeight={headerHeight}
        isFolded={isFolded}
        setMobileMenuOpen={setMobileMenuOpen}
        isTeamMode={isTeamMode}
        handleClickMobileHome={handleClickMobileHome}
        handleClickMobileStore={handleClickMobileStore}
        mobileStoreOpen={mobileStoreOpen}
        isLoading={isLoading}
        user={user}
        userProfile={userProfile}
        handleLogout={handleLogout}
      />
    </Container>
  );
});

export default Header;
