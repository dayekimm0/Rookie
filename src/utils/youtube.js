import { teamPlaylists } from "../data/teamPlaylists";
import {
  fetchYoutubePlaylist,
  fetchVideoDetails,
} from "../hook/useYoutubePlayList";

export const getPlaylistVideos = async (playlistId, max = 4) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${max}&playlistId=${playlistId}&key=${API_KEY}`
  );

  const data = await res.json();
  if (!data.items) return [];

  return data.items.map((item) => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.high?.url,
  }));
};

// 영상 경기 매치
export const matchHighlightToGames = async (date, games, highlightVideos) => {
  const [year, month, day] = date.split("-");
  const m = parseInt(month);
  const d = parseInt(day);

  const dateKeywords = [
    `${m}.${d}`,
    `${month}.${day}`,
    `${year}.${month}.${day}`,
    `${m}월 ${d}일`,
  ];

  const matchedGames = await Promise.all(
    games.map(async (game) => {
      const { name: home } = game.homeTeam;
      const { name: away } = game.awayTeam;

      const homePlaylistId = teamPlaylists[home] ?? null;
      const awayPlaylistId = teamPlaylists[away] ?? null;

      const matchedVideo = highlightVideos.find((video) => {
        const title = video.snippet.title;
        return (
          title.includes("SOL") &&
          dateKeywords.some((kw) => title.includes(kw)) &&
          (title.includes(home) || title.includes(away))
        );
      });

      let nextVideos = [];

      if (homePlaylistId && awayPlaylistId) {
        const [homeVideos, awayVideos] = await Promise.all([
          getPlaylistVideos(homePlaylistId, 4),
          getPlaylistVideos(awayPlaylistId, 4),
        ]);

        for (let i = 0; i < 4; i++) {
          homeVideos[i] && nextVideos.push({ ...homeVideos[i], from: "home" });
          awayVideos[i] && nextVideos.push({ ...awayVideos[i], from: "away" });
        }
      }

      let thumbnail = null;
      if (matchedVideo?.snippet?.thumbnails?.standard?.url) {
        thumbnail = matchedVideo.snippet.thumbnails.standard.url; // 640x480
      } else if (matchedVideo?.snippet?.thumbnails?.high?.url) {
        thumbnail = matchedVideo.snippet.thumbnails.high.url;
      } else if (matchedVideo?.snippet?.thumbnails?.medium?.url) {
        thumbnail = matchedVideo.snippet.thumbnails.medium.url;
      }

      return {
        ...game,
        highlightVideo: matchedVideo ?? null,
        videoId: matchedVideo?.snippet?.resourceId?.videoId ?? null,
        thumbnail,
        homePlaylist: homePlaylistId,
        awayPlaylist: awayPlaylistId,
        nextVideos,
      };
    })
  );

  return matchedGames;
};

export const fetchAllTeamVideos = async (playlists) => {
  const allItems = await Promise.all(
    playlists.map(async ({ playlistId, max, type }) => {
      const items = await fetchYoutubePlaylist({
        queryKey: ["youtubePlaylist", playlistId, max],
      });

      return items.map((item) => ({
        ...item,
        playlistType: type || null,
      }));
    })
  );

  const flatItems = allItems.flat();

  const videoIds = flatItems
    .map((item) => item.snippet.resourceId?.videoId || item.id?.videoId)
    .filter(Boolean)
    .join(",");

  const details = await fetchVideoDetails({
    queryKey: ["youtubeVideoDetails", videoIds],
  });

  return details.map((video) => {
    const matched = flatItems.find(
      (item) =>
        item.snippet.resourceId?.videoId === video.id ||
        item.id?.videoId === video.id
    );

    return {
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails?.high?.url || "",
      channelTitle: video.snippet.channelTitle || "",
      playlistType: matched?.playlistType || null,
      publishedAt: video.snippet.publishedAt,
    };
  });
};

// ISO 8601 형식의 YouTube duration 파싱 함수
export const parseISO8601Duration = (duration) => {
  if (!duration || typeof duration !== "string") return 0;

  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = duration.match(regex);
  if (!match) return 0;

  const [, hours, minutes, seconds] = match;

  return (
    parseInt(hours || "0", 10) * 3600 +
    parseInt(minutes || "0", 10) * 60 +
    parseInt(seconds || "0", 10)
  );
};

export const filterValidVideos = (items) => {
  return items.filter(
    (item) =>
      item.snippet.title?.toLowerCase() !== "private video" &&
      item.snippet.thumbnails?.default
  );
};

export const filterByTeam = (items, teamKeyword) => {
  if (!teamKeyword || teamKeyword === "Unknown") return items;
  return items.filter((item) =>
    item.snippet.title?.toLowerCase().includes(teamKeyword.toLowerCase())
  );
};
