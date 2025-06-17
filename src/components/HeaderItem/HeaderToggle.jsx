import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import toggleBtn from "../../images/icons/header_toggle_btn.svg";
import { useToggleStore } from "../../stores/headersStore";
import authStore from "../../stores/AuthStore";
import { getTeamCodeEng } from "../../util";

const ToggleWrapper = styled.div`
  margin-right: 18px;
  width: 84px;
  height: 28px;
  border-radius: 999px;
  background: var(--gray2);
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

// 회전 애니메이션 정의 (시계방향)
const rollRight = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

// 반시계방향
const rollLeft = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Circle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  top: 0px;
  left: ${({ $active }) => (!$active ? "calc(84px - 28px)" : "0px")};
  transition: left 0.3s ease;
  border: 2px solid var(--gray2);
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${({ $active, $prev }) =>
        $active === $prev ? "none" : $active ? rollRight : rollLeft}
      0.3s ease forwards;
  }
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--main);
  margin-left: ${({ $active }) => (!$active ? "15px" : "calc(5px + 28px)")};
  transition: margin 0.3s ease;
`;

const HeaderToggle = () => {
  const isTeamMode = useToggleStore((state) => state.isTeamMode);
  const setTeamMode = useToggleStore((state) => state.setTeamMode);
  const navigate = useNavigate();
  const { user, userProfile } = authStore();

  const userTeam =
    user && userProfile ? getTeamCodeEng(userProfile.favoriteTeam) : null;

  const handleToggle = () => {
    const next = !isTeamMode;
    setTeamMode(next);

    setTimeout(() => {
      if (next && userTeam) {
        navigate(`/teamhome/${userTeam}`);
      } else if (!next) {
        navigate("/");
      }
    }, 300);
  };

  return (
    <ToggleWrapper onClick={handleToggle}>
      <Text $active={isTeamMode}>{!isTeamMode ? "ROOKie" : "TEAMS"}</Text>
      <Circle $active={isTeamMode} $prev={!isTeamMode}>
        <img src={toggleBtn} alt="btn" />
      </Circle>
    </ToggleWrapper>
  );
};

export default HeaderToggle;
