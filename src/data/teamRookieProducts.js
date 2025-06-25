export const getTeamRookieProducts = (teamCode) => {
  const teamRookieProductsMap = {
    ds_bas: [0, 1, 2, 3],
    ssg_lds: [4, 5, 6, 7, 8, 9],
    nc_dns: [10, 11, 12, 13, 14, 15],
    lt_gnt: [16, 17, 18, 19, 20, 21],
    hw_egs: [22, 23, 24],
    lg_twins: [25, 26, 27, 28, 29],
    ss_lns: [30, 31, 32, 33],
    kia_tgs: [34, 35, 36, 37],
    kt_wiz: [38, 39, 40, 41],
    kw_hrs: [42, 43, 44],
  };

  return teamRookieProductsMap[teamCode] || [];
};
