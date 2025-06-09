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
  margin-bottom: 15px;
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
  font-size: 18px;
  color: var(--light);
  opacity: 0.7;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

// 스탯 테이블 영역
const StatsSection = styled.div`
  background: var(--dark);
  color: var(--light);
  padding: 40px 0;

  @media screen and (max-width: 1024px) {
    padding: 30px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;

const StatsTable = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 1px solid var(--gray6);
  border-radius: 8px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  border-right: 1px solid var(--gray6);
  border-bottom: 1px solid var(--gray6);
  padding: 20px 10px;

  &:nth-child(8n) {
    border-right: none;
  }

  &:nth-last-child(-n + 8) {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    padding: 15px 8px;

    &:nth-child(8n) {
      border-right: 1px solid var(--gray6);
    }

    &:nth-child(4n) {
      border-right: none;
    }

    &:nth-last-child(-n + 8) {
      border-bottom: 1px solid var(--gray6);
    }

    &:nth-last-child(-n + 4) {
      border-bottom: none;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 12px 5px;

    &:nth-child(4n) {
      border-right: 1px solid var(--gray6);
    }

    &:nth-child(2n) {
      border-right: none;
    }

    &:nth-last-child(-n + 4) {
      border-bottom: 1px solid var(--gray6);
    }

    &:nth-last-child(-n + 2) {
      border-bottom: none;
    }
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: var(--light);
  opacity: 0.7;
  margin-bottom: 8px;

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
          <StatsContainer>
            <div>팀 데이터를 불러오는 중...</div>
          </StatsContainer>
        </StatsSection>
      );
    }
  }

  const { teamName, games, wins, losses, ties, winRate, stats } = teamData;

  // 오버레이만 표시
  if (showOverlayOnly) {
    return (
      <TeamInfoOverlay>
        <TeamName>{teamName}</TeamName>
        <TeamRecord>
          경기 수 {games} | 성적 {wins}승 {losses}패 {ties}무 | 승률 {winRate}
        </TeamRecord>
      </TeamInfoOverlay>
    );
  }

  // 스탯 테이블만 표시
  if (showStatsOnly) {
    return (
      <StatsSection>
        <StatsContainer>
          <StatsTable>
            <StatItem>
              <StatLabel>타율</StatLabel>
              <StatValue>{stats.battingAverage}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>평균자책</StatLabel>
              <StatValue>{stats.era}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>안타</StatLabel>
              <StatValue>{stats.hits}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>홈런</StatLabel>
              <StatValue>{stats.homeRuns}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>도루</StatLabel>
              <StatValue>{stats.steals}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>삼진</StatLabel>
              <StatValue>{stats.strikeouts}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>병살</StatLabel>
              <StatValue>{stats.doublePlay}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>실책</StatLabel>
              <StatValue>{stats.errors}</StatValue>
            </StatItem>
          </StatsTable>
        </StatsContainer>
      </StatsSection>
    );
  }

  // 전체 컴포넌트 (기본값)
  return null;
};

export default TeamStat;
