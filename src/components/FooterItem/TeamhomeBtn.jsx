import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTeamJsonCode, getTeamName } from "../../util";
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
  font-size: 0;
  position: relative;
`;

const Menus = styled.div`
  width: 55px;
  padding: 10px 5px;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -100%);
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
  text-align: center;
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  overflow: hidden;
  transition: visibility 0.3s ease, opacity 0.3s ease, height 0.3s ease;
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      &:nth-of-type(n + 2) {
        border-top: 1px solid rgba(255, 255, 255, 0.3);
      }

      padding-top: 10px;
      a {
        font-size: 1.2rem;
        color: var(--light);
        font-weight: 100;
        &.active {
          font-weight: 600;
          color: var(--main);
        }
        &:hover {
          color: var(--main);
          font-weight: 500;
        }
      }
    }
  }
`;

const Teambtn = styled.div`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ $mode }) => ($mode === "light" ? "#aaa" : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);

  svg {
    width: 22px;
    path {
      stroke: ${({ $mode }) => ($mode === "light" ? "#888" : "#fff")};
    }
    transform: ${({ $show }) => ($show ? "rotate(45deg)" : "rotate(0)")};
    transition: transform 0.3s ease;
  }

  @media screen and (max-width: 1024px) {
    width: 44px;
    svg {
      width: 18px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 37px;
    svg {
      width: 16px;
    }
  }
`;

const teamIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TeamhomeBtn = ({ mode, isVisible }) => {
  const [showMenus, setShowMenus] = useState(false);
  const location = useLocation();

  const currentTeamCode = location.pathname.split("/")[2];

  const onClickBtn = () => {
    setShowMenus((prev) => !prev);
  };

  useEffect(() => {
    setShowMenus(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isVisible) {
      setShowMenus(false);
    }
  }, [isVisible]);

  return (
    <Container>
      <Menus $show={showMenus}>
        <ul>
          {teamIds.map((id) => {
            const teamName = getTeamName(id);
            const teamCode = getTeamJsonCode(id);
            const isActive = teamCode === currentTeamCode;
            return (
              <li key={id}>
                <Link
                  to={`/teamhome/${teamCode}`}
                  className={isActive ? "active" : undefined}
                >
                  {teamName}
                </Link>
              </li>
            );
          })}
        </ul>
      </Menus>
      <Teambtn
        $mode={mode}
        $isVisible={isVisible}
        onClick={onClickBtn}
        $show={showMenus}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M12.9951 1.77148V24.2286"
            stroke="#666666"
            strokeWidth="1.66667"
            strokeLinecap="round"
          />
          <path
            d="M24.2285 12.9951L1.77135 12.9951"
            stroke="#666666"
            strokeWidth="1.66667"
            strokeLinecap="round"
          />
        </svg>
      </Teambtn>
    </Container>
  );
};

export default TeamhomeBtn;
