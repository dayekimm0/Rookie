import emblem_kbo from "./images/emblem/emblem_kbo.svg";
import emblem_kiaT from "./images/emblem/emblem_kiaT.svg";
import emblem_samsungL from "./images/emblem/emblem_samsungL.svg";
import emblem_lgT from "./images/emblem/emblem_lgT.svg";
import emblem_doosanB from "./images/emblem/emblem_doosanB.svg";
import emblem_ktW from "./images/emblem/emblem_ktW.svg";
import emblem_ssgL from "./images/emblem/emblem_ssgL.svg";
import emblem_lotteG from "./images/emblem/emblem_lotteG.svg";
import emblem_hanwhaE from "./images/emblem/emblem_hanwhaE.svg";
import emblem_ncD from "./images/emblem/emblem_ncD.svg";
import emblem_kiwoomH from "./images/emblem/emblem_kiwoomH.svg";
import games from "./data/kbo_2025_may_mock.json";

export const getEmblem = (code) => {
  const targetEmblem = String(code);

  switch (targetEmblem) {
    case "0":
      return emblem_kbo;
    case "1":
      return emblem_kiaT;
    case "2":
      return emblem_samsungL;
    case "3":
      return emblem_lgT;
    case "4":
      return emblem_doosanB;
    case "5":
      return emblem_ktW;
    case "6":
      return emblem_ssgL;
    case "7":
      return emblem_lotteG;
    case "8":
      return emblem_hanwhaE;
    case "9":
      return emblem_ncD;
    case "10":
      return emblem_kiwoomH;
    default:
      return null;
  }
};

export const getTeamName = (code) => {
  const target = String(code);

  switch (target) {
    case "0":
      return "KBO";
    case "1":
      return "KIA";
    case "2":
      return "삼성";
    case "3":
      return "LG";
    case "4":
      return "두산";
    case "5":
      return "KT";
    case "6":
      return "SSG";
    case "7":
      return "롯데";
    case "8":
      return "한화";
    case "9":
      return "NC";
    case "10":
      return "키움";
    default:
      return "Unknown";
  }
};

export const getTeamColor = (code) => {
  const target = String(code);

  switch (target) {
    case "0":
      return "#fff";
    case "1":
      return "#C9CACA";
    case "2":
      return "#094299";
    case "3":
      return "#C30136";
    case "4":
      return "#000038";
    case "5":
      return "#000000";
    case "6":
      return "#C8102E";
    case "7":
      return "#022344";
    case "8":
      return "#FC4E00";
    case "9":
      return "#071D3D";
    case "10":
      return "#820024";
    default:
      return "Unknown";
  }
};

export function getTodayMatches() {
  const today = new Date().toISOString().split("T")[0];
  const gameDay = games.find((d) => d.date >= today) || games[0];
  return {
    date: gameDay.date,
    day: gameDay.day,
    matches: gameDay.matches,
  };
}

export const getTeamShortName = (fullName) => {
  switch (fullName) {
    case "기아타이거즈":
      return "KIA";
    case "삼성라이온즈":
      return "삼성";
    case "엘지트윈스":
      return "LG";
    case "두산베어스":
      return "두산";
    case "케이티위즈":
      return "KT";
    case "쓱랜더스":
      return "SSG";
    case "롯데자이언츠":
      return "롯데";
    case "한화이글스":
      return "한화";
    case "엔씨다이노스":
      return "NC";
    case "키움히어로즈":
      return "키움";
    default:
      return null;
  }
};

// export const getTeamShortName = (fullName) => {
//   switch (fullName) {
//     case "기아 타이거즈":
//       return "KIA";
//     case "삼성 라이온즈":
//       return "삼성";
//     case "LG 트윈스":
//       return "LG";
//     case "두산 베어스":
//       return "두산";
//     case "KT 위즈":
//       return "KT";
//     case "SSG 랜더스":
//       return "SSG";
//     case "롯데 자이언츠":
//       return "롯데";
//     case "한화 이글스":
//       return "한화";
//     case "NC 다이노스":
//       return "NC";
//     case "키움 히어로즈":
//       return "키움";
//     default:
//       return null;
//   }
// };
