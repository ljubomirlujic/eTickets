import React from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function SearchInput(props) {
  const navigate = useNavigate();

  const onSearch = (value) => navigate(`/events?searchParam=${value}`);
  return (
    <div className="search-panel">
      <Search
        placeholder="input event name for search"
        enterButton
        onSearch={onSearch}
      />
    </div>
  );
}

export default SearchInput;
