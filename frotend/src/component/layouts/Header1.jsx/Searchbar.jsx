import React from "react";
import styled from "styled-components";

import { SearchOutlined, CloseOutlined } from "@mui/icons-material";

import "./Searchbar.css";

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  background-color: #f2f2f2;
  border-radius: 25px;
  padding: 5px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 1.1rem;
  padding: 5px 8px 0px 8px;
  border: none;
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;




const Search = ({
  handleSearchButtonClick,
  handleCrossButtonClick,
  searchBarActive,
  handleSearchFormSubmit,
  handleSearchInputChange,
  searchValue,
}) => {
  return (
    <>
      {!searchBarActive && (
        <SearchButton onClick={handleSearchButtonClick}>
          <SearchOutlined fontSize="large" className="closeIcon" />
        </SearchButton>
      )}
      {searchBarActive && (
        <SearchBar>
          <SearchButton onClick={handleSearchFormSubmit}>
            <SearchOutlined fontSize="large" className="closeIcon" />
          </SearchButton>
          <form onSubmit={handleSearchFormSubmit} className="search_from">
            <SearchInput
              type="text"
              placeholder="Search........."
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </form>
          <SearchButton onClick={handleCrossButtonClick}>
            <CloseOutlined fontSize="large" className="closeIcon" />
          </SearchButton>
        </SearchBar>
      )}
    </>
  );
};

export default Search;
