import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchStore } from "../../stores/headersStore";
import { useNavigate, useLocation } from "react-router-dom";

const SearchPcWrap = styled.div`
  position: absolute;
  width: 100%;
  padding: 40px;
  background: var(--bg);
  border-bottom: 1px solid var(--gray3);
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
  border: 1px solid var(--gray3);

  input {
    flex: 1;
    background: none;
    border: none;
    color: var(--light);
    font-size: 1.6rem;
    font-family: "Figtree", "Pretendard", sans-serif;
    &::placeholder {
      color: var(--light);
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
    color: var(--light);
    font-size: 20px;
    cursor: pointer;
  }
`;

const SearchPc = () => {
  const { searchOpen, setSearchOpen } = useSearchStore();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    navigate(`/play/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
    setKeyword("");
    setSearchOpen(false);
  };

  useEffect(() => {
    setSearchOpen(false);
    setKeyword("");
  }, [location.pathname, setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <SearchPcWrap>
      <Form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="찾으시는 동영상을 입력해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Form>
    </SearchPcWrap>
  );
};

export default SearchPc;
