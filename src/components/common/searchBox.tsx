import * as React from "react";
import { Component } from "react";

interface SearchBoxProps {
  searchQuery: string;
  onChange: (searchQuery: string) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <input
      name="query"
      value={props.searchQuery}
      placeholder="Search..."
      onChange={(e) => props.onChange(e.currentTarget.value)}
      className="form-control my-3"
    ></input>
  );
};

export default SearchBox;
