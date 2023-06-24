import * as React from "react";
import { Component } from "react";
import { getMovies, deleteMovie, Movie } from "../services/movieService";
//import { getGenres, Genre } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { getGenres, Genre } from "../services/genreService";
import { User } from "../App";

interface MoviesProps {
  user: User | null;
}

interface MoviesState {
  movies: Movie[];
  currentPage: number;
  pageSize: number;
  genres: Genre[];
  selectedGenre?: Genre;
  sortColumn: SortColumn;
  searchQuery: string;
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
    searchQuery: "",
  };

  async componentDidMount() {
    const allGenre: Genre = { _id: "", name: "All Genres" } as Genre;
    const genres = [allGenre, ...(await getGenres())];
    this.setState({ movies: await getMovies(), genres });
  }

  handleDelete = async (movie: Movie) => {
    await deleteMovie(movie._id);
    const movies = await getMovies();
    this.setState({ movies });
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
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery, selectedGenre: undefined, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery !== "") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery)
      );
    } else if (selectedGenre != undefined && selectedGenre._id !== "") {
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
    const { user } = this.props;

    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    const result = this.getPageData();

    return (
      <React.Fragment>
        <h1>Movies</h1>
        {user?._id && (
          <Link to="/movies/new" className="btn btn-primary">
            New Movie
          </Link>
        )}
        <div className="row mt-5">
          <div className="col-md-2">
            <ListGroup
              items={genres}
              onSelection={this.handleSelection}
              selectedItem={selectedGenre}
            ></ListGroup>
          </div>
          <div className="col">
            <SearchBox
              onChange={this.handleSearch}
              searchQuery={searchQuery}
            ></SearchBox>
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
