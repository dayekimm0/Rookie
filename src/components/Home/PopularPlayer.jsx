import { useRef } from "react";
import styled from "styled-components";
import hanwha from "../../images/players/hanwha_Moon.jpg";
import doosan from "../../images/players/doosan_Kim.jpg";
import kia from "../../images/players/kia_Kim.jpg";
import ssg from "../../images/players/ssg_jo.jpg";
import kiwoom from "../../images/players/kiwoom_Song.jpg";
import samsung from "../../images/players/samsung_Gu.jpg";
import nc from "../../images/players/nc_Park.jpg";
import kt from "../../images/players/kt_Go.jpg";
import lg from "../../images/players/lg_Hong.jpg";
import lotte from "../../images/players/lotte_Yoon.jpg";
import useDragScroll from "../../hook/useDragScroll";
import { Link } from "react-router-dom";
import { getTeamJsonCode } from "../../util";

const Container = styled.div`
  margin-top: 120px;
  & > .inner {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 3rem;
      font-weight: 700;
    }

    .popular-list {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      li {
        width: 100%;
        max-width: 100%;
        & > a {
          display: block;
          max-width: 218px;
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          img {
            width: 100%;
          }

          .layout {
            display: flex;
            opacity: 0;
            visibility: hidden;
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            transition: all 0.3s;
            p {
              font-size: 1.6rem;
              text-align: center;
              line-height: 1.4;
              font-weight: 300;
              span {
                display: block;
                font-size: 2.4rem;
                font-weight: 600;
              }
            }
          }
          &:hover {
            .layout {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1500px) {
    & > .inner {
      flex-direction: column;
      gap: 30px;
      .popular-list {
        gap: 14px;
        li {
          & > a {
            max-width: 250px;
            margin: 0 auto;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    & > .inner {
      h3 {
        font-size: 2.5rem;
      }
      .popular-list {
        gap: 14px;
        li {
          & > a {
            .layout {
              p {
                font-size: 1.4rem;
                span {
                  font-size: 2rem;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    & > .inner {
      margin: 0;
      h3 {
        margin: 0 3%;
        font-size: 2rem;
      }
      .list_wrap.dragging {
        cursor: grabbing !important;
        user-select: none;
      }
      .list_wrap {
        width: 100%;
        overflow-x: auto;
        padding: 0 3%;
        cursor: grab;
        -webkit-overflow-scrolling: touch;
        &.dragging {
          cursor: grabbing;
          user-select: none;
        }

        &::-webkit-scrollbar {
          height: 6px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #bbb;
          border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
        scrollbar-color: #bbb transparent;
        scrollbar-width: auto;
      }
      .popular-list {
        display: inline-flex;
        gap: 16px;
        min-width: max-content;
        padding-right: 3%;
        li {
          flex: 0 0 auto;
          width: auto;

          & > a {
            width: calc(120px + 5vw);
            .layout {
              p {
                font-size: 1.4rem;
                span {
                  font-size: 2rem;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 500px) {
    margin-top: 60px;
    & > .inner {
      gap: 15px;
      h3 {
        font-size: 1.6rem;
        margin: 0 15px;
      }
      .list_wrap {
        padding: 0 15px;
      }
      .popular-list {
        padding-right: 15px;
        li {
          & > a {
            .layout {
              p {
                font-size: 1.2rem;
                span {
                  font-size: 1.6rem;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PopularPlayer = () => {
  const scrollRef = useRef();
  useDragScroll(scrollRef);

  return (
    <Container>
      <div className="inner">
        <h3>인기 선수</h3>
        <div className="list_wrap" ref={scrollRef}>
          <ul className="popular-list">
            <li>
              <Link to={`/store/${getTeamJsonCode(8)}`}>
                <img src={hanwha} alt="한화이글스 문동주" />
                <div className="layout">
                  <p>
                    한화이글스
                    <span>문동주</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(4)}`}>
                <img src={doosan} alt="두산베어스 김택연" />
                <div className="layout">
                  <p>
                    두산베어스
                    <span>김택연</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(1)}`}>
                <img src={kia} alt="기아타이거즈 김도영" />
                <div className="layout">
                  <p>
                    기아타이거즈
                    <span>김도영</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(6)}`}>
                <img src={ssg} alt="쓱랜더스 조병현" />
                <div className="layout">
                  <p>
                    쓱랜더스
                    <span>조병현</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(10)}`}>
                <img src={kiwoom} alt="키움히어로즈 송성문" />
                <div className="layout">
                  <p>
                    키움히어로즈
                    <span>송성문</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(2)}`}>
                <img src={samsung} alt="삼성라이온즈 구자욱" />
                <div className="layout">
                  <p>
                    삼성라이온즈
                    <span>구자욱</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(9)}`}>
                <img src={nc} alt="엔씨다이노스 박건우" />
                <div className="layout">
                  <p>
                    엔씨다이노스
                    <span>박건우</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(5)}`}>
                <img src={kt} alt="케이티위즈 고영표" />
                <div className="layout">
                  <p>
                    케이티위즈
                    <span>고영표</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(3)}`}>
                <img src={lg} alt="엘지트윈스 홍창기" />
                <div className="layout">
                  <p>
                    엘지트윈스
                    <span>홍창기</span>
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/store/${getTeamJsonCode(7)}`}>
                <img src={lotte} alt="롯데자이언츠 윤동희" />
                <div className="layout">
                  <p>
                    롯데자이언츠
                    <span>윤동희</span>
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default PopularPlayer;
