import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import arrowSmall from "../../images/icons/RBarrow_logo.svg";
import SearchMobile from "../Search/SearchMobile";

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

const MobileMenu = memo(
  ({
    handleClickMobileMenu,
    mobileMenuOpen,
    headerHeight,
    isFolded,
    setMobileMenuOpen,
    isTeamMode,
    handleClickMobileHome,
    handleClickMobileStore,
    mobileStoreOpen,
    isLoading,
    user,
    userProfile,
    handleLogout,
  }) => {
    return (
      <MobileMenuWrap
        className={mobileMenuOpen ? "active" : ""}
        $headerHeight={headerHeight}
        $folded={isFolded}
        data-lenis-prevent
      >
        <div className="bg_black" onClick={handleClickMobileMenu}></div>
        <div className="menu_inner">
          <div className="inner_wrap">
            <SearchMobile setMobileMenuOpen={setMobileMenuOpen} />
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
                      to={`/store/rookie`}
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
    );
  }
);

export default MobileMenu;
