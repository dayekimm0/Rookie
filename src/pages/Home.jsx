import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import styled from "styled-components";
import RankingTable from "../components/Home/RankingTable";
import MainSlide from "../components/Home/MainSlide";
import MyhomeMainSlide from "../components/Home/MyhomeMainSlide";
import bannerStrike from "../images/banners/banner-strike.png";
import bannerStrike_m from "../images/banners/bannerStrike_mh.png";
import PlaySlide from "../components/Home/PlaySlide";
import HomeList from "../components/Home/HomeList";
import HighlightSlide from "../components/Home/HighlightSlide";
import PopularPlayer from "../components/Home/PopularPlayer";
import CollaboBanner from "../components/Home/CollaboBanner";
import HomeProducts from "../components/Home/HomeProducts";

const Container = styled.div`
  width: 100%;
  background: var(--bg);
  color: var(--light);

  .home_products {
    width: 1240px;
    margin: 0 auto;
    .brandGo {
      svg {
        stroke: var(--light);
      }
    }
  }
  @media screen and (max-width: 1440px) {
    .home_products {
      width: 100%;
      padding: 0 5%;
    }
  }
  @media screen and (max-width: 1024px) {
    .home_products {
      width: 100%;
      padding: 0 3%;
    }
  }
  @media screen and (max-width: 500px) {
    .home_products {
      width: 100%;
      padding: 0 15px;
    }
  }
`;

const ProductCardWrap = styled.div`
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

const Banner = styled.div`
  margin-top: 40px;
  img {
    width: 100%;
    max-width: 100%;
    &:nth-of-type(1) {
      display: block;
    }
    &:nth-of-type(2) {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 35px;
    img {
      &:nth-of-type(1) {
        display: none;
      }
      &:nth-of-type(2) {
        display: block;
      }
    }
  }
`;

const Home = () => {
  const [isMyhome, setIsMyhome] = useState("");
  const loginMhhomeCheck = async () => {
    const user = auth.currentUser;

    if (!user) return;
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.favoriteTeam) {
          const myhomeTeam = userData.favoriteTeam;
          setIsMyhome("두산 베어스"); //회원가입 수정되면 myhomeTeam 으로 넣기!!
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loginMhhomeCheck();
  }, []);

  return (
    <Container>
      {isMyhome !== "" && isMyhome !== null ? (
        <MyhomeMainSlide isMyhome={isMyhome} />
      ) : (
        <MainSlide />
      )}
      <Banner className="inner">
        <img src={bannerStrike} alt="banner" />
        <img src={bannerStrike_m} alt="banner" />
      </Banner>
      <HighlightSlide />
      <PlaySlide />
      <HomeList />
      <RankingTable />
      <PopularPlayer />
      <CollaboBanner />
      <div className="home_products">
        <ProductCardWrap>
          <h3>Season 콜라보</h3>
          <HomeProducts />
        </ProductCardWrap>
        <ProductCardWrap>
          <h3>New 신상품</h3>
          <HomeProducts />
        </ProductCardWrap>
        <ProductCardWrap>
          <h3>Best 인기상품</h3>
          <HomeProducts />
        </ProductCardWrap>
      </div>
    </Container>
  );
};

export default Home;
