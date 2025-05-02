import React from "react";
import styled from "styled-components";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid #f00;
  width: 100%;
  height: 180px;
  background: var(--main);
`;

const Header = () => {
  return <Container>Header</Container>;
};

export default Header;
