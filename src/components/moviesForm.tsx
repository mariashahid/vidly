import * as React from "react";
import { Component } from "react";
import { WithRouterProps, withRouter } from "./common/withRouter";
import Form, { FormState, FormProps } from "./common/form";
import { Movie, getMovie, saveMovie } from "../services/movieService";
import DropDownList from "./common/dropDownList";
import { Genre, getGenres } from "../services/genreService";
import Joi from "joi-browser";
import { IIndexable } from "./common/tableBody";
import { title } from "process";
import { AxiosError } from "axios";

interface MoviesFormProps extends WithRouterProps {}

type MoviesFormState = FormState<MovieViewModel> & {
  genres: Genre[];
};

export interface MovieViewModel extends IIndexable<any> {
  _id: string;
  title: String;
  genreId: string;
  numberInStock: Number;
  dailyRentalRate: Number;
}

class MoviesForm extends Form<
  MovieViewModel,
  MovieViewModel,
  MoviesFormProps,
  MoviesFormState
> {
  state = {
    data: {} as MovieViewModel,
    errors: {} as MovieViewModel,
    genres: [] as Genre[],
  };

  schema: MovieViewModel = {
    _id: Joi.string().allow(""),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    dailyRentalRate: Joi.number().min(0).max(100).label("Rate"),
    numberInStock: Joi.number().min(0).max(10).label("Stock"),
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  constructor(props: MoviesFormProps) {
    super(props);
  }

  populateGenres = async () => {
    const genres = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    try {
      let data = {} as Movie;
      if (this.props.params.id !== "new") {
        data = await getMovie(this.props.params.id);
      }
      this.setState({ data: this.toViewModel(data) });
    } catch (ex) {
      const err = ex as AxiosError;
      if (err.response && err.response.status === 404) {
        this.props.navigate("/not-found");
      }
    }
  };

  doSubmit = async (movie: MovieViewModel) => {
    await saveMovie(this.toMovie(movie));
    this.props.navigate("/movies");
  };

  toMovie = (movie: MovieViewModel) => {
    return {
      _id: movie._id !== undefined ? movie._id : "",
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      numberInStock: movie.numberInStock,
      genre: { _id: movie.genreId },
    } as Movie;
  };
  toViewModel = (movie: Movie) => {
    return movie !== undefined
      ? ({
          _id: movie._id !== undefined ? movie._id : "",
          title: movie.title !== undefined ? movie.title : "",
          dailyRentalRate:
            movie.dailyRentalRate !== undefined ? movie.dailyRentalRate : 0,
          numberInStock:
            movie.numberInStock !== undefined ? movie.numberInStock : 0,
          genreId: movie.genre !== undefined ? movie.genre._id : "",
        } as MovieViewModel)
      : ({} as MovieViewModel);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Movies Form - {this.props.params.id}</h1>
          <div className="containeer">
            <div className="row">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("title", "Title")}
                <DropDownList
                  data={this.state.genres}
                  selectedItem={this.state.data.genre}
                  name="genreId"
                  label="Genre"
                  onChange={this.handleChange}
                  error={this.state.errors["genreId"]}
                ></DropDownList>
                {this.renderInput("numberInStock", "Stock", "number")}
                {this.renderInput("dailyRentalRate", "Rate", "number")}
                {this.renderButton("Save")}
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MoviesForm);
