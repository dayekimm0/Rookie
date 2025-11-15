import { memo, useState, useLayoutEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getEmblem, getTeamJsonCode, getTeamCodeEng } from "../../util";
import rookieemblem from "../../images/logos/emblem_rookie.svg";
import authStore from "../../stores/AuthStore";
import { useToggleStore } from "../../stores/headersStore";

const Items = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  height: 100%;
  gap: 50px;
  @media screen and (max-width: 1250px) {
    gap: 35px;
  }
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

const Line = styled.span`
  position: absolute;
  height: 6px;
  bottom: 0;
  background: var(--dark);
  pointer-events: none;
  transition: all 0.3s ease-out;
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

const teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TeamEmblem = memo(({ emblemId }) => {
  const emblem = getEmblem(emblemId);
  return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
});

const NavigationItems = memo(() => {
  const { user, userProfile } = authStore();
  const isTeamMode = useToggleStore((state) => state.isTeamMode);
  const [lineVisible, setLineVisible] = useState(true);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const itemRefs = useRef([]);
  const pathname = location.pathname;

  const activeIndex = (() => {
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
  })();

  const handleClickHome = useCallback(
    (e) => {
      if (isTeamMode && user && userProfile) {
        e.preventDefault();
        const teamCode = getTeamCodeEng(userProfile.favoriteTeam);
        if (teamCode) navigate(`/teamhome/${teamCode}`);
      }
    },
    [isTeamMode, user, userProfile, navigate]
  );

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
  }, [pathname, activeIndex, itemRefs]);

  return (
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
          <Link onClick={(e) => e.preventDefault()}>STORE</Link>
          <StoreContainer className="store-dropdown">
            <Stores>
              <Link to="/store/rookie">
                <RookieEmblem src={rookieemblem} alt="rookieemblem" />
              </Link>
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
        style={{
          left: `${lineStyle.left}px`,
          width: `${lineStyle.width}px`,
          opacity: lineVisible ? 1 : 0,
        }}
      />
    </Items>
  );
});

export default NavigationItems;
