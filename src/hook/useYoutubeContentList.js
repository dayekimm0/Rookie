import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchPlaylistVideos = async (playlistId, maxResults = 10) => {
  // console.log("fetchPlaylistVideos called with:", {
  //   playlistId,
  //   maxResults,
  //   API_KEY,
  // });
  try {
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
    // console.log("YouTube API response:", res.data);
    return (
      res.data.items
        // 재생할 수 없는 영상 제외
        .filter((item) => {
          if (!item.snippet) return false;
          const title = item.snippet.title.toLowerCase();
          if (title === "private video" || title === "deleted video")
            return false;
          return true;
        })
        .map((item) => {
          const thumbnails = item.snippet.thumbnails;
          const thumbnail =
            thumbnails.maxres?.url ||
            thumbnails.standard?.url ||
            thumbnails.high?.url ||
            thumbnails.medium?.url;

          return {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnail,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
          };
        })
    );
  } catch (err) {
    // console.error("YouTube API 에러:", err);
    return [];
  }
};
