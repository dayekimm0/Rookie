import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchPlaylistVideos = async (playlistId, maxResults = 10) => {
  console.log("fetchPlaylistVideos called with:", {
    playlistId,
    maxResults,
    API_KEY,
  });
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
    console.log("YouTube API response:", res.data);

    return res.data.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (err) {
    console.error("YouTube API 에러:", err);
    return [];
  }
};
