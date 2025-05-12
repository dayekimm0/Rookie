import styled from "styled-components";
import RankingTable from "../components/Home/RankingTable";
import MainSlide from "../components/Home/MainSlide";

const Container = styled.div`
  padding-top: 220px;
  width: 100%;
  height: 100vh;
  background: var(--bg);
  color: #fff;
`;

const Home = () => {
  return (
    <Container>
      <MainSlide />
      <RankingTable />
    </Container>
  );
};

export default Home;
