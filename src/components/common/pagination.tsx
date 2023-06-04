import * as React from "react";
import { Component } from "react";
import _ from "lodash";
import PropType from "prop-types";

interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface PaginationState {}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);

    if (pageCount === 1) return null;
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => {
            let active = "";
            if (page === currentPage) active = "active";
            return (
              <li key={page} className={"page-item " + active}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
