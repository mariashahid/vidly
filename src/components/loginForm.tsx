import * as React from "react";
import { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { FormProps, Navigate } from "react-router-dom";
import { FormState } from "./common/form";
import Form from "./common/form";
import { IIndexable } from "./common/tableBody";
import auth from "../services/authService";
import Toastify from "toastify";
import { AxiosError } from "axios";
import { withRouter, WithRouterProps } from "./common/withRouter";

interface LoginFormProps extends FormProps, WithRouterProps {}

type LoginFormState = FormState<Account> & {
  loggedIn: boolean;
};

export interface Account extends IIndexable<any> {
  email: string;
  password: string;
}

class LoginForm extends Form<Account, Account, LoginFormProps, LoginFormState> {
  //   username = React.createRef<HTMLInputElement>();
  state = {
    data: { email: "", password: "" },
    errors: {} as Account,
    loggedIn: true,
  };

  constructor(props: FormProps & WithRouterProps) {
    super(props);

    this.schema = {
      email: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
  }

  doSubmit = async () => {
    try {
      const token = await auth.login(this.state.data);
      Toastify.success("Login success!");
      let from = null;

      if (this.props.location.state != undefined) {
        from = this.props.location.state.from as Location;
        window.location.assign(from.pathname);
        //console.log(from.pathname);
      } else {
        window.location.assign("/");
      }
    } catch (ex) {
      const err = ex as AxiosError;
      if (err.response && err.response.status === 400) {
        Toastify.error(err.response.data);
        const errors = { ...this.state.errors };
        errors.email = err.response.data as string;
        this.setState({ errors });
      }
    }
  };
  componentDidMount(): void {}

  render() {
    const { data, errors } = this.state;

    console.log("Render");
    //if (auth.getCurrentUser()) return <Navigate to="/" />;

    return (
      <div className="containeer">
        <div className="row">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Username", "email")}
            {this.renderInput("password", "Password", "password")}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
