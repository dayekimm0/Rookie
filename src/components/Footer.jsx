import React from "react";
import styled from "styled-components";
import logo from "../images/logos/Rookie_Logo.svg";

const Container = styled.div`
  width: 100%;
  height: 370px;
`;

const Logo = styled.img``;

const Footer = () => {
  return (
    <Container>
      <Logo src={logo} />
    </Container>
  );
};

export default Footer;
