import { useSuspenseQuery } from "@tanstack/react-query";
import { HIGHLIGHT_PLAYLIST_ID } from "../data/teamPlaylists";
import { getPreviousMatchDay } from "../util";
import { matchHighlightToGames } from "../utils/youtube";
import { fetchYoutubePlaylist } from "./useYoutubePlayList";

// 메인 슬라이드용
const useMatchedGameVideos = () => {
  // throw new Error("테스트 에러");
  const matchDay = getPreviousMatchDay();

  return useSuspenseQuery({
    queryKey: ["matchedGameVideos", matchDay?.date],
    queryFn: async () => {
      // 경기 일정 확인
      if (!matchDay) {
        throw new Error("경기 일정을 찾을 수 없습니다.");
      }

      //YouTube 플레이리스트 가져오기
      const highlights = await fetchYoutubePlaylist({
        queryKey: ["youtubePlaylist", HIGHLIGHT_PLAYLIST_ID, 30],
      });

      //경기 일정과 영상 매치
      const matches = await matchHighlightToGames(
        matchDay.date,
        matchDay.matches,
        highlights
      );

      //결과 반환
      return {
        date: matchDay.date,
        day: matchDay.day,
        matches,
      };
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export default useMatchedGameVideos;
