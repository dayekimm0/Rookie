import { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/logos/Rookie_logo.svg";

const Logo = styled.div`
  width: 130px;
  top: 50%;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  @media screen and (max-width: 1024px) {
    width: 100px;
  }
  @media screen and (max-width: 500px) {
    width: 80px;
  }
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderLogo = memo(() => {
  const navigate = useNavigate();
  const goToMain = () => navigate("/");

  return (
    <Logo onClick={goToMain}>
      <LogoImg src={logo} alt="rookielogo" />
    </Logo>
  );
});

export default HeaderLogo;
