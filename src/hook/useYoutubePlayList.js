import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const fetchYoutubePlaylist = async ({ queryKey }) => {
  const [_key, playlistId, maxResults] = queryKey;

  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",
    {
      params: {
        part: "snippet",
        playlistId,
        maxResults,
        key: API_KEY,
      },
    }
  );

  return res.data.items;
};

export const useYoutubePlaylist = (playlistId, maxResults = 12) => {
  return useQuery({
    queryKey: ["youtubePlaylist", playlistId, maxResults],
    queryFn: fetchYoutubePlaylist,
    staleTime: 1000 * 60 * 5, // 5분간 데이터 캐시
    cacheTime: 1000 * 60 * 10, // 10분간 쿼리 캐시 유지
    retry: 1, // 실패 시 1회 재시도
    refetchOnWindowFocus: false, // 탭 이동 시 재요청 방지
  });
};
