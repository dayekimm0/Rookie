import { useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchYoutubePlaylist } from "../../hook/useYoutubePlayList";
import { getTeamNameShortEng } from "../../util";
import TabSlideRenderer from "./TabSlideRenderer";
import { filterValidVideos, filterByTeam } from "../../utils/youtube";

const TabSlideContent = ({ isAll, allTab, selectedTab, onSwiperReady }) => {
  const location = useLocation();

  //팀 정보
  const teamInfo = useMemo(() => {
    const isTeamPage = location.pathname.toLowerCase().includes("/teamhome");
    const teamCode = location.pathname.split("/")[2];
    const teamKeyword = isTeamPage ? getTeamNameShortEng(teamCode) : null;
    return { isTeamPage, teamKeyword };
  }, [location.pathname]);

  // isAll에 따라 쿼리 설정만 다르게
  const queries = useMemo(() => {
    if (isAll) {
      // 전체 탭: 여러 플레이리스트
      return allTab.playlists.map(({ id, max }) => ({
        queryKey: ["youtubePlaylist", id, max],
        queryFn: fetchYoutubePlaylist,
      }));
    } else {
      // 단일 탭: 하나의 플레이리스트
      return [
        {
          queryKey: [
            "youtubePlaylist",
            selectedTab.playlistId,
            selectedTab.max || 15,
          ],
          queryFn: fetchYoutubePlaylist,
        },
      ];
    }
  }, [isAll, allTab, selectedTab]);

  //useSuspenseQueries 사용 (단일 쿼리도 배열로)
  const results = useSuspenseQueries({ queries });

  // 아이템 가공 로직 통합
  const items = useMemo(() => {
    if (isAll) {
      // 전체 탭: 여러 플레이리스트 합치기
      return allTab.playlists
        .map((playlist, index) => {
          const data = results[index]?.data;
          if (!data) return [];

          let validItems = filterValidVideos(data);

          if (
            teamInfo.isTeamPage &&
            playlist.type === "highlight" &&
            teamInfo.teamKeyword
          ) {
            validItems = filterByTeam(validItems, teamInfo.teamKeyword);
          }

          return validItems;
        })
        .flat()
        .sort(
          (a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        )
        .slice(0, 15);
    } else {
      // 단일 탭: 하나의 플레이리스트
      const data = results[0]?.data || [];
      let validItems = filterValidVideos(data);

      if (
        teamInfo.isTeamPage &&
        selectedTab?.name === "하이라이트" &&
        teamInfo.teamKeyword
      ) {
        validItems = filterByTeam(validItems, teamInfo.teamKeyword);
      }

      return validItems;
    }
  }, [isAll, results, allTab.playlists, selectedTab, teamInfo]);

  return <TabSlideRenderer items={items} onSwiperReady={onSwiperReady} />;
};

export default TabSlideContent;
