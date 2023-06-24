import * as React from "react";
import { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { FormProps } from "react-router-dom";
import { FormState } from "./common/form";
import Form from "./common/form";
import { IIndexable } from "./common/tableBody";
import { register } from "../services/userService";
import Toastify from "toastify";
import { AxiosError } from "axios";
import { withRouter, WithRouterProps } from "./common/withRouter";
import auth from "../services/authService";

interface RegisterFormProps extends FormProps, WithRouterProps {}

type RegisterFormState = FormState<Account> & {
  loggedIn: boolean;
};

export interface Account extends IIndexable<any> {
  email: string;
  password: string;
  name: string;
}

class RegisterForm extends Form<
  Account,
  Account,
  RegisterFormProps,
  RegisterFormState
> {
  //   username = React.createRef<HTMLInputElement>();
  state = {
    data: { email: "", password: "", name: "" },
    errors: {} as Account,
    loggedIn: true,
  };

  constructor(props: FormProps & WithRouterProps) {
    super(props);

    this.schema = {
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().min(5).required().label("Password"),
      name: Joi.string().required().label("Name"),
    };
  }

  doSubmit = async () => {
    try {
      const { data, headers } = await register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location.assign("/");
      Toastify.success("Hi! user:" + data.email + " pwd: " + data.name);
    } catch (ex) {
      const err = ex as AxiosError;
      if (err.response && err.response.status === 400) {
        Toastify.error("User already registered");
      } else {
        Toastify.error(
          "There is an error registering user." + err.response?.statusText
        );
      }
    }
  };
  componentDidMount(): void {}

  render() {
    const { data, errors } = this.state;

    return (
      <div className="containeer">
        <div className="row">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
