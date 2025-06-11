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

    console.log("YouTube API response:", res.data);

    const filtered = res.data.items
      // 재생할 수 없는 영상 제외
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

    // 퓨처스리그 필터링
    if (type === "weeklyplay") {
      const keyword = "KBO리그"; // 여기에 필터링할 단어 입력
      return filtered.filter(
        (video) =>
          video.title.includes(keyword) || video.description?.includes(keyword)
      );
    }

    return filtered;
  } catch (err) {
    console.error("YouTube API 에러:", err);
    return [];
  }
};
