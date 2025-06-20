import React, { useRef, useState } from "react";
import "swiper/css";
import MySlideTabNav from "./MySlideTabNav";
import AllTabSlide from "../Slides/AllTabSlide";
import SingleTabSlide from "../Slides/SingleTabSlide";

const MyPlaySlidewithTabs = ({ allTab, mypageTabs }) => {
  const [isAll, setIsAll] = useState(true);
  const [selectedTab, setSelectedTab] = useState(mypageTabs[0]);
  const swiperRef = useRef(null);

  const handleTabSelect = (mode, mypageTabs) => {
    setIsAll(mode === "all");
    setSelectedTab(mypageTabs);
    setTimeout(() => {
      swiperRef.current?.slideTo?.(0, 0);
    }, 0);
  };

  return (
    <>
      <MySlideTabNav
        allTabName={allTab.name}
        mypageTabs={mypageTabs}
        isAllTab={isAll}
        selectedTab={selectedTab}
        onSelectTab={handleTabSelect}
      />
      {isAll ? (
        <AllTabSlide
          allTab={allTab}
          onSwiperReady={(s) => (swiperRef.current = s)}
        />
      ) : null}
    </>
  );
};

export default React.memo(MyPlaySlidewithTabs);
