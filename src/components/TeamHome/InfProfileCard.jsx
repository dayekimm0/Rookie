import styled from "styled-components";
import lookMark from "../../images/icons/lookie_inf_mark.svg";

const Container = styled.div`
  width: 30.5%;
  position: sticky;
  top: 100px;
  background: #191919;
  border-radius: 20px;
  padding: 68px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .topProfile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 1280px) {
    width: 31.5%;
    padding: 50px 20px;
  }
  @media screen and (max-width: 1024px) {
    position: static;
    top: none;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 50px;
  }
  @media screen and (max-width: 1024px) {
    padding: 40px;
  }
  @media screen and (max-width: 600px) {
    padding: 30px;
    flex-direction: column;
  }
`;

const ProfileImg = styled.div`
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
    width: 88px;
  }
  @media screen and (max-width: 600px) {
    width: 66px;
  }
`;

const Name = styled.div`
  margin: 20px 0 10px;
  display: inline-block;
  position: relative;
  h4 {
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1.2;
  }
  .lookieMark {
    width: 20px;
    position: absolute;
    right: -30px;
    top: -3px;
  }
  @media screen and (max-width: 1280px) {
    h4 {
      font-size: 2.2rem;
    }
  }
  @media screen and (max-width: 1024px) {
    margin: 15px 0 8px;
    h4 {
      font-size: 2rem;
    }
    .lookieMark {
      width: 14px;
      right: -18px;
    }
  }
  @media screen and (max-width: 600px) {
    margin: 15px 0 8px;
    h4 {
      font-size: 1.5rem;
    }
    .lookieMark {
      width: 11px;
      right: -14px;
    }
  }
`;

const ItemsCount = styled.h5`
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.2;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Desc = styled.p`
  margin: 40px 0;
  line-height: 1.6;
  font-size: 1.6rem;
  font-weight: 200;
  width: 70%;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 1440px) {
    width: 90%;
    margin: 30px 0;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
    width: 40%;
  }
  @media screen and (max-width: 600px) {
    margin: 20px 0;
    font-size: 1.2rem;
    width: 80%;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  button {
    width: 120px;
    font-size: 1.6rem;
    border: none;
    background: var(--light);
    padding: 10px 20px;
    border-radius: 100px;
    font-weight: 700;
    cursor: pointer;
  }
  @media screen and (max-width: 1440px) {
    gap: 15px;
    button {
      width: 110px;
    }
  }
  @media screen and (max-width: 1280px) {
    gap: 15px;
    flex-direction: column;
    button {
      width: 120px;
    }
  }
  @media screen and (max-width: 1280px) {
    button {
      width: 110px;
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: row;
    button {
      width: 80px;
      font-size: 1.2rem;
      padding: 8px 14px;
    }
  }
`;

const InfProfileCard = () => {
  return (
    <Container>
      <div className="topProfile">
        <ProfileImg>
          <img src="" alt="Profile" />
        </ProfileImg>
        <Name>
          <h4>이름름</h4>
          <img className="lookieMark" src={lookMark} alt="lookiemark" />
        </Name>
        <ItemsCount>
          PLAY {}개 · STORE {}개
        </ItemsCount>
      </div>
      <Desc>
        3대째 이어지는 모태 두산팬이 야구장에서 사는 삶인데요..🐻 루키에서도
        함께 두산베어스를 응원합니다!많이 부족해도 이쁘게 봐주세요💙
      </Desc>
      <BtnGroup>
        <button>PLAY</button>
        <button>STORE</button>
      </BtnGroup>
    </Container>
  );
};

export default InfProfileCard;
