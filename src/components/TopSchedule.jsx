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
    !$disableTransition && "transition: max-height 0.4s ease;"}
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

const TopSchedule = () => {
  const isFolded = useHeaderStore((state) => state.isHeaderFolded);
  const disableTransition = useHeaderStore((state) => state.disableTransition);

  const baseDate = "2025-05-21";
  const baseIndex = scheduleData.findIndex((item) => item.date === baseDate);
  const threeDaySlice = [
    scheduleData[baseIndex - 1],
    scheduleData[baseIndex],
    scheduleData[baseIndex + 1],
  ].filter(Boolean);

  return (
    <Container $folded={isFolded} $disableTransition={disableTransition}>
      <List>
        {threeDaySlice.map((day, index) => (
          <ScheduleBox key={index} schedule={day} />
        ))}
      </List>
    </Container>
  );
};

export default TopSchedule;
