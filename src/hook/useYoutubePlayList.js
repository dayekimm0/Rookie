import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// axios 인스턴스

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

export const fetchVideoDetails = async ({ queryKey }) => {
  const [_key, videoIds] = queryKey;

  const res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      id: videoIds,
      key: API_KEY,
    },
  });

  return res.data.items;
};

// 플레이리스트 정보
export const useYoutubePlaylist = (
  playlistId,
  maxResults = 12,
  enabled = true,
  suspense = false
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
    refetchOnMount: false,
    refetchOnReconnect: false,
    suspense, //서스펜스 추가
  });
};

//유튜브 영상 디테일 정보
export const useYoutubeVideoDetails = (
  videoIds,
  enabled = true,
  suspense = false
) => {
  return useQuery({
    queryKey: ["youtubeVideoDetails", videoIds],
    queryFn: fetchVideoDetails,
    enabled: !!videoIds && enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    suspense,
  });
};

export const usePlaylistCount = (playlistId, enabled = true) => {
  return useQuery({
    queryKey: ["playlistCount", playlistId],
    queryFn: async () => {
      if (!playlistId) return 0;

      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "id", // 최소한의 정보만 요청
            playlistId,
            maxResults: 1, // 속도 빠르게
            key: API_KEY,
          },
        }
      );

      return res.data.pageInfo?.totalResults || 0;
    },
    enabled: !!playlistId && enabled,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useTotalPlaylistVideoCount = (clipId, playId, enabled = true) => {
  const { data: clipCount = 0, isLoading: clipLoading } = usePlaylistCount(
    clipId,
    !!clipId && enabled
  );
  const { data: playCount = 0, isLoading: playLoading } = usePlaylistCount(
    playId,
    !!playId && enabled
  );

  return {
    totalCount: clipCount + playCount,
    isLoading: clipLoading || playLoading,
  };
};
