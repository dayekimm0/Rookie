import React, { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getEmblem } from "../util";
import styled from "styled-components";
import headermockup from "../images/banners/banner-headermockup.png";
import logo from "../images/logos/Rookie_logo.svg";

const Container = styled.div`
  width: 100%;
  height: 180px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
  &.active {
    transform: translateY(-100%);
  }
`;

const HeaderGameList = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderMockup = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Nav = styled.div`
  width: 100%;
  height: 70px;
  padding: 0 5%;
  position: relative;
  background: var(--main);
`;

const Logo = styled.div`
  width: 130px;
  height: 40px;
  top: 50%;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Items = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  gap: 50px;
`;

const Item = styled.div`
  font-weight: 600;
  font-family: var(--Figtree);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Line = styled(motion.span)`
  width: 48px;
  height: 6px;
  left: 0;
  right: 0;
  bottom: -27px;
  margin: 0 auto;
  background: var(--dark);
  position: absolute;
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 96px;
  gap: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

const Emblem = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoreContainer = styled.div`
  width: 100%;
  height: 160px;
  top: 100px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
`;

const Stores = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  img {
    cursor: pointer;
    width: 130px;
    height: 80%;
    &:nth-of-type(1) {
      width: 120px;
      height: 86px;
    }
    &:nth-child(2) {
      width: 100px;
      height: 100px;
    }
  }
`;
const RookieEmblem = styled.img`
  width: 100px;
  height: 70px;
`;

const UserName = styled.p`
  font-weight: bold;
  font-family: var(--Pretendard);
`;

const User = styled.div`
  width: 260px;
  height: 300px;
  border-radius: 8px;
  border: 1px solid var(--gray6);
  background: var(--light);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  right: -3%;
  top: 54px;
  position: absolute;
  display: ${(props) => (props.$isopen ? "block" : "none")};
`;

const InfoBtn = styled.i`
  margin-left: 16px;
  cursor: pointer;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 30px 35px;
`;

const UserDesc = styled.div`
  width: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const UserId = styled.p`
  font-size: 2rem;
`;

const SelectTeam = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const UserTeam = styled.div`
  width: 60px;
  height: 60px;
  background: #0066b3;
  border-radius: 6px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Gnb = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
  padding: 26px 35px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = ({ isActive }) => {
  const main = useNavigate();
  const goToMain = () => {
    main("/");
  };
  const homeMatch = useMatch("/");
  const playMatch = useMatch("/play");
  const storeMatch = useMatch("/store");
  const eventMatch = useMatch("/event");

  // 토글 버튼을 누르면 유저 정보 오픈
  const [isopen, setIsOpen] = useState(false);
  const toggleUserBox = () => {
    setIsOpen((prev) => !prev);
  };

  // store 카테고리 오버하면 나오는 앰블럼
  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  return (
    <Container className={isActive ? "active" : ""}>
      <HeaderGameList>
        <HeaderMockup src={headermockup} alt="헤더목업" />
      </HeaderGameList>
      <Nav>
        <Logo onClick={goToMain}>
          <LogoImg src={logo} alt="rookielogo" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">HOME</Link>
            {homeMatch && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link to="/">PLAY</Link>
            {playMatch && <Line layoutId="line" />}
          </Item>
          <Item
            onMouseEnter={() => setIsStoreOpen(true)}
            onMouseLeave={() => setIsStoreOpen(false)}
          >
            <Link to="/store">STORE</Link>

            {storeMatch && <Line layoutId="line" />}
          </Item>
          <Item>
            <Link to="/event">EVENT</Link>
            {eventMatch && <Line layoutId="line" />}
          </Item>
        </Items>
        <Profile>
          <Emblem>
            <TeamEmblem emblemId="2" />
          </Emblem>
          <UserName>
            <Link to="/mypage">갓효바</Link>
            <InfoBtn className="info-btn" onClick={toggleUserBox}>
              {isopen ? "▼" : "▲"}
            </InfoBtn>
          </UserName>
          <User $isopen={isopen}>
            <UserInfo>
              <UserTeam>
                <TeamEmblem emblemId="2" />
              </UserTeam>
              <UserDesc>
                <UserId>갓효바</UserId>
                <SelectTeam>
                  구단을 선택해주세요 <i className="fas fa-chevron-right"></i>
                </SelectTeam>
              </UserDesc>
            </UserInfo>
            <hr />
            <Gnb>
              <Link to="/mypage">마이페이지</Link>
              <Link to="/cart">장바구니</Link>
              <Link to="/login">로그아웃</Link>
            </Gnb>
          </User>
        </Profile>
      </Nav>
      {isStoreOpen && (
        <StoreContainer
          onMouseEnter={() => setIsStoreOpen(true)}
          onMouseLeave={() => setIsStoreOpen(false)}
        >
          <Stores>
            <RookieEmblem
              src="./src/images/logos/emblem_rookie.png"
              alt="rookieemblem"
            />
            <TeamEmblem emblemId="0" />
            <TeamEmblem emblemId="1" />
            <TeamEmblem emblemId="2" />
            <TeamEmblem emblemId="3" />
            <TeamEmblem emblemId="4" />
            <TeamEmblem emblemId="5" />
            <TeamEmblem emblemId="6" />
            <TeamEmblem emblemId="7" />
            <TeamEmblem emblemId="8" />
            <TeamEmblem emblemId="9" />
          </Stores>
        </StoreContainer>
      )}
    </Container>
  );
};

export default Header;
