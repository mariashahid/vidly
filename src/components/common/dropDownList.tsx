import * as React from "react";
import { Component } from "react";
import { IIndexable } from "./tableBody";

interface DropDownListProps<T> {
  data: T[];
  selectedItem: T;
  label: string;
  name: string;
  onChange: (input: React.ChangeEvent<HTMLSelectElement>) => void;
  error: string;
}

const DropDownList = <T extends IIndexable<any>>({
  data,
  selectedItem,
  name,
  label,
  onChange,
  error,
}: DropDownListProps<T>) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-control" name={name} onChange={onChange}>
        {data.map((item) => {
          return (
            <option
              value={item["_id"]}
              selected={selectedItem && item["name"] === selectedItem["name"]}
            >
              {item["name"]}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDownList;
