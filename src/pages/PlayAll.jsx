import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import PlayContent from "../components/Play/PlayContent";
import { playContents } from "../data/playcontents";
import { fetchPlaylistVideos } from "../hook/useYoutubeContentList";
import { fetchTeamPlaylists } from "../hook/useTeamPlayList";
import ContentTag from "../components/Play/ContentTag";

const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 5%;
  gap: 100px;
  display: flex;
  flex-direction: column;
  color: var(--light);

  @media screen and (max-width: 1024px) {
    padding: 0 3%;
    gap: 50px;
  }
`;

const ContentTitle = styled.h2`
  font-size: 3rem;

  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const ContentList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px 20px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 18px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 14px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 10px;
  }
`;

const PlayAll = () => {
  const location = useLocation();
  const type = location.state?.type;
  const title = location.state?.title;

  const [videos, setVideos] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!type || !playContents[type]) return;

      const config = playContents[type];
      let items = [];

      if (config.playlists) {
        items = await fetchTeamPlaylists(config.playlists);
      } else {
        items = await fetchPlaylistVideos(config.playlistId, config.max || 30);
      }

      setVideos(items);
    };

    load();
  }, [type]);

  const filteredVideos = selectedTeam
    ? videos.filter((video) => video.teamName === selectedTeam)
    : videos;

  return (
    <Container>
      <ContentTitle>{title}</ContentTitle>
      {(type === "teamplay" || type === "rookieplay") && (
        <ContentTag type={type} onSelect={setSelectedTeam} />
      )}
      <ContentList>
        {filteredVideos.map((item, idx) => (
          <PlayContent key={item.id || idx} {...item} type={type} />
        ))}
      </ContentList>
    </Container>
  );
};

export default PlayAll;
