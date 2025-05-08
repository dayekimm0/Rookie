import styled from "styled-components";
import { getEmblem } from "../../util";

const Card = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  .head {
    padding: 15px 10px;
    font-weight: 300;
    background: var(--dark);
    position: relative;
    display: flex;
    justify-content: center;
    ul {
      width: 80%;
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80px;
          margin-bottom: 6px;
        }
      }
    }
    .timetable {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 1.3;
      font-size: 1.6rem;
      .ground {
        font-size: 1.4rem;
        color: var(--grayD);
      }
    }
  }
  .video {
    background: #fff;
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
  }
`;

const MainCard = () => {
  return (
    <Card>
      <div className="head">
        <ul>
          <li className="teams">
            <img src={getEmblem(4)} alt="doosan" />
            <p>두산</p>
          </li>
          <li className="teams">
            <img src={getEmblem(4)} alt="doosan" />
            <p>두산</p>
          </li>
        </ul>
        <div className="timetable">
          <p className="date">4월 22일 (화)</p>
          <p className="time">18:30 예정</p>
          <p className="ground">고척</p>
        </div>
      </div>
      <div className="video"></div>
    </Card>
  );
};

export default MainCard;
