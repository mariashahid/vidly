import * as React from "react";
import { Component } from "react";
import { getMovies, deleteMovie, Movie } from "../services/fakeMovieService";
import { getGenres, Genre } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";

interface MoviesProps {}

interface MoviesState {
  movies: Movie[];
  currentPage: number;
  pageSize: number;
  genres: Genre[];
  selectedGenre: Genre;
}

class Movies extends React.Component<MoviesProps, MoviesState> {
  state = {
    movies: [] as Movie[],
    currentPage: 1,
    pageSize: 2,
    genres: [] as Genre[],
    selectedGenre: { _id: "", name: "" },
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

  handleSelection = (genre: Genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
    } = this.state;

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    let filteredMovies = allMovies;
    if (selectedGenre._id !== "") {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genre.name === selectedGenre.name
      );
    }

    const movies = paginate(filteredMovies, currentPage, pageSize);

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
            <p>There are {filteredMovies.length} in the database.</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => {
                  return (
                    <tr>
                      <th scope="row">{movie.title}</th>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          id={movie._id}
                          liked={movie.liked}
                          onClick={() => this.handleLike(movie)}
                        ></Like>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.handleDelete(movie);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              itemsCount={filteredMovies.length}
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
