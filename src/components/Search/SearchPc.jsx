import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchStore } from "../../stores/headersStore";
import PlayAllContentList from "../../pages/PlayAllContentList";
import { playContents } from "../../data/playcontents";
import { fetchYoutubePlaylist } from "../../hook/useYoutubePlayList";

const SearchPcWrap = styled.div`
  position: absolute;
  width: 100%;
  padding: 40px;
  background: ${({ mode }) => (mode === "light" ? "#fff" : "#111")};
  border-bottom: 1px solid;
  border-color: ${({ mode }) => (mode === "light" ? "#ddd" : "#333")};

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Form = styled.form`
  margin: 0 auto;
  padding: 15px;
  width: 700px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${({ mode }) => (mode === "light" ? "#ddd" : "#444")};

  input {
    flex: 1;
    background: none;
    border: none;
    color: ${({ mode }) => (mode === "light" ? "#111" : "#fff")};
    font-size: 1.6rem;
    font-family: "Figtree", "Pretendard", sans-serif;
    &::placeholder {
      color: ${({ mode }) => (mode === "light" ? "#aaa" : "#aaa")};
      transition: opacity 0.4s;
      opacity: 1;
    }
    &:focus {
      outline: none;
      &::placeholder {
        opacity: 0;
      }
    }
  }

  button {
    border: none;
    background: none;
    color: ${({ mode }) => (mode === "light" ? "#111" : "#fff")};
    font-size: 20px;
    cursor: pointer;
  }
`;
const ResultWrap = styled.div`
  margin-top: 40px;
  padding-right: 10px;
`;

const SearchTitle = styled.h2`
  color: ${({ mode }) => (mode === "light" ? "#111" : "#fff")};
  font-size: 1.8rem;
  margin: 20px 0;
`;

const SearchPc = ({ mode }) => {
  const { searchOpen } = useSearchStore();
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState(false);

  // 검색 함수: keyword에 따라 영상 필터링
  const fetchFilteredVideos = async (keyword) => {
    try {
      const keywordLower = keyword.trim().toLowerCase();
      const resultVideos = [];

      for (const [key, content] of Object.entries(playContents)) {
        if (Array.isArray(content.playlists)) {
          for (const playlist of content.playlists) {
            const nameMatch = playlist.name
              ?.toLowerCase()
              .includes(keywordLower);
            if (nameMatch) {
              const rawVideos = await fetchYoutubePlaylist({
                queryKey: [
                  "youtubePlaylist",
                  playlist.playlistId,
                  playlist.max || 10,
                ],
              });

              const parsed = rawVideos.map((item) => {
                const snippet = item.snippet || {};
                return {
                  title: snippet.title || "",
                  description: snippet.description || "",
                  videoId: snippet.resourceId?.videoId || "",
                  thumbnail: snippet.thumbnails?.medium?.url || "",
                };
              });

              resultVideos.push(...parsed);
            }
          }
        } else if (content.playlistId) {
          const keyMatch = key.toLowerCase().includes(keywordLower);
          if (keyMatch) {
            const rawVideos = await fetchYoutubePlaylist({
              queryKey: [
                "youtubePlaylist",
                content.playlistId,
                content.max || 10,
              ],
            });

            const parsed = rawVideos.map((item) => {
              const snippet = item.snippet || {};
              return {
                title: snippet.title || "",
                description: snippet.description || "",
                videoId: snippet.resourceId?.videoId || "",
                thumbnail: snippet.thumbnails?.medium?.url || "",
              };
            });

            resultVideos.push(...parsed);
          }
        }
      }

      return resultVideos;
    } catch (error) {
      console.error("검색 오류:", error);
      return [];
    }
  };
  // 검색 submit 핸들러
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    console.log("검색어:", keyword);
    const results = await fetchFilteredVideos(keyword);
    console.log("검색 결과:", results);
    setVideos(results);
    setSearchTrigger(true);
  };

  // 검색어 없을 때 검색 결과 숨기기
  useEffect(() => {
    if (!keyword.trim()) {
      setSearchTrigger(false);
      setVideos([]);
    }
  }, [keyword]);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  if (!searchOpen) return null;

  return (
    <SearchPcWrap mode={mode}>
      <Form mode={mode} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="찾으시는 동영상을 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Form>
      {searchTrigger && (
        <ResultWrap>
          <SearchTitle mode={mode}>"{keyword}" 검색 결과</SearchTitle>
          <PlayAllContentList videos={videos} type="search" />
        </ResultWrap>
      )}
    </SearchPcWrap>
  );
};

export default SearchPc;
