import { useEffect, useState } from "react";
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
import ProductCard from "../components/ProductCard";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const Container = styled.div`
  width: 100%;
  background: var(--bg);
  color: #fff;

  .main_cardList {
    .brandGo {
      svg {
        stroke: var(--light);
      }
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
      <div className="main_cardList">
        <ProductCard />
      </div>
    </Container>
  );
};

export default Home;
