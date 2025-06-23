import axios from "axios";
import { formatSubscribeCount } from "../utils/formatSubscribeCount";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// 1. 플레이리스트에서 영상 목록 + 세부정보 가져오기
export const fetchPlaylistVideos = async (
  playlistId,
  maxResults = 10,
  type = null
) => {
  try {
    // 플레이리스트 항목 조회 (영상 ID만 추출)
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: { part: "snippet", maxResults, playlistId, key: API_KEY },
      }
    );

    const items = res.data.items.filter((item) => {
      if (!item.snippet) return false;
      const title = item.snippet.title.toLowerCase();
      return title !== "private video" && title !== "deleted video";
    });

    const videoIds = items
      .map((item) => item.snippet.resourceId.videoId)
      .join(",");
    if (!videoIds) return [];

    // 영상 세부 정보 조회
    const videoRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoIds,
          key: API_KEY,
        },
      }
    );

    const videoMap = {};
    videoRes.data.items.forEach((video) => {
      videoMap[video.id] = video;
    });

    // 영상 정보 병합 및 가공
    let finalVideos = items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      const original = videoMap[videoId];
      const thumbnails = original?.snippet?.thumbnails || {};

      const thumbnail =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        "";

      return {
        id: videoId,
        title: original?.snippet?.title || item.snippet.title,
        channelTitle:
          original?.snippet?.channelTitle || item.snippet.channelTitle,
        thumbnail,
        description: original?.snippet?.description || item.snippet.description,
        publishedAt: original?.snippet?.publishedAt,
        viewCount: original?.statistics?.viewCount || 0,
      };
    });

    // 선택적 필터링 (예: weeklyplay)
    if (type === "weeklyplay") {
      const keyword = "SOL";
      finalVideos = finalVideos.filter(
        (video) =>
          video.title.includes(keyword) || video.description?.includes(keyword)
      );
    }

    // 최신순 정렬
    finalVideos.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    return finalVideos;
  } catch (error) {
    console.error("YouTube API 에러:", error);
    return [];
  }
};

// 2. 채널 구독자 수 조회
export const fetchChannelSubscriberCount = async (channelId) => {
  if (!channelId) return "0";

  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: { part: "statistics", id: channelId, key: API_KEY },
      }
    );
    const count = res.data.items[0]?.statistics?.subscriberCount || "0";
    return count;
  } catch (error) {
    console.error("채널 구독자 수 불러오기 실패:", error);
    return "0";
  }
};

// 3. 단일 영상 상세 정보 조회
export const fetchVideoDetailById = async (videoId) => {
  if (!videoId) return null;

  try {
    // 단일 영상 조회
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoId,
          key: API_KEY,
        },
      }
    );

    const video = res.data.items[0];
    if (!video) throw new Error("영상 정보를 찾을 수 없습니다");

    const thumbnails = video.snippet?.thumbnails || {};
    const thumbnail =
      thumbnails.maxres?.url ||
      thumbnails.standard?.url ||
      thumbnails.high?.url ||
      thumbnails.medium?.url ||
      "";

    // 구독자 수 조회
    const rawSubscriberCount = await fetchChannelSubscriberCount(
      video.snippet.channelId
    );
    const subscriberCount = formatSubscribeCount(rawSubscriberCount);

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      viewCount: video.statistics?.viewCount || 0,
      thumbnail,
      subscriberCount,
      channelId: video.snippet.channelId,
    };
  } catch (error) {
    console.error("단일 영상 정보 불러오기 실패:", error);
    return null;
  }
};

// 4. 채널 썸네일 조회
export const fetchChannelThumbnail = async (channelId) => {
  if (!channelId) return null;

  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: { part: "snippet", id: channelId, key: API_KEY },
      }
    );

    const channel = res.data.items[0];
    return (
      channel?.snippet?.thumbnails?.default?.url ||
      channel?.snippet?.thumbnails?.medium?.url ||
      null
    );
  } catch (error) {
    console.error("채널 정보 로딩 실패", error);
    return null;
  }
};

export const fetchRelatedVideosByChannelId = async (
  channelId,
  excludeVideoId,
  maxResults = 20
) => {
  if (!channelId) return [];

  try {
    const decodeHTML = (str) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    };

    // 1) 채널 영상 리스트 조회
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId,
          maxResults,
          order: "date",
          type: "video",
          key: API_KEY,
        },
      }
    );

    const videoIds = res.data.items
      .map((item) => item.id.videoId)
      .filter((id) => id !== excludeVideoId)
      .join(",");

    if (!videoIds) return [];

    // 2) 영상 상세 정보 가져오기
    const detailsRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "contentDetails,snippet,statistics",
          id: videoIds,
          key: API_KEY,
        },
      }
    );

    const durationToSeconds = (duration) => {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      const hours = parseInt(match[1] || "0", 10);
      const minutes = parseInt(match[2] || "0", 10);
      const seconds = parseInt(match[3] || "0", 10);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const filtered = detailsRes.data.items
      .filter(
        (video) =>
          video.id !== excludeVideoId &&
          !video.snippet.title.toLowerCase().includes("#shorts") &&
          durationToSeconds(video.contentDetails.duration) > 60
      )
      .slice(0, 4)
      .map((video) => ({
        id: video.id,
        title: decodeHTML(video.snippet.title),
        thumbnail:
          video.snippet.thumbnails?.maxres?.url ||
          video.snippet.thumbnails?.standard?.url ||
          video.snippet.thumbnails?.high?.url ||
          video.snippet.thumbnails?.medium?.url ||
          "",
        channelTitle: decodeHTML(video.snippet.channelTitle),
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics?.viewCount || 0,
      }));

    return filtered;
  } catch (error) {
    console.error("추천 영상 불러오기 실패:", error);
    return [];
  }
};
