// 팀별 고정 유튜브 영상 매핑
export const TEAM_STORE_VIDEOS = {
  kia_tgs: {
    videoId: "Kl1B4sdnc7Y",
  },
  ds_bas: {
    videoId: "lzo0LSavvsE",
  },
  ss_lns: {
    videoId: "qay9ukZ6Dcg",
  },
  lg_twins: {
    videoId: "vxv4fOU9tss",
  },
  kt_wiz: {
    videoId: "S-sTzPZmo8Y",
  },
  ssg_lds: {
    videoId: "USWDyn58YjE",
  },
  lt_gnt: {
    videoId: "EtgzlDXMWIE",
  },
  hw_egs: {
    videoId: "hVul3fIEBp4",
  },
  nc_dns: {
    videoId: "Lrp8G8Og4qo",
  },
  kw_hrs: {
    videoId: "rEpmoG5aJvY",
  },
};

// 팀 코드로 영상 정보 가져오기
export const getTeamStoreVideo = (teamCode) => {
  const result = TEAM_STORE_VIDEOS[teamCode] || null;
  return result;
};

// 유튜브 썸네일 URL 생성
export const getYoutubeThumbnail = (videoId, quality = "maxresdefault") => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
