const teamMap = {
  lg_twins: ["lg", "엘지", "엘지트윈스"],
  ds_bas: ["doosan", "두산", "두산베어스"],
  ssg_lds: ["ssg", "쓱", "에스에스지"],
  hw_egs: ["hanwha", "한화", "한화이글스"],
  kia_tgs: ["kia", "기아", "기아타이거즈", "타이거즈"],
  kt_wiz: ["kt", "케이티", "kt위즈"],
  nc_dns: ["nc", "엔씨", "엔씨다이노스", "ncdinos"],
  lt_gnt: ["lotte", "롯데", "롯데자이언츠"],
  kw_hrs: ["kiwoom", "키움", "키움히어로즈"],
  ss_lns: ["samsung", "삼성", "삼성라이온즈"],
};

const extractTeamCodes = (title) => {
  const lower = title.toLowerCase();
  return Object.entries(teamMap)
    .filter(([_, keywords]) => keywords.some((kw) => lower.includes(kw)))
    .map(([code]) => code);
};

const pickRandom = (arr, n) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export async function fetchClipProducts(title) {
  const teamCodes = extractTeamCodes(title);

  try {
    if (teamCodes.length === 0) {
      // 구단명이 없으면 kbo.json에서 2개 무작위로
      const res = await fetch(
        `https://rookiejson.netlify.app/teamJson/kbo.json`
      );
      const data = await res.json();
      return pickRandom(data, 2);
    }

    if (teamCodes.length === 1) {
      const res = await fetch(
        `https://rookiejson.netlify.app/teamJson/${teamCodes[0]}.json`
      );
      const data = await res.json();
      return pickRandom(data, 2);
    }

    // 여러 팀이면 팀별로 하나씩
    const fetches = teamCodes.map(async (teamCode) => {
      const res = await fetch(
        `https://rookiejson.netlify.app/teamJson/${teamCode}.json`
      );
      const data = await res.json();
      return pickRandom(data, 1)[0];
    });

    const results = await Promise.all(fetches);
    return results.filter(Boolean);
  } catch (err) {
    console.error("상품 로딩 실패:", err);
    return [];
  }
}
