import { fetchPlaylistVideos } from "./useYoutubeContentList";

export const fetchTeamPlaylists = async (playlists) => {
  try {
    const results = await Promise.all(
      playlists.map(async ({ playlistId, max, name }) => {
        const videos = await fetchPlaylistVideos(playlistId, max);
        return videos.map((video) => ({
          ...video,
          teamName: name,
          channelTitle: name,
        }));
      })
    );

    return results.flat();
  } catch (err) {
    console.error("팀플레이 영상 패치 에러:", err);
    return [];
  }
};
