import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ScheduleBox from "./ScheduleBox";
import scheduleData from "../../data/gameList_final.json";
import useHeaderStore from "../../stores/headerHeightStore";
import lenis from "../../lenisInstance";
import { CloseButton, OpenButton } from "./TopScheduleButtons";

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

  will-change: max-height;
  contain: layout;

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

const TopSchedule = memo(() => {
  const [scrollY, setScrollY] = useState(0);
  const { setManuallyClosed } = useHeaderStore();
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const unfold = useHeaderStore((state) => state.unfold);
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);
  const isScrollLocked = useHeaderStore((state) => state.isScrollLocked);
  const disableTransition = useHeaderStore((state) => state.disableTransition);
  const isManuallyClosed = useHeaderStore((state) => state.isManuallyClosed);
  const setScrollLocked = useHeaderStore((state) => state.setScrollLocked);

  const shouldFold =
    isManuallyClosed || isFolded || (isScrollLocked && scrollY > 2);

  const threeDaySlice = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const baseIndex = scheduleData.findIndex((item) => item.date >= today);
    const safeIndex = baseIndex !== -1 ? baseIndex : scheduleData.length - 1;

    // 첫째날, 마지막날 일정 체크
    const isFirstDay = safeIndex === 0;
    const isLastDay = safeIndex === scheduleData.length - 1;

    // 보여줄 3일 계산
    const displayedDays = isLastDay
      ? [
          scheduleData[safeIndex - 2],
          scheduleData[safeIndex - 1],
          scheduleData[safeIndex],
        ]
      : isFirstDay
      ? [
          scheduleData[safeIndex],
          scheduleData[safeIndex + 1],
          scheduleData[safeIndex + 2],
        ]
      : [
          scheduleData[safeIndex - 1],
          scheduleData[safeIndex],
          scheduleData[safeIndex + 1],
        ];
    return displayedDays.filter(Boolean);
  }, []);

  useEffect(() => {
    const updateScroll = ({ scroll }) => {
      setScrollY(scroll);
    };

    lenis.on("scroll", updateScroll);
    return () => {
      lenis.off("scroll", updateScroll);
    };
  }, []);

  const handleClose = useCallback(() => {
    setManuallyClosed(true);
  }, [setManuallyClosed]);

  const handleReopen = useCallback(() => {
    setManuallyClosed(false);
    setScrollLocked(false);
    unfold();
  }, [setManuallyClosed, setScrollLocked, unfold]);

  return (
    <>
      <Container $folded={shouldFold} $disableTransition={disableTransition}>
        <List>
          {threeDaySlice.map((day, index) => (
            <ScheduleBox key={index} schedule={day} />
          ))}
        </List>
        <CloseButton onClick={handleClose} />
      </Container>
      <OpenButton
        headerHeight={headerHeight}
        onClick={handleReopen}
        visible={shouldFold}
      />
    </>
  );
});

export default TopSchedule;
