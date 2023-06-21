import * as React from "react";
import { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { FormProps } from "react-router-dom";
import { FormState } from "./common/form";
import Form from "./common/form";
import { IIndexable } from "./common/tableBody";

interface LoginFormProps extends FormProps {}

type LoginFormState = FormState<Account> & {
  loggedIn: boolean;
};

interface Account extends IIndexable<any> {
  username: string;
  password: string;
}

class LoginForm extends Form<Account, Account, LoginFormProps, LoginFormState> {
  //   username = React.createRef<HTMLInputElement>();
  state = {
    data: { username: "", password: "" },
    errors: {} as Account,
    loggedIn: true,
  };

  constructor(props: FormProps) {
    super(props);

    this.schema = {
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    };
  }

  doSubmit = () => {
    alert(
      "Hi! user:" +
        this.state.data.username +
        " pwd: " +
        this.state.data.password
    );
  };
  componentDidMount(): void {}

  render() {
    const { data, errors } = this.state;

    return (
      <div className="containeer">
        <div className="row">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "email")}
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

export default LoginForm;
