import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchStore } from "../../stores/headersStore";
import PlayAllContentList from "../../pages/PlayAllContentList";
import { playContents } from "../../data/playcontents";
import { fetchYoutubePlaylist } from "../../hook/useYoutubePlayList";

const Wrapper = styled.div`
  .search_bar {
    position: relative;
    border-bottom: 1px solid var(--dark);
    padding-bottom: 8px;

    form {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      button,
      input {
        border: none;
        background: none;
      }
      font-size: 0;
      position: relative;

      .search_txt {
        border-radius: 100px;
        background: var(--light);
        width: 100%;
        overflow: hidden;
        transition: all 0.4s;
        font-size: 1.2rem;
        color: var(--dark);
        &::placeholder {
          font-size: 1.2rem;
          font-family: "pretendard";
          transition: all 0.4s;
          color: var(--grayC);
        }
        &:focus {
          outline: none;
          &::placeholder {
            color: transparent;
          }
        }
      }

      .search_btn {
        font-size: 1.6rem;
      }
    }
  }
  .results {
    margin-top: 20px;
  }

  .results_title {
    font-size: 1.4rem;
    color: var(--dark);
    margin-bottom: 10px;
  }
`;

const SearchMobile = () => {
  const { searchOpen } = useSearchStore();
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState(false);

  const fetchFilteredVideos = async (keyword) => {
    try {
      const keywordLower = keyword.trim().toLowerCase();
      const resultVideos = [];

      for (const [key, content] of Object.entries(playContents)) {
        if (Array.isArray(content.playlists)) {
          for (const playlist of content.playlists) {
            if (playlist.name?.toLowerCase().includes(keywordLower)) {
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
          if (key.toLowerCase().includes(keywordLower)) {
            const rawVideos = await fetchYoutubePlaylist({
              queryKey: [
                "youtubePlaylist",
                content.playlistId,
                content.max || 10,
              ],
            });

            const persed = rawVideos.map((item) => {
              const snippet = item.snippet || {};
              return {
                title: snippet.title || "",
                description: snippet.description || "",
                videoId: snippet.resourceId?.videoId || "",
                thumbnail: snippet.thumbnails?.medium?.url || "",
              };
            });

            resultVideos.push(...persed);
          }
        }
      }
      return resultVideos;
    } catch (error) {
      console.error("모바일 검색 에러: ", error);
      return [];
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const results = await fetchFilteredVideos(keyword);
    setVideos(results);
    setSearchTrigger(true);
  };

  useEffect(() => {
    if (!keyword.trim()) {
      setSearchTrigger(false);
      setVideos([]);
    }
  }, [keyword]);

  return (
    <Wrapper>
      <div className="search_bar">
        <form id="search_form_mb" name="search_bar_mb" onSubmit={handleSearch}>
          <input
            className="search_txt"
            type="text"
            placeholder="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            // onKeyUp={onCheckEnter}
          />
          <button className="search_btn" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      {searchTrigger && (
        <div className="results">
          <div className="results_title">"{keyword}" 검색 결과</div>
          <PlayAllContentList videos={videos} type="search" />
        </div>
      )}
    </Wrapper>
  );
};

export default SearchMobile;
