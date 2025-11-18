import { memo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchPcBtn = styled.div`
  width: 21px;
  font-size: 21px;
  cursor: pointer;
  .closemark {
    font-size: 25px;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const HeaderSearchBtn = memo(({ searchOpen, toggleSearch }) => {
  return (
    <SearchPcBtn>
      <FontAwesomeIcon
        icon={searchOpen ? faXmark : faMagnifyingGlass}
        onClick={toggleSearch}
        className={searchOpen ? "closemark" : ""}
      />
    </SearchPcBtn>
  );
});

export default HeaderSearchBtn;
