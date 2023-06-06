import * as React from "react";
import { Component } from "react";
import { SortColumn } from "../moviesTable";

interface TableHeaderProps {
  columns: Column<any>[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

interface TableHeaderState {}

export interface Column<T> {
  label?: string;
  path?: string;
  key: string;
  content?: (item: T) => React.ReactElement;
}

class TableHeader extends React.Component<TableHeaderProps, TableHeaderState> {
  raiseSort = (field: string) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === field) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = field;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column: Column<any>) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  };

  render(): React.ReactNode {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => {
            return (
              <th
                style={{ cursor: "pointer" }}
                key={column.key}
                onClick={() => this.raiseSort(column.path ? column.path : "")}
              >
                {column.label}
                {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
