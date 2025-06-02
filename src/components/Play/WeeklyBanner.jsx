import React, { useState } from "react";
import styled from "styled-components";

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const DateButton = styled.button`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ selected }) =>
    selected ? "1px solid var(--main)" : "1px solid var(--gray6)"};
  border-radius: 50px;
  font-family: "Figtree";
  font-weight: bold;
  font-size: 1.8rem;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "var(--main)" : "transparent")};
  color: ${({ selected }) => (selected ? "var(--gray1)" : "var(--light)")};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ selected }) => (selected ? "var(--main)" : "var(--main)")};
    color: ${({ selected }) => (selected ? "var(--gray1)" : "var(--gray1)")};
  }
`;

const days = [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeklyBanner = () => {
  const [selectedDay, setSelectedDay] = useState("Tuesday");

  return (
    <Banner>
      {days.map((day) => (
        <DateButton
          key={day}
          selected={selectedDay === day}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </DateButton>
      ))}
    </Banner>
  );
};

export default WeeklyBanner;
