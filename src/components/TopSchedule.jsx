import styled from "styled-components";
import ScheduleBox from "./ScheduleBox";
import scheduleData from "../data/kbo_2025_may_mock.json";
import { useLayoutEffect, useState } from "react";
import useHeaderStore from "../stores/headerStore";

const Container = styled.div`
  background: var(--dark);
  color: var(--light);
  width: 100%;
  max-height: ${({ $folded }) => ($folded ? "0px" : "110px")};
  overflow: hidden;
  ${({ $disableTransition }) =>
    !$disableTransition && "transition: max-height 0.4s ease;"};
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
  @media screen and (max-width: 768px) {
    & > div {
      &:nth-of-type(3) {
        display: none;
      }
    }
  }
`;

const TopSchedule = () => {
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);

  const [initialFolded, setInitialFolded] = useState(true);

  useLayoutEffect(() => {
    // 첫 렌더링 후 transition 켜기
    const timer = requestAnimationFrame(() => setInitialFolded(false));
    return () => cancelAnimationFrame(timer);
  }, []);

  const folded = initialFolded ? false : isFolded;

  const baseDate = "2025-05-21";
  const baseIndex = scheduleData.findIndex((item) => item.date === baseDate);
  const threeDaySlice = [
    scheduleData[baseIndex - 1],
    scheduleData[baseIndex],
    scheduleData[baseIndex + 1],
  ].filter(Boolean);

  return (
    <Container $folded={folded} $disableTransition={initialFolded}>
      <List>
        {threeDaySlice.map((day, index) => (
          <ScheduleBox key={index} schedule={day} />
        ))}
      </List>
    </Container>
  );
};

export default TopSchedule;
