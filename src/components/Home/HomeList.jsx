import React from "react";
import styled from "styled-components";
import { getEmblem } from "../../util";

const Container = styled.div`
  margin-top: 120px;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    h3 {
      font-size: 2rem;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 50px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  }
`;

const Lists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    width: 10%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  @media screen and (max-width: 1024px) {
    li {
      width: 20%;
      padding: 10px;
    }
  }

  @media screen and (max-width: 500px) {
    li {
      width: 20%;
      padding: 2px;
    }
  }
`;

const HomeList = () => {
  return (
    <Container className="inner">
      <div>
        <h3>구단 홈 바로가기</h3>
      </div>
      <Lists>
        <li>
          <img src={getEmblem(1)} alt="kia" />
        </li>
        <li>
          <img src={getEmblem(2)} alt="samsung" />
        </li>
        <li>
          <img src={getEmblem(3)} alt="lg" />
        </li>
        <li>
          <img src={getEmblem(4)} alt="kt" />
        </li>
        <li>
          <img src={getEmblem(5)} alt="kia" />
        </li>
        <li>
          <img src={getEmblem(6)} alt="kia" />
        </li>
        <li>
          <img src={getEmblem(7)} alt="kia" />
        </li>
        <li>
          <img src={getEmblem(8)} alt="kia" />
        </li>
        <li>
          <img src={getEmblem(9)} alt="kia" />
        </li>
        <li>
          <img src={getEmblem(10)} alt="kia" />
        </li>
      </Lists>
    </Container>
  );
};

export default HomeList;
