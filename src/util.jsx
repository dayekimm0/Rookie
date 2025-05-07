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

export const getEmblem = (emblemName) => {
  const targetEmblem = String(emblemName);
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
