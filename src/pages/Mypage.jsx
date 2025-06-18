import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import authStore from "../stores/AuthStore";
import MyCoupon from "../components/Mypage/MyCouponModal";
import coupon from ".././images/icons/coupon.svg";
import partnerLogo from ".././images/logos/Partner_Logo.svg";
import thumbs_up from ".././images/icons/thumbs-up.svg";
import { getTeamColor, getEmblem } from ".././util";

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: var(--light);
  padding: 50px 40px 0;
  gap: 96px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 40px 30px 0;
    gap: 34px;
  }
  @media screen and (max-width: 500px) {
    padding: 0 15px;
    flex-direction: column;
    gap: 14px;
  }
`;

const LeftInner = styled.div`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media screen and (max-width: 1024px) {
    width: 230px;
  }
  @media screen and (max-width: 768px) {
    width: 180px;
  }
  @media screen and (max-width: 600px) {
    width: 160px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 24px;
  }
`;

const RightInner = styled.div`
  max-width: 944px;
  width: calc(100% - 376px);
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    width: calc(100% - 264px);
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 214px);
  }
  @media screen and (max-width: 600px) {
    width: calc(100% - 194px);
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Profile = styled.div`
  width: 100%;
  height: 370px;
  border: 1px solid var(--grayD);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .userName {
    h4 {
      font-size: 2.4rem;
      line-height: 1.5;
      font-weight: 700;
      text-align: center;
    }
    .favoriteTeam {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 5px;
      h6 {
        font-size: 1.6rem;
        text-align: center;
        color: var(--gray6);
      }
    }
  }
  & > span {
    width: 86%;
    height: 1px;
    background: var(--gray1);
    margin: 26px 0;
  }
  @media screen and (max-width: 1024px) {
    height: 296px;
    .userName {
      h4 {
        font-size: 2.2rem;
      }
      h6 {
        font-size: 1.2rem;
      }
    }
    & > span {
      margin: 21px 0;
    }
  }
  @media screen and (max-width: 500px) {
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    border: none;
    .user {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .userName {
      margin-left: 20px;
      margin-bottom: 20px;
      h4 {
        font-size: 1.8rem;
        text-align: start;
      }
      h6 {
        font-size: 1.2rem;
      }
    }
    & > span {
      display: none;
    }
  }
`;

const UserTeam = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 16px;
  img {
    width: 100%;
    scale: ${({ $isTeam6 }) => ($isTeam6 ? "80%" : "100%")};
    height: 100%;
    object-fit: cover;
    overflow: visible;
  }
  @media screen and (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }
  @media screen and (max-width: 500px) {
    width: 58px;
    height: 58px;
    border-radius: 4px;
  }
`;

const ProfileUnder = styled.div`
  display: flex;
  gap: 60px;
  @media screen and (max-width: 1024px) {
    gap: 50px;
  }
  @media screen and (max-width: 500px) {
    gap: 0px;
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  img {
    width: 30px;
  }
  p {
    font-size: 1.2rem;
    color: var(--gray6);
  }
  span {
    font-weight: bold;
  }
  @media screen and (max-width: 1024px) {
    img {
      width: 24px;
    }
    p {
      font-size: 1rem;
    }
    span {
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 500px) {
    width: 80px;
    span {
      font-size: 1.2rem;
    }
  }
`;

const Nav = styled.div`
  width: 100%;
  height: 240px;
  border: 1px solid var(--grayD);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: start;
  ul {
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    span {
      width: 100%;
      height: 1px;
      background: var(--grayD);
    }
  }
  @media screen and (max-width: 1024px) {
    height: 192px;
    ul {
      gap: 16px;
    }
  }
  @media screen and (max-width: 500px) {
    height: 42px;
    justify-content: center;
    border: none;
    border-radius: 0;
    border-top: 1px solid var(--grayD);
    border-bottom: 1px solid var(--grayD);
    ul {
      width: auto;
      flex-direction: row;
      gap: 58px;
    }
    span {
      display: none;
    }
  }
`;

const NavItem = styled.li`
  margin-right: 10px;
  font-size: 1.8rem;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    margin-right: 8px;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
    margin-right: 0px;
  }
`;

const SlideLoaderWrapper = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    height: 320px;
  }

  @media screen and (max-width: 768px) {
    height: 300px;
  }

  @media screen and (max-width: 500px) {
    height: 250px;
  }
`;

const SvgSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;

  .path {
    stroke: var(--main);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const teamToEmblemId = {
  "기아 타이거즈": "1",
  "삼성 라이온즈": "2",
  "LG 트윈스": "3",
  "두산 베어스": "4",
  "KT 위즈": "5",
  "SSG 랜더스": "6",
  "롯데 자이언츠": "7",
  "한화 이글스": "8",
  "NC 다이노스": "9",
  "키움 히어로즈": "10",
};

const Mypage = () => {
  const { userProfile } = authStore();
  const [modalState, setModalState] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  const menuItem = [
    { path: "/mypage", label: "나의 쇼핑" },
    { path: "/mypage/myvideo", label: "나의 동영상" },
    { path: "/mypage/mysetting", label: "프로필 설정" },
  ];

  const myCouponOpen = () => {
    setModalState((prev) => !prev);
  };

  const goVideo = () => navigate("/mypage/myvideo");

  const { isLoading } = authStore();

  useEffect(() => {
    const fetchWonCoupons = async () => {
      if (!userProfile?.uid) return;

      const db = getFirestore();
      const WonCouponsRef = collection(
        db,
        "users",
        userProfile.uid,
        "wonCoupons"
      );

      try {
        const snapshot = await getDocs(WonCouponsRef);
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoupons(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWonCoupons();
  }, [userProfile]);

  console.log(coupons);

  return (
    <Container>
      {isLoading ? (
        <SlideLoaderWrapper>
          <SvgSpinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            />
          </SvgSpinner>
        </SlideLoaderWrapper>
      ) : (
        <>
          <LeftInner>
            <Profile>
              <div className="user">
                <UserTeam
                  $isTeam6={teamToEmblemId[userProfile.favoriteTeam] === "6"}
                  style={{
                    backgroundColor: getTeamColor(
                      teamToEmblemId[userProfile.favoriteTeam] || "#fff"
                    ),
                  }}
                >
                  <TeamEmblem
                    emblemId={teamToEmblemId[userProfile.favoriteTeam] || "2"}
                  />
                </UserTeam>

                <div className="userName">
                  <h4>{userProfile.nickname}</h4>
                  <div className="favoriteTeam">
                    <h6>{userProfile.favoriteTeam}</h6>
                    {userProfile.email === "gosim@naver.com" ||
                    userProfile.email === "mangom@daum.net" ? (
                      <img src={partnerLogo} alt="" />
                    ) : null}
                  </div>
                </div>
              </div>
              <span />
              <ProfileUnder>
                <Icon onClick={myCouponOpen}>
                  <img src={coupon} alt="coupon" />
                  <p>내 쿠폰</p>
                  <span>{coupons.length + 1}</span>
                </Icon>
                <Icon onClick={goVideo}>
                  <img src={thumbs_up} alt="thumbs_up" />
                  <p>좋아요</p>
                  <span>132</span>
                </Icon>
              </ProfileUnder>
            </Profile>

            <Nav>
              <ul>
                {menuItem.map((item, index) => (
                  <React.Fragment key={item.path}>
                    <NavItem
                      $isActive={location.pathname === item.path}
                      onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </NavItem>
                    {index < menuItem.length - 1 && <span />}
                  </React.Fragment>
                ))}
              </ul>
            </Nav>
          </LeftInner>
          <RightInner>
            <Outlet />
          </RightInner>
        </>
      )}
      <MyCoupon
        coupons={coupons}
        isOpen={modalState}
        closeModal={() => setModalState(false)}
      />
    </Container>
  );
};
export default Mypage;
