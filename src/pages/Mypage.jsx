import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import authStore from "../stores/AuthStore";
import { Outlet } from "react-router-dom";
import coupon from ".././images/icons/coupon.svg";
import thumbs_up from ".././images/icons/thumbs-up.svg";
import { getTeamColor, getEmblem } from ".././util";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--light);
  margin: 50px 0 20px;
  gap: 96px;
  @media screen and (max-width: 600px) {
    padding: 0 15px;
  }
`;

const LeftInner = styled.div`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RightInner = styled.div`
  width: 944px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
    width: 480px;
  }
  @media screen and (max-width: 600px) {
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
  h4 {
    font-size: 2.4rem;
    line-height: 1.5;
    font-weight: 700;
  }
  h6 {
    font-size: 1.6rem;
    color: var(--gray6);
  }
  & > span {
    width: 86%;
    height: 1px;
    background: var(--gray1);
    margin: 26px 0;
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
    width: 100px;
    height: 100px;
  }
`;

const ProfileUnder = styled.div`
  display: flex;
  gap: 60px;
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
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    span {
      width: 100%;
      height: 1px;
      background: var(--grayD);
    }
  }
`;

const NavItem = styled.li`
  margin-right: 10px;
  font-size: 1.8rem;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  cursor: pointer;
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
  const navigate = useNavigate();
  const location = useLocation();
  const TeamEmblem = ({ emblemId }) => {
    const emblem = getEmblem(emblemId);
    return emblem ? <img src={emblem} alt="Team Emblem" /> : <p>엠블럼 없음</p>;
  };

  const menuItem = [
    { path: "/mypage", label: "나의 쇼핑" },
    { path: "/mypage/myvideo", label: "나의 동영상" },
    { path: "/mypage/mysetting", label: "세팅" },
  ];

  const { isLoading } = authStore();

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
            {location.pathname === "/mypage/mysetting" ? null : (
              <Profile>
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

                <h4>갓효바</h4>
                <h6>삼성 라이온즈</h6>
                <span />
                <ProfileUnder>
                  <Icon>
                    <img src={coupon} alt="coupon" />
                    <p>내 쿠폰</p>
                    <span>3</span>
                  </Icon>
                  <Icon>
                    <img src={thumbs_up} alt="thumbs_up" />
                    <p>좋아요</p>
                    <span>132</span>
                  </Icon>
                </ProfileUnder>
              </Profile>
            )}

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
    </Container>
  );
};
export default Mypage;
