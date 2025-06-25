export const getTeamVideoProducts = (teamCode) => {
  const teamVideoProductsMap = {
    // 구단별 업로드할 상품 ID들
    ssg_lds: [0, 4, 31, 1, 2, 3, 7, 9, 99],
    ds_bas: [24, 32, 0, 4, 2, 5, 17, 25, 26, 27, 28],
    hw_egs: [44, 47, 54, 71, 70, 56, 57, 58, 68, 69],
    kw_hrs: [2, 1, 45, 0, 3, 15, 11, 10, 9],
    lg_twins: [36, 57, 58, 59, 60, 61, 62],
    lt_gnt: [3, 4, 5, 6, 21, 9, 27],
    nc_dns: [15, 14, 38, 7, 8, 0, 1, 12, 16, 19, 11],
    ss_lns: [31, 39, 40, 2, 29, 32, 33, 34, 35, 36, 37, 38],
    kia_tgs: [0, 1, 6, 4, 5, 51, 52, 30],
    kt_wiz: [87, 88, 10, 84],
  };

  return teamVideoProductsMap[teamCode] || [];
};
