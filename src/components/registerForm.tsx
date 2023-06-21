import * as React from "react";
import { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { FormProps } from "react-router-dom";
import { FormState } from "./common/form";
import Form from "./common/form";
import { IIndexable } from "./common/tableBody";

interface RegisterFormProps extends FormProps {}

type RegisterFormState = FormState<Account> & {
  loggedIn: boolean;
};

interface Account extends IIndexable<any> {
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

  constructor(props: FormProps) {
    super(props);

    this.schema = {
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().min(5).required().label("Password"),
      name: Joi.string().required().label("Name"),
    };
  }

  doSubmit = () => {
    alert(
      "Hi! user:" + this.state.data.email + " pwd: " + this.state.data.password
    );
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

export default RegisterForm;
