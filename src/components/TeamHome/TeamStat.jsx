import React from "react";
import styled from "styled-components";
import teamStatData from "../../data/team_stat.json";

// 배너 위에 절대 위치로 배치될 팀 정보
const TeamInfoOverlay = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  z-index: 10;
  color: var(--light);

  @media screen and (max-width: 1024px) {
    bottom: 30px;
    left: 30px;
  }

  @media screen and (max-width: 768px) {
    bottom: 20px;
    left: 20px;
  }
`;

const TeamName = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--light);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media screen and (max-width: 1024px) {
    font-size: 30px;
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const TeamRecord = styled.div`
  font-size: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

// key 부분 (경기수 | 성적 | 승률)
const RecordKeys = styled.span`
  color: var(--light);
  opacity: 0.7;
`;

// value 부분 (60 | 23승 34패 3무 | 0.404)
const RecordValues = styled.span`
  color: var(--light);
`;

// 스탯 테이블 영역
const StatsSection = styled.div`
  position: relative;
  background: var(--dark);
  color: var(--light);

  @media screen and (max-width: 1024px) {
    padding: 30px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`;

// Gradient 오버레이 - 배너 하단에서 스탯 테이블 상단까지
const GradientOverlay = styled.div`
  position: absolute;
  top: -250px;
  left: 0;
  right: 0;
  height: 250px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.7) 70%,
    var(--dark) 100%
  );
  pointer-events: none;
  z-index: 5;

  @media screen and (max-width: 1024px) {
    top: -200px;
    height: 200px;
  }

  @media screen and (max-width: 768px) {
    top: -150px;
    height: 150px;
  }
`;

const StatsContainer = styled.div`
  max-width: 1728px;
  max-height: 116px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;

// 가장 안전한 방법 - 개별 박스들
const StatsWrapper = styled.div`
  border: 1px solid var(--gray3);
  border-radius: 8px;
  overflow: hidden;
  background: var(--dark);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBox = styled.div`
  text-align: center;
  padding: 20px 10px;
  background: var(--dark);

  /* 간단한 세로 테두리 처리 */
  + div {
    border-left: 1px solid var(--gray6);
  }

  /* 두 번째 행부터 상단 테두리 (데스크톱: 9번째부터) */
  &:nth-child(n + 9) {
    border-top: 1px solid var(--gray6);
  }

  @media screen and (max-width: 768px) {
    padding: 15px 8px;

    &:nth-child(n + 9) {
      border-top: none;
    }
    /* 태블릿: 5번째부터 두 번째 행 */
    &:nth-child(n + 5) {
      border-top: 1px solid var(--gray6);
    }
  }

  @media screen and (max-width: 500px) {
    padding: 12px 5px;

    &:nth-child(n + 5) {
      border-top: none;
    }
    /* 모바일: 3번째부터 두 번째 행 */
    &:nth-child(n + 3) {
      border-top: 1px solid var(--gray6);
    }
  }
`;

const StatLabel = styled.div`
  font-size: 20px;
  color: var(--light);
  opacity: 0.7;
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--light);

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const TeamStat = ({
  teamCode,
  showOverlayOnly = false,
  showStatsOnly = false,
}) => {
  // teamCode에 맞는 팀 데이터 찾기
  const teamData = teamStatData.find((team) => team.teamCode === teamCode);

  // 팀 데이터가 없으면 기본값 또는 로딩 상태 표시
  if (!teamData) {
    if (showOverlayOnly) {
      return (
        <TeamInfoOverlay>
          <TeamName>팀 데이터를 불러오는 중...</TeamName>
        </TeamInfoOverlay>
      );
    }
    if (showStatsOnly) {
      return (
        <StatsSection>
          <GradientOverlay />
          <StatsContainer>
            <div>팀 데이터를 불러오는 중...</div>
          </StatsContainer>
        </StatsSection>
      );
    }
  }

  const { teamName, games, wins, losses, ties, winRate, stats } = teamData;

  // 스탯 데이터 배열
  const statsArray = [
    { label: "타율", value: stats.battingAverage },
    { label: "평균자책", value: stats.era },
    { label: "안타", value: stats.hits },
    { label: "홈런", value: stats.homeRuns },
    { label: "도루", value: stats.steals },
    { label: "삼진", value: stats.strikeouts },
    { label: "병살", value: stats.doublePlay },
    { label: "실책", value: stats.errors },
  ];

  // 오버레이만 표시
  if (showOverlayOnly) {
    return (
      <TeamInfoOverlay>
        <TeamName>{teamName}</TeamName>
        <TeamRecord>
          <RecordKeys>경기 수</RecordKeys> <RecordValues>{games}</RecordValues>{" "}
          | <RecordKeys>성적</RecordKeys>{" "}
          <RecordValues>
            {wins}승 {losses}패 {ties}무
          </RecordValues>{" "}
          | <RecordKeys>승률</RecordKeys> <RecordValues>{winRate}</RecordValues>
        </TeamRecord>
      </TeamInfoOverlay>
    );
  }

  // 스탯 테이블만 표시
  if (showStatsOnly) {
    return (
      <StatsSection>
        <GradientOverlay />
        <StatsContainer>
          <StatsWrapper>
            <StatsGrid>
              {statsArray.map((stat, index) => (
                <StatBox key={index}>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                </StatBox>
              ))}
            </StatsGrid>
          </StatsWrapper>
        </StatsContainer>
      </StatsSection>
    );
  }

  // 전체 컴포넌트 (기본값)
  return null;
};

export default TeamStat;
