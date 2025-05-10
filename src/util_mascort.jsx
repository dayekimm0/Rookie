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

export const getMascort = (mascortName) => {
  const targetMascort = String(mascortName);
  switch (targetMascort) {
    case "0":
      return mascort_doosan;
    case "1":
      return mascort_hanwha;
    case "2":
      return mascort_kia;
    case "3":
      return mascort_kiwoom;
    case "4":
      return mascort_kt;
    case "5":
      return mascort_lg;
    case "6":
      return mascort_lotte;
    case "7":
      return mascort_nc;
    case "8":
      return mascort_samsung;
    case "9":
      return mascort_ssg;
    default:
      return null;
  }
};
