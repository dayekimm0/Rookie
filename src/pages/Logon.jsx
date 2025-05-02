import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  border: 1px solid #f00;
`;

const LogonTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;

const Logon = () => {
  return (
    <Container>
      <Inner>
        <LogonTitle>정보입력</LogonTitle>
      </Inner>
    </Container>
  );
};

export default Logon;
