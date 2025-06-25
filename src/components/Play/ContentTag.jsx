import { useState, useMemo } from "react";
import styled from "styled-components";
import { playContents } from "../../data/playcontents";

const ContentList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: var(--light);
`;

const ContentTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .more {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 2px;
    span {
      font-size: 2rem;
      font-weight: 300;
    }
  }
`;

const ContentsName = styled.div`
  padding: 10px 24px;
  border: 1px solid var(--gray6);
  border-radius: 18px;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => (props.active ? "var(--main)" : "transparent")};
  color: ${(props) => (props.active ? "var(--gray6)" : "var(--light)")};
  transition: all 0.3s ease;

  &:hover {
    background: var(--main);
    color: var(--gray6);
  }
`;

const ContentTag = ({ type, onSelect }) => {
  const [selectedKey, setSelectedKey] = useState("전체");

  const listToRender =
    type === "teamplay"
      ? playContents.teamplay.playlists
      : playContents.rookieplay.playlists;

  const preferredOrder = [
    "KIA",
    "삼성",
    "LG",
    "두산",
    "KT",
    "SSG",
    "롯데",
    "한화",
    "NC",
    "키움",
  ];

  const teamNameToShort = {
    "기아 타이거즈": "KIA",
    "삼성 라이온즈": "삼성",
    "LG 트윈스": "LG",
    "두산 베어스": "두산",
    "KT 위즈": "KT",
    "SSG 랜더스": "SSG",
    "롯데 자이언츠": "롯데",
    "한화 이글스": "한화",
    "NC 다이노스": "NC",
    "키움 히어로즈": "키움",
  };

  const sortedList = useMemo(() => {
    return [...listToRender].sort((a, b) => {
      const shortA = teamNameToShort[a.name] || "";
      const shortB = teamNameToShort[b.name] || "";
      const indexA = preferredOrder.indexOf(shortA);
      const indexB = preferredOrder.indexOf(shortB);
      return (
        (indexA === -1 ? Infinity : indexA) -
        (indexB === -1 ? Infinity : indexB)
      );
    });
  }, [listToRender]);

  const handleClick = (name) => {
    setSelectedKey(name);
    if (onSelect) onSelect(name === "ALL" ? null : name);
  };

  return (
    <ContentList>
      <ContentTitle>
        <ContentsName
          key="ALL"
          active={selectedKey === "ALL"}
          onClick={() => handleClick("ALL")}
        >
          ALL
        </ContentsName>

        {sortedList.map((item) => (
          <ContentsName
            key={item.playlistId}
            active={selectedKey === item.name}
            onClick={() => handleClick(item.name)}
          >
            {teamNameToShort[item.name] || item.name}
          </ContentsName>
        ))}
      </ContentTitle>
    </ContentList>
  );
};

export default ContentTag;
