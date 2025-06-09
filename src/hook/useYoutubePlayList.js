import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchYoutubePlaylist = async ({ queryKey }) => {
  const [_key, playlistId, maxResults] = queryKey;

  if (!playlistId) {
    throw new Error("Invalid playlistId");
  }

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

  return res.data.items || [];
};

const fetchVideoDetails = async ({ queryKey }) => {
  const [_key, videoIds] = queryKey;

  const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet,statistics",
      id: videoIds,
      key: API_KEY,
    },
  });

  return res.data.items;
};

export const useYoutubePlaylist = (
  playlistId,
  maxResults = 12,
  enabled = true
) => {
  if (!playlistId) return { data: null };
  return useQuery({
    queryKey: ["youtubePlaylist", playlistId, maxResults],
    queryFn: fetchYoutubePlaylist,
    enabled,
    staleTime: 1000 * 60 * 5, // 5분간 데이터 캐시
    cacheTime: 1000 * 60 * 10, // 10분간 쿼리 캐시 유지
    retry: 1,
    refetchOnWindowFocus: false, // 탭 이동 시 재요청 방지
  });
};

export const useYoutubeVideoDetails = (videoIds, enabled = true) => {
  return useQuery({
    queryKey: ["youtubeVideoDetails", videoIds],
    queryFn: fetchVideoDetails,
    enabled: !!videoIds && enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
