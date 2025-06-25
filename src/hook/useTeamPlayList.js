import { fetchPlaylistVideos } from "./useYoutubeContentList";

const fullNameToShort = {
  "기아 타이거즈": "KIA",
  "삼성 라이온즈": "삼성",
  "LG 트윈스": "LG",
  "두산 베어스": "두산",
  "KT 위즈": "KT",
  "SSG 랜더스": "SSG",
  "롯데 자이언츠": "롯데",
  "한화 이글스": "한화",
  "NC 다이노스": "NC",
  "키움 히어로즈": "키움",
};

export const fetchTeamPlaylists = async (playlists) => {
  try {
    const results = await Promise.all(
      playlists.map(async ({ playlistId, max, name }) => {
        const videos = await fetchPlaylistVideos(playlistId, max);
        const shortTeamName = fullNameToShort[name] || name;

        return videos.map((video) => ({
          ...video,
          teamName: shortTeamName,
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
