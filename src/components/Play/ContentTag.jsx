import { useState } from "react";
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
  const [selectedKey, setSelectedKey] = useState(null);

  const teamList = playContents.teamplay?.playlists || [];
  const rookieList = playContents.rookieplay?.playlists || [];

  const listToRender = type === "teamplay" ? teamList : rookieList;

  const handleClick = (name) => {
    setSelectedKey(name);
    if (onSelect) onSelect(name === "전체" ? null : name);
  };
  return (
    <ContentList>
      <ContentTitle>
        <ContentsName
          key="all"
          active={selectedKey === "전체"}
          onClick={() => handleClick("전체")}
        >
          전체
        </ContentsName>

        {listToRender.map((item) => (
          <ContentsName
            key={item.playlistId}
            active={selectedKey === item.name}
            onClick={() => handleClick(item.name)}
          >
            {item.name}
          </ContentsName>
        ))}
      </ContentTitle>
    </ContentList>
  );
};

export default ContentTag;
