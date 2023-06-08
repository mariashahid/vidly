import * as React from "react";
import { Component } from "react";
import Input from "./common/input";
import { error } from "console";

interface LoginFormProps {}

interface LoginFormState {
  account: Account;
  errors: Account | null;
}

interface Account {
  username: string;
  password: string;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  //   username = React.createRef<HTMLInputElement>();
  state = {
    account: { username: "", password: "" },
    errors: {} as Account,
  };

  validate = () => {
    const errors = {} as Account;
    const { account } = this.state;

    if (account.username.trim() === "") {
      errors.username = "Username is required";
    }

    if (account.password.trim() === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || ({} as Account) });
    if (errors) {
      return;
    }

    alert(
      "Hi! user:" +
        this.state.account.username +
        " pwd: " +
        this.state.account.password
    );
  };

  componentDidMount(): void {}

  handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const account = { ...this.state.account };
    account[input.name as keyof Account] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="containeer">
        <div className="row">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              value={account.username}
              label="Username"
              onChange={this.handleChange}
              error={errors.username}
            ></Input>
            <Input
              name="password"
              value={account.password}
              label="Password"
              onChange={this.handleChange}
              error={errors.password}
            ></Input>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
