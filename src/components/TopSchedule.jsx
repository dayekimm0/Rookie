import styled from "styled-components";
import ScheduleBox from "./ScheduleBox";
import scheduleData from "../data/gameList_final.json";
import useHeaderStore from "../stores/headerHeightStore";
import { useEffect, useState } from "react";
import lenis from "../lenisInstance";

const Container = styled.div`
  position: relative;
  z-index: 900;
  background: var(--dark);
  color: var(--light);
  width: 100%;
  max-height: ${({ $folded }) => ($folded ? "0px" : "110px")};
  overflow: hidden;
  ${({ $disableTransition }) =>
    !$disableTransition && "transition: max-height 0.4s ease;"}

  @media screen and (max-width: 1024px) {
    max-height: ${({ $folded }) => ($folded ? "0px" : "85px")};
  }
  @media screen and (max-width: 500px) {
    max-height: ${({ $folded }) => ($folded ? "0px" : "75px")};
  }
`;

const List = styled.div`
  margin: 0 5%;
  border-right: 1px solid var(--gray6);
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1440px) {
    & > div {
      &:first-of-type {
        display: none;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    margin: 0 3%;
  }
  @media screen and (max-width: 768px) {
    & > div {
      &:nth-of-type(3) {
        display: none;
      }
    }
    @media screen and (max-width: 500px) {
      margin: 0 15px;
    }
  }
`;

const XBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 1.5%;
  cursor: pointer;
  svg {
    width: 16px;
  }
  @media screen and (max-width: 1024px) {
    top: 8px;
    right: 0.8%;
    svg {
      width: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    top: 8px;
    right: 5%;
  }
  @media screen and (max-width: 500px) {
    top: 5px;
    right: 6%;
    svg {
      width: 11px;
    }
  }
`;

const OpenBtn = styled.div`
  position: fixed;
  top: ${({ $headerHeight }) => `${$headerHeight}px`};
  right: 0px;
  width: 50px;
  height: 25px;
  background: var(--main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 8px;
  svg {
    transform: rotate(90deg);
    position: relative;
    top: -3px;
  }
  @media screen and (max-width: 1024px) {
    width: 40px;
    height: 20px;
    svg {
      top: -3px;
      width: 7px;
    }
  }
`;

const TopSchedule = () => {
  const [scrollY, setScrollY] = useState(0);
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const unfold = useHeaderStore((state) => state.unfold);
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);
  const isScrollLocked = useHeaderStore((state) => state.isScrollLocked);
  const disableTransition = useHeaderStore((state) => state.disableTransition);
  const isManuallyClosed = useHeaderStore((state) => state.isManuallyClosed);
  const setScrollLocked = useHeaderStore((state) => state.setScrollLocked);

  const shouldFold =
    isManuallyClosed || isFolded || (isScrollLocked && scrollY > 2);

  const today = new Date().toISOString().split("T")[0];
  const baseIndex = scheduleData.findIndex((item) => item.date >= today);
  const safeIndex = baseIndex !== -1 ? baseIndex : scheduleData.length - 1;

  const threeDaySlice = [
    scheduleData[safeIndex - 1],
    scheduleData[safeIndex],
    scheduleData[safeIndex + 1],
  ].filter(Boolean);

  useEffect(() => {
    const updateScroll = ({ scroll }) => {
      setScrollY(scroll);
    };

    lenis.on("scroll", updateScroll);
    return () => {
      lenis.off("scroll", updateScroll);
    };
  }, []);

  const { setManuallyClosed } = useHeaderStore();
  const handleClose = () => {
    setManuallyClosed(true); // 수동으로 닫음
  };

  const handleReopen = () => {
    setManuallyClosed(false);
    setScrollLocked(false);
    unfold();
  };

  return (
    <>
      <Container $folded={shouldFold} $disableTransition={disableTransition}>
        <List>
          {threeDaySlice.map((day, index) => (
            <ScheduleBox key={index} schedule={day} />
          ))}
        </List>
        <XBtn onClick={handleClose}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1.28516 1.0636L17.1648 16.9432"
              stroke="#666666"
              strokeWidth="1.66667"
              strokeLinecap="round"
            />
            <path
              d="M17.165 1.05664L1.28543 16.9363"
              stroke="#666666"
              strokeWidth="1.66667"
              strokeLinecap="round"
            />
          </svg>
        </XBtn>
      </Container>
      {shouldFold && (
        <OpenBtn $headerHeight={headerHeight} onClick={handleReopen}>
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path
              d="M1.48926 1.98944L6.99982 7.5L1.48926 13.0106"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </OpenBtn>
      )}
    </>
  );
};

export default TopSchedule;
