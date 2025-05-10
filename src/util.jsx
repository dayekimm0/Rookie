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
import mascort_doosan from "./images/mascort/mascort_doosanB.svg";
import mascort_hanwha from "./images/mascort/mascort_hanwhaE.svg";
import mascort_kia from "./images/mascort/mascort_kiaT.svg";
import mascort_kiwoom from "./images/mascort/mascort_kiwoomH.svg";
import mascort_kt from "./images/mascort/mascort_ktW.svg";
import mascort_lg from "./images/mascort/mascort_lgT.svg";
import mascort_lotte from "./images/mascort/mascort_lotteG.svg";
import mascort_nc from "./images/mascort/mascort_ncD.svg";
import mascort_samsung from "./images/mascort/mascort_samsungL.svg";
import mascort_ssg from "./images/mascort/mascort_ssgL.svg";

export const getEmblem = (emblemName, mascortName) => {
  const targetEmblem = String(emblemName);
  const targetMascort = String(mascortName);
  switch ((targetEmblem, targetMascort)) {
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
    case "11":
      return mascort_doosan;
    case "12":
      return mascort_hanwha;
    case "13":
      return mascort_kia;
    case "14":
      return mascort_kiwoom;
    case "15":
      return mascort_kt;
    case "16":
      return mascort_lg;
    case "17":
      return mascort_lotte;
    case "18":
      return mascort_nc;
    case "19":
      return mascort_samsung;
    case "20":
      return mascort_ssg;
    default:
      return null;
  }
};
