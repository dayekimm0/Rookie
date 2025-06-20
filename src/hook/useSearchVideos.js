import { playContents } from "../data/playcontents";
import { fetchPlaylistVideos } from "../hook/useYoutubeContentList";

export const fetchAllVideos = async () => {
  try {
    const allVideos = [];
    const fetchPromises = [];

    for (const content of Object.values(playContents)) {
      if (content.type === "highlight" || content.type === "rookieclip")
        continue;

      if (Array.isArray(content.playlists)) {
        for (const playlist of content.playlists) {
          fetchPromises.push(
            fetchPlaylistVideos(playlist.playlistId, playlist.max || 10).then(
              (rawVideos) =>
                rawVideos.map((item) => ({
                  title: item.title || "",
                  description: item.description || "",
                  videoId: item.id || "",
                  thumbnail: item.thumbnail || "",
                }))
            )
          );
        }
      } else if (content.playlistId) {
        fetchPromises.push(
          fetchPlaylistVideos(content.playlistId, content.max || 10).then(
            (rawVideos) =>
              rawVideos.map((item) => ({
                title: item.title || "",
                description: item.description || "",
                videoId: item.id || "",
                thumbnail: item.thumbnail || "",
              }))
          )
        );
      }
    }

    const fetchedArrays = await Promise.all(fetchPromises);
    fetchedArrays.forEach((arr) => allVideos.push(...arr));

    return allVideos;
  } catch (error) {
    console.error("전체 영상 불러오기 실패:", error);
    return [];
  }
};
