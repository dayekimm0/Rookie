import styled from "styled-components";
import LogonRookielogo from "../../images/logos/Logon_Rookie_logo.svg";

const ListMiddle = styled.div`
  height: 360px;
  position: relative;
  @media screen and (max-width: 1024px) {
    height: 270px;
  }
  @media screen and (max-width: 500px) {
    height: 170px;
  }
`;

const Listimg = styled.img`
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  @media screen and (max-width: 1024px) {
    width: 280px;
  }
  @media screen and (max-width: 768px) {
    width: 240px;
  }
`;

const NoItem = () => {
  return (
    <ListMiddle>
      <Listimg src={LogonRookielogo} alt="LogonRookielogo" />
    </ListMiddle>
  );
};

export default NoItem;
