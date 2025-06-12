import styled from "styled-components";

const Container = styled.div`
  width: 30.5%;
  position: sticky;
  top: 100px;
  background: #191919;
  border-radius: 20px;
  padding: 68px 20px;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const InfProfileCard = () => {
  return (
    <Container>
      <div className="profileImg"></div>
      <div></div>
    </Container>
  );
};

export default InfProfileCard;
