import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchPlaylistVideos = async (
  playlistId,
  maxResults = 10,
  type = null
) => {
  console.log("fetchPlaylistVideos called with:", {
    playlistId,
    maxResults,
    API_KEY,
    type,
  });

  try {
    // Step 1: playlistItems 호출 (영상 ID만 가져옴)
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          maxResults,
          playlistId,
          key: API_KEY,
        },
      }
    );

    const items = res.data.items.filter((item) => {
      if (!item.snippet) return false;
      const title = item.snippet.title.toLowerCase();
      return !(title === "private video" || title === "deleted video");
    });

    const videoIds = items
      .map((item) => item.snippet.resourceId.videoId)
      .join(",");

    if (!videoIds) {
      console.warn("유효한 videoId가 없음");
      return [];
    }

    // Step 2: videos API 호출로 원본 영상 정보 가져오기
    const videoRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails",
          id: videoIds,
          key: API_KEY,
        },
      }
    );

    const videoMap = {};
    videoRes.data.items.forEach((video) => {
      videoMap[video.id] = video;
    });

    // Step 3: 병합해서 최종 데이터 생성
    const finalVideos = items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      const original = videoMap[videoId];

      const thumbnails = original?.snippet?.thumbnails || {};
      const thumbnail =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url;

      return {
        id: videoId,
        title: original?.snippet?.title || item.snippet.title,
        channelTitle:
          original?.snippet?.channelTitle || item.snippet.channelTitle,
        thumbnail,
        description: original?.snippet?.description || item.snippet.description,
        publishedAt: original?.snippet?.publishedAt, // 원본 업로드일
      };
    });

    // Step 4: 필터링
    let result = finalVideos;

    if (type === "weeklyplay") {
      const keyword = "SOL";
      result = result.filter(
        (video) =>
          video.title.includes(keyword) || video.description?.includes(keyword)
      );
    }

    // 최신순 정렬
    result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return result;
  } catch (err) {
    console.error("YouTube API 에러:", err);
    return [];
  }
};
