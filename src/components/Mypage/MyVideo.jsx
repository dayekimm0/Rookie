import styled from "styled-components";
import MySlideTabNav from "../MypageSlides/MySlideTabNav";
import { Outlet } from "react-router-dom";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 1024px) {
    h3 {
      font-size: 2.5rem;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 2rem;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 6px;
    h3 {
      font-size: 1.6rem;
      margin-bottom: 15px;
    }
  }
`;

const MyVideo = () => {
  return (
    <>
      <Title>
        <h3>좋아요 표시한 동영상</h3>
      </Title>
      <MySlideTabNav />
      <Outlet />
    </>
  );
};

export default MyVideo;
