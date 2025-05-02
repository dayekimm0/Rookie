import styled from "styled-components";
import RankingTable from "../components/Home/RankingTable";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--bg);
  color: #fff;
`;

const Home = () => {
  return (
    <Container>
      Home 폰트 테스트
      <RankingTable />
    </Container>
  );
};

export default Home;
