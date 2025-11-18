import { memo } from "react";
import styled from "styled-components";

const FooterDesc = styled.div`
  margin-top: 45px;
  p {
    font-size: 1.6rem;
    line-height: 1.5;
    span {
      &::after {
        content: "|";
        display: inline-block;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }

  .copyright {
    font-size: 1.6rem;
    margin-top: 24px;
    line-height: 1.2;
  }

  @media screen and (max-width: 1024px) {
    margin-top: 30px;
    p {
      font-size: 1.2rem;
      .block1024 {
        display: block;
        &::after {
          display: none;
        }
      }
    }
    .copyright {
      font-size: 1.1rem;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 25px;
    p {
      .block768 {
        display: block;
        &::after {
          display: none;
        }
      }
    }
    .copyright {
      font-size: 1.1rem;
    }
  }
  @media screen and (max-width: 500px) {
    p {
      .block500 {
        display: block;
        &::after {
          display: none;
        }
      }
    }

    .copyright {
      font-size: 1rem;
    }
  }
`;

const FooterInfo = memo(() => {
  return (
    <FooterDesc>
      <p>상호명 : 주식회사 루키 | 대표 : 김다예, 장효아</p>
      <p>
        <span className="block768">사업자등록번호 : 123-45-67891 </span>
        <span className="block500">
          {" "}
          통신판매업신고번호 : 제2025-서울서초구-1234호{" "}
        </span>
        <span> 개인정보관리자 : 김다예</span>
      </p>
      <p>
        <span className="block768">E-MAIL : info@rookie.co.kr </span>
        <span className="block768">
          {" "}
          주소 : 서울 서초구 서초대로77길 41 대동2빌딩 9층
        </span>
      </p>
      <p>
        <span className="block1024">
          TEL : 02)532-1200 | FAX : 02)532-1203{" "}
        </span>
        <span className="block768"> 고객센터 : 1566-1234 평일 09시~17시 </span>
        <span className="block768"> 점심시간 13시~14시 주말 공휴일 휴무</span>
      </p>
      <h6 className="copyright">COPYRIGHT© ROOkie. ALL RIGHTS RESERVED</h6>
    </FooterDesc>
  );
});

export default FooterInfo;
