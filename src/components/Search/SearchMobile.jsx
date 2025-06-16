import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  .search_bar {
    position: relative;
    border-bottom: 1px solid #111;
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
        background: #fff;
        width: 100%;
        overflow: hidden;
        transition: all 0.4s;
        font-size: 1.2rem;
        color: #111;
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
        font-size: 16px;
      }
    }
  }
`;

const SearchMobile = () => {
  return (
    <Wrapper>
      <div className="search_bar">
        <form
          id="search_form_mb"
          name="search_bar_mb"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="search_txt"
            type="text"
            placeholder="search"
            // onKeyUp={onCheckEnter}
          />
          <button className="search_btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default SearchMobile;
