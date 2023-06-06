import * as React from "react";
import { Component } from "react";
import { Column } from "./tableHeader";
import _ from "lodash";

interface TableBodyProps<T extends IIndexable<any>> {
  data: T[];
  columns: Column<any>[];
}

interface TableBodyState {}

export interface IIndexable<T = any> {
  [key: string]: T;
}

class TableBody<T extends IIndexable<any>> extends React.Component<
  TableBodyProps<T>,
  TableBodyState
> {
  renderCell = (item: T, column: Column<any>) => {
    if (column) {
      if (column.content) {
        return column.content(item);
      }
      return column.path != null ? _.get(item, column.path) : "";
    }
  };

  createKey = (item: T, column: Column<any>) => {
    return item["_id"] + column.key;
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={"_id" in item ? item["_id"] : ""}>
              {columns.map((column) => {
                return (
                  <td key={this.createKey(item, column)} scope="row">
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
