import * as React from "react";
import { Component } from "react";
import { WithRouterProps, withRouter } from "./common/withRouter";

interface MoviesFormProps extends WithRouterProps {}

interface MoviesFormState {}

class MoviesForm extends React.Component<MoviesFormProps, MoviesFormState> {
  handleClick = () => {
    this.props.navigate("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Movies Form - {this.props.params.id}</h1>
          <button className="btn btn-primary" onClick={this.handleClick}>
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(MoviesForm);
