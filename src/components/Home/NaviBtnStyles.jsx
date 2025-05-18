import styled from "styled-components";

export const NaviLeftBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 5%;
  height: 100%;
  background: linear-gradient(90deg, #222 0%, rgba(255, 255, 255, 0) 100%);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;
  img {
    transform: rotate(-180deg);
    margin-right: 10px;
    display: inline-block;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 3.5%;
    img {
      margin-right: 0px;
      width: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 4%;
    img {
      width: 10px;
    }
  }
`;

export const NaviRightBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 5%;
  height: 100%;
  background: linear-gradient(-90deg, #222 0%, rgba(255, 255, 255, 0) 100%);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;
  img {
    margin-left: 10px;
    display: inline-block;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 3.5%;
    img {
      margin-left: 0px;
      width: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 4%;
    img {
      width: 10px;
    }
  }
`;

export const MyhomeNaviLeftBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0;
  height: 5%;
  width: 100%;
  transform: translateY(-105%);
  /* background: linear-gradient(-180deg, #111 0%, rgba(255, 255, 255, 0) 100%); */
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;
  img {
    transform: rotate(-90deg);
    display: inline-block;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 3.5%;
    height: 100%;
    background: linear-gradient(90deg, #222 0%, rgba(255, 255, 255, 0) 100%);
    transform: none;
    img {
      transform: rotate(-180deg);
      margin-right: 0px;
      width: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 4%;
    img {
      width: 10px;
    }
  }
`;

export const MyhomeNaviRightBtn = styled.button`
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  height: 8%;
  width: 100%;
  background: linear-gradient(0deg, #222 0%, rgba(255, 255, 255, 0) 100%);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};
  cursor: pointer;
  img {
    transform: rotate(90deg);
    display: inline-block;
    margin-top: 10px;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 3.5%;
    height: 100%;
    background: linear-gradient(-90deg, #222 0%, rgba(255, 255, 255, 0) 100%);
    img {
      transform: rotate(0deg);
      margin-left: 0px;
      width: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 4%;
    img {
      width: 10px;
    }
  }
`;
