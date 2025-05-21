import { useState, useEffect } from "react";
import styled from "styled-components";
import { getEmblem } from "../../util";
import logon_check from "../../images/icons/logon_check.svg";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import authStore from "../../stores/AuthStore";
import useBodyScrollLock from "../../hook/useBodyScrollLock";

const ModalOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  z-index: 1500;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background: var(--light);
  width: 600px;
  border-radius: 12px;
  padding: 70px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-top: 100px;
  @media screen and (max-width: 1024px) {
    width: 480px;
    padding: 50px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 50px 30px 30px;
    margin: 0 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: var(--dark);
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  @media screen and (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const ModalTitle = styled.h2`
  width: 100%;
  font-size: 2rem;
  font-weight: 800;
  span {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.3;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    span {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
`;

const ModalTWrapper = styled.div`
  width: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
  padding-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;
  touch-action: auto;
  scroll-behavior: auto;

  scrollbar-gutter: stable;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--grayC);
  }

  &::-webkit-scrollbar-track {
    background: var(--light);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
  @media screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const TeamWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const ModalText = styled.h2`
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 400;
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
    height: 100%;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const CheckCircle = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid
    ${({ checked }) => (checked ? "var(--dark)" : "var(--grayC)")};
  border-radius: 50%;
  position: relative;
  img {
    position: absolute;
    display: ${({ checked }) => (checked ? "block" : "none")};
  }
`;

const ModalButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  border: none;
  background: var(--dark);
  color: var(--light);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    height: 40px;
    font-size: 1.4rem;
  }
`;

const MypageModal = ({ isOpen, closeTeamModal }) => {
  useBodyScrollLock(isOpen);
  const { userProfile, setUser } = authStore();
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(false);

  const teams = [
    { id: "1", name: "기아 타이거즈" },
    { id: "2", name: "삼성 라이온즈" },
    { id: "3", name: "LG 트윈스" },
    { id: "4", name: "두산 베어스" },
    { id: "5", name: "KT 위즈" },
    { id: "6", name: "SSG 랜더스" },
    { id: "7", name: "롯데 자이언츠" },
    { id: "8", name: "한화 이글스" },
    { id: "9", name: "NC 다이노스" },
    { id: "10", name: "키움 히어로즈" },
  ];

  useEffect(() => {
    const fetchFavoriteTeam = async () => {
      const user = auth.currentUser;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSelectedTeam(userData.favoriteTeam || "");
        }
      } catch (err) {
        console.log("favoriteTeam 가져오기 오류", err);
      }
    };

    if (isOpen) {
      fetchFavoriteTeam();
    }
  }, [isOpen]);

  const handleTeamSelect = (teamName) => {
    setSelectedTeam(teamName);
  };

  // 팀 업뎃
  const handleSaveTeam = async () => {
    const user = auth.currentUser;

    setLoading(true);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        favoriteTeam: selectedTeam,
      });

      // authStore의 userProfile 업데이트
      const updatedProfile = {
        ...userProfile,
        favoriteTeam: selectedTeam,
      };
      setUser(
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        updatedProfile
      );

      closeTeamModal();
    } catch (err) {
      console.log("favoriteTeam 업데이트 오류", err);
    } finally {
      setLoading(false);
    }
  };

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={closeTeamModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeTeamModal}>⨯</CloseButton>
        <LogoWrapper>
          <ModalTitle>
            마이팀 설정 <br />
            <br />
            <span>
              마이팀을 설정하면 내가 응원하는 팀의 컨텐츠를 더 손쉽게 볼 수
              있어요.
            </span>
          </ModalTitle>
        </LogoWrapper>
        <ModalTWrapper data-lenis-prevent>
          {teams.map((team) => (
            <ModalText
              key={team.id}
              onClick={() => handleTeamSelect(team.name)}
            >
              <TeamWrapper>
                <TeamEmblem emblemId={team.id} />
                {team.name}
              </TeamWrapper>
              <CheckCircle checked={selectedTeam === team.name}>
                <img src={logon_check} alt="logon_check" />
              </CheckCircle>
            </ModalText>
          ))}
        </ModalTWrapper>
        <ModalButton
          type="button"
          onClick={handleSaveTeam}
          disabled={loading}
          style={{
            background: loading ? "var(--grayE)" : "var(--dark)",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "저장 중..." : "팀 변경하기"}
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MypageModal;
