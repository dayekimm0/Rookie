import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HIGHLIGHT_PLAYLIST_ID } from "../data/teamPlaylists";
import { getPreviousMatchDay } from "../util";
import { matchHighlightToGames } from "../utils/youtube";
import { useEffect, useState } from "react";

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

// 플레이리스트 정보보
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

//유튜브 영상 디테일 정보
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

// 메인홈 슬라이드
export const useHighlightVideos = (maxResults = 30) => {
  return useQuery({
    queryKey: ["highlightVideos", maxResults],
    queryFn: () =>
      fetchYoutubePlaylist({
        queryKey: ["youtubePlaylist", HIGHLIGHT_PLAYLIST_ID, maxResults],
      }),
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      console.error("❗ useHighlightVideos 에러 발생", err);
    },
  });
};

// 메인홈 최상단 하이라이트 -> 구단 컨텐츠 영상
export const useMatchedGameVideos = () => {
  const matchDay = getPreviousMatchDay();
  const {
    data: highlights,
    isLoading: highlightsLoading,
    isError,
  } = useHighlightVideos(10);

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!highlights) return;

    const fetchMatchedGames = async () => {
      const matched = await matchHighlightToGames(
        matchDay.date,
        matchDay.matches,
        highlights
      );
      setMatches(matched);
      setIsLoading(false);
    };

    fetchMatchedGames();
  }, [highlights, matchDay.date, matchDay.matches]);

  return {
    date: matchDay.date,
    day: matchDay.day,
    matches,
    isLoading: highlightsLoading || isLoading,
    isError,
  };
};
