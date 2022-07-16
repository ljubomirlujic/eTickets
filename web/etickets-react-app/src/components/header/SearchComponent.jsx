import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import SearchInput from "./SearchInput";
function SearchComponent() {
  const [searchClass, setSearchClass] = useState("search-panel-invisible");

  const handleSearchCLass = () => {
    if (searchClass == "search-panel") {
      setSearchClass("search-panel-invisible");
    } else {
      setSearchClass("search-panel");
    }
  };
  return (
    <>
      <SearchOutlined id="search-icon" onClick={handleSearchCLass} />
      <SearchInput searchClass={searchClass} />
    </>
  );
}

export default SearchComponent;
