import * as React from "react";
import { Component } from "react";

interface ListGroupProps<T extends { _id: String; name: String }> {
  items: T[];
  onSelection: (item: T) => void;
  selectedItem: T;
}

const ListGroup = <T extends { _id: string; name: string }>(
  props: ListGroupProps<T>
) => {
  return (
    <ul className="list-group">
      {props.items.map((item) => {
        return (
          <li
            key={item._id}
            className={
              props.selectedItem !== undefined &&
              props.selectedItem.name === item.name
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => props.onSelection(item)}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
