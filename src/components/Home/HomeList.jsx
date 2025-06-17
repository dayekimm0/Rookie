import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getEmblem, getTeamJsonCode } from "../../util";

const Container = styled.div`
  margin-top: 120px;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 100px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 50px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
  }
`;

const Lists = styled.ul`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;

  li {
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      background: #1d1d1d;
      border-radius: 8px;
      border: 1px solid #1d1d1d;
      transition: border 0.3s, background 0.3s;
      overflow: hidden;
      img {
        width: 100%;
      }

      &:hover {
        background: var(--gray2);
        border: 1px solid #444;
      }
    }
  }
  @media screen and (max-width: 1440px) {
    gap: 8px;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    li {
      a {
        padding: 8px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    li {
      a {
        padding: 0px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    gap: 6px;
  }
`;

const lists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const HomeList = ({ title }) => {
  const location = useLocation();

  const currentTeamCode = location.pathname.startsWith("/teamhome")
    ? location.pathname.split("/")[2]
    : null;

  const filteredLists = currentTeamCode
    ? lists.filter((id) => getTeamJsonCode(id) !== currentTeamCode)
    : lists;

  return (
    <Container className="inner">
      <div>
        <h3>{title}</h3>
      </div>
      <Lists>
        {filteredLists.map((number) => (
          <li key={`teamhomeList${number}`}>
            <Link to={`/teamhome/${getTeamJsonCode(number)}`}>
              <img src={getEmblem(number)} alt="teamEmblem" />
            </Link>
          </li>
        ))}
      </Lists>
    </Container>
  );
};

export default HomeList;
