import * as React from "react";
import { Component } from "react";
import { Column } from "./tableHeader";
import TableBody, { IIndexable } from "./tableBody";
import TableHeader from "./tableHeader";
import { SortColumn } from "../moviesTable";

interface TableProps<T> {
  columns: Column<any>[];
  data: T[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

const Table = <T extends IIndexable<any>>({
  columns,
  data,
  sortColumn,
  onSort,
}: TableProps<T>) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody columns={columns} data={data}></TableBody>
    </table>
  );
};

export default Table;
