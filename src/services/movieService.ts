import { IIndexable } from "../components/common/tableBody";
import { Genre, genres, getGenres } from "./genreService";
import httpService from "./httpService";
import config from "../utils/config.json";
import { MovieViewModel } from "../components/moviesForm";

export let movies = [] as Movie[];

export async function getMovies() {
  movies = await httpService
    .get<Movie[]>(config.api + "movies")
    .then((response) => {
      return response.data;
    });
  return movies;
}

export async function getMovie(id: String) {
  const movie = await httpService
    .get<Movie>(config.api + "movies/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((ex) => {
      throw ex;
    });
  return movie;
}

export async function saveMovie(movie: Movie) {
  let movieInDb: Movie = await getMovie(movie._id);

  let updatedMovie = {} as MovieViewModel;
  updatedMovie.title = movie.title;
  updatedMovie.genreId = movie.genre._id;
  updatedMovie.numberInStock = movie.numberInStock;
  updatedMovie.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb = await httpService
      .post<Movie>(config.api + "movies", updatedMovie)
      .then((response) => {
        return response.data;
      });
  } else {
    movieInDb = await httpService
      .put<Movie>(config.api + "movies/" + movieInDb._id, updatedMovie)
      .then((response) => {
        return response.data;
      });
  }

  return movieInDb;
}

export async function deleteMovie(id: String) {
  let movieInDb: Movie = await getMovie(id);
  console.log(movieInDb);
  if (movieInDb != undefined) httpService.delete(config.api + "movies/" + id);
  return movieInDb;
}

export interface Movie extends IIndexable<any> {
  _id: string;
  title: String;
  genre: Genre;
  numberInStock: Number;
  dailyRentalRate: Number;
  publishDate?: String;
  liked?: boolean;
}
