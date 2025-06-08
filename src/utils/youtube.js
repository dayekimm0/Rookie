import { teamPlaylists } from "../data/teamPlaylists";

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
          title.includes("KBO리그") &&
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

      return {
        ...game,
        highlightVideo: matchedVideo ?? null,
        videoId: matchedVideo?.snippet?.resourceId?.videoId ?? null,
        thumbnail: matchedVideo?.snippet?.thumbnails?.high?.url ?? null,
        homePlaylist: homePlaylistId,
        awayPlaylist: awayPlaylistId,
        nextVideos,
      };
    })
  );

  return matchedGames;
};
