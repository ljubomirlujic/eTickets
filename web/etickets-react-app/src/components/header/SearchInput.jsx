import React from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchInput(props) {
  return (
    <div className={props.searchClass}>
      <Search placeholder="input search text" enterButton />
    </div>
  );
}

export default SearchInput;
