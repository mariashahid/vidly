import * as React from "react";
import { Component } from "react";
import { getMovies, deleteMovie, Movie } from "../services/fakeMovieService";
import { getGenres, Genre } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

interface MoviesProps {}

interface MoviesState {
  movies: Movie[];
  currentPage: number;
  pageSize: number;
  genres: Genre[];
  selectedGenre: Genre;
  sortColumn: SortColumn;
}

interface SortColumn {
  path: string;
  order: string;
}

class Movies extends React.Component<MoviesProps, MoviesState> {
  state = {
    movies: [] as Movie[],
    currentPage: 1,
    pageSize: 5,
    genres: [] as Genre[],
    selectedGenre: { _id: "", name: "" },
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount(): void {
    const allGenre: Genre = { _id: "", name: "All Genres" } as Genre;
    const genres = [allGenre, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie: Movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie: Movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSelection = (genre: Genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filteredMovies = allMovies;
    if (selectedGenre._id !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genre.name === selectedGenre.name
      );
    }

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order as "asc" | "desc"]
    );
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    const result = this.getPageData();

    return (
      <React.Fragment>
        <div className="row mt-5">
          <div className="col-md-2">
            <ListGroup
              items={genres}
              onSelection={this.handleSelection}
              selectedItem={selectedGenre}
            ></ListGroup>
          </div>
          <div className="col">
            <p>There are {result.totalCount} in the database.</p>
            <MoviesTable
              movies={result.data}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            ></MoviesTable>
            <Pagination
              itemsCount={result.totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
