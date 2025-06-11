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

    const filtered = res.data.items
      .filter((item) => {
        if (!item.snippet) return false;
        const title = item.snippet.title.toLowerCase();
        return !(title === "private video" || title === "deleted video");
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
      });

    if (type === "weeklyplay") {
      const keyword = "KBO리그";
      return filtered.filter(
        (video) =>
          video.title.includes(keyword) || video.description?.includes(keyword)
      );
    }

    return filtered;
  } catch (err) {
    return [];
  }
};
