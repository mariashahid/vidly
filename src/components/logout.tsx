import * as React from "react";
import { Component } from "react";
import auth from "../services/authService";

interface LogoutProps {}

interface LogoutState {}

class Logout extends React.Component<LogoutProps, LogoutState> {
  componentDidMount() {
    auth.logout();
    window.location.assign("/");
  }

  render() {
    return "";
  }
}

export default Logout;
