import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useCallback,
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

  const { searchOpen, toggleSearch, closeSearch } = useSearchStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

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

  //mobile 메뉴 토글
  const handleToggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // 페이지 이동 시 search, user dropdown 닫기
  useEffect(() => {
    closeSearch();
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <Container ref={headerRef}>
      <TopSchedule />
      <Nav>
        <HeaderLogo />
        <NavigationItems />
        <Profile>
          {/* 프로필 / 로그인 관련 */}
          <HeaderProfile />
          <HeaderSearchBtn
            searchOpen={searchOpen}
            toggleSearch={toggleSearch}
          />
          <MobileMenuBtn
            mobileMenuOpen={mobileMenuOpen}
            handleClickMobileMenu={handleToggleMobileMenu}
          />
        </Profile>
      </Nav>
      <SearchPc mode={mode} />

      <MobileMenu isOpen={mobileMenuOpen} onToggle={handleToggleMobileMenu} />
    </Container>
  );
});

export default Header;
