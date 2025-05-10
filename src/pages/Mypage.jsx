import styled from "styled-components";
import profile_mok from "../images/mockup/mypage_profilemok.svg";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 100px;
`;

const UpBox = styled.div`
  width: 100%;
  height: 120px;
  border: 1px solid var(--gray3);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin: 70px 0 36px;
`;

const UpBoxLeft = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Profile = styled.img`
  width: 60px;
`;

const UpBoxTitle = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  span {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;
const UpBoxSub = styled.span`
  font-size: 1.2rem;
  color: var(--gray6);
  cursor: pointer;
`;

const MyShopping = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
`;

const MyShoppingTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
`;

const MyShoppingInner = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  gap: 60px;
`;

const MyShoppingDetail = styled.h6`
  font-size: 1.2rem;
  line-height: 2.5;
  b {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
  }
`;

const MyShoppingLine = styled.span`
  width: 1px;
  height: 54px;
  background: var(--dark);
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyInfoTitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MyInfoLine = styled.span`
  width: 100%;
  height: 1px;
  background: var(--dark);
`;

const InfoElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 60px;
`;

const InfoDetail = styled.h4`
  font-size: 1.6rem;
  line-height: 2;
  b {
    font-size: 1.8rem;
    font-weight: 700;
  }
`;

const InfoButton = styled.button`
  width: 80px;
  height: 40px;
  background: var(--dark);
  color: var(--light);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: var(--gray3);
  }
`;

const Delete = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  h6 {
    margin-top: 17px;
    font-size: 1.2rem;
    color: var(--gray8);
    cursor: pointer;
  }
  h6:hover + span {
    opacity: 1;
  }
`;

const DeleteLine = styled.span`
  width: 66px;
  height: 1px;
  background: var(--gray8);
  margin-top: 2px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const Mypage = () => {
  return (
    <Container>
      <Inner>
        <UpBox>
          <UpBoxLeft>
            <Profile src={profile_mok} alt={profile_mok} />
            <UpBoxTitle>
              갓효바
              <br />
              <span>계정 생성일 2025.04.23</span>
            </UpBoxTitle>
          </UpBoxLeft>
          <UpBoxSub>구단변경 ›</UpBoxSub>
        </UpBox>
        <MyShopping>
          <MyShoppingTitle>마이 쇼핑</MyShoppingTitle>
          <MyShoppingInner>
            <MyShoppingDetail>
              <b>2</b>
              <br />
              장바구니
            </MyShoppingDetail>
            <MyShoppingLine />
            <MyShoppingDetail>
              <b>1</b>
              <br />
              구매완료
            </MyShoppingDetail>
            <MyShoppingLine />
            <MyShoppingDetail>
              <b>0</b>
              <br />
              배송완료
            </MyShoppingDetail>
            <MyShoppingLine />
            <MyShoppingDetail>
              <b>0</b>
              <br />
              쿠폰
            </MyShoppingDetail>
          </MyShoppingInner>
        </MyShopping>
        <MyInfo>
          <MyInfoTitle>계정 상세정보</MyInfoTitle>
          <MyInfoLine style={{ marginBottom: "40px" }} />
          <InfoElement>
            <InfoDetail>
              <b> 이메일</b>
              <br />
              j******k@daum.net
            </InfoDetail>
            <InfoButton>변경</InfoButton>
          </InfoElement>
          <InfoElement>
            <InfoDetail>
              <b> 비밀번호</b>
              <br />
              *********
            </InfoDetail>
            <InfoButton>변경</InfoButton>
          </InfoElement>
          <InfoElement>
            <InfoDetail>
              <b> 닉네임</b>
              <br />
              갓효바
            </InfoDetail>
            <InfoButton>변경</InfoButton>
          </InfoElement>
          <MyInfoLine />
          <Delete>
            <h6>계정 삭제하기</h6>
            <DeleteLine />
          </Delete>
        </MyInfo>
      </Inner>
    </Container>
  );
};

export default Mypage;
