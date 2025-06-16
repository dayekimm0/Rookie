import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSearchStore } from "../../stores/headersStore";

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

const SearchPc = ({ mode }) => {
  const { searchOpen } = useSearchStore();

  if (!searchOpen) return null;

  return (
    <SearchPcWrap mode={mode}>
      <Form mode={mode} onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="찾으시는 상품을 입력해주세요." />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Form>
    </SearchPcWrap>
  );
};

export default SearchPc;
