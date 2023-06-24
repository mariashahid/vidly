import * as React from "react";
import { Component } from "react";
import { Movie } from "../services/movieService";
import Like from "./common/like";
import TableHeader, { Column } from "./common/tableHeader";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

interface MoviesTableProps {
  movies: Movie[];
  onDelete: (movie: Movie) => void;
  onLike: (movie: Movie) => void;
  onSort: (sortColumn: SortColumn) => void;
  sortColumn: SortColumn;
}

interface MoviesTableState {}

export interface SortColumn {
  path: string;
  order: string;
}

class MoviesTable extends React.Component<MoviesTableProps, MoviesTableState> {
  columns: Column<Movie>[] = [
    {
      key: "title",
      path: "title",
      label: "Title",
      content: (movie: Movie) => (
        <Link to={"/movies/" + movie._id}>{movie.title}</Link>
      ),
    },
    { key: "genre", path: "genre.name", label: "Genre" },
    { key: "stock", path: "numberInStock", label: "Stock" },
    { key: "rate", path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie: Movie) => (
        <Like
          id={movie._id}
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie: Movie) => (
      <button
        className="btn btn-danger"
        onClick={() => {
          this.props.onDelete(movie);
        }}
      >
        Delete
      </button>
    ),
  };

  constructor(props: MoviesTableProps) {
    super(props);

    const user = auth.getCurrentUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MoviesTable;
