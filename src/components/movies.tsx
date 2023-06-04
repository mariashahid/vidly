import * as React from "react";
import { Component } from "react";
import { getMovies, deleteMovie, Movie } from "../services/fakeMovieService";
import Like from "./common/like";

interface MoviesProps {}

interface MoviesState {
  movies: Movie[];
}

class Movies extends React.Component<MoviesProps, MoviesState> {
  state = { movies: getMovies() };
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

  render() {
    const { movies } = this.state;

    if (movies.length === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>There are {movies.length} in the database.</p>
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
            {this.state.movies.map((movie) => {
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
      </React.Fragment>
    );
  }
}

export default Movies;
