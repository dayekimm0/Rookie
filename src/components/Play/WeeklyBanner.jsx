import React, { useState } from "react";
import styled from "styled-components";
import { fetchPlaylistVideos } from "../../hook/useYoutubeContentList";

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

  @media screen and (max-width: 1024px) {
    height: 50px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 768px) {
    height: 40px;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 500px) {
    height: 30px;
    font-size: 1.2rem;
  }
`;

const days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

console.log(fetchPlaylistVideos);
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
