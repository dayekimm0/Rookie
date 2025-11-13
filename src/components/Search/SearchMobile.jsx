import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

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
`;

const SearchMobile = ({ setMobileMenuOpen }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;

    navigate(`/play/search?keyword=${encodeURIComponent(trimmed)}`);
    setMobileMenuOpen(false);
    setKeyword("");
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setKeyword("");
  }, [location.pathname]);

  return (
    <Wrapper>
      <div className="search_bar">
        <form id="search_form_mb" name="search_bar_mb" onSubmit={handleSearch}>
          <input
            className="search_txt"
            type="text"
            placeholder="찾으시는 동영상을 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
          />
          <button className="search_btn" type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default SearchMobile;
