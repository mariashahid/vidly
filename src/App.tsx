import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.css";
import "toastify/dist/toastify.css";
import Movies from "./components/movies";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/common/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MoviesForm from "./components/moviesForm";
import NotFound from "./components/common/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import Protected from "./components/common/protected";
import { useAuth } from "./components/common/useAuth";

interface AppProps {}

interface AppState {
  token: string;
  user: User | null;
}

export interface User {
  email: string;
  name: string;
  iat: number;
  _id: string;
  isAdmin: string;
}

class App extends React.Component<AppProps, AppState> {
  state = { token: "", user: {} as User };

  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user?._id) this.setState({ user });
  }

  render() {
    // const { user, loading } = useAuth();

    // if (loading) {
    //   return <h1>Loading...</h1>;
    // }

    return (
      <div className="App">
        <NavBar user={this.state.user}></NavBar>
        <main className="container">
          <Routes>
            <Route path="login" element={<LoginForm></LoginForm>}></Route>
            <Route
              path="register"
              element={<RegisterForm></RegisterForm>}
            ></Route>
            <Route
              element={
                <Protected isSignedIn={this.state.user._id != null}></Protected>
              }
            >
              <Route
                path="movies/:id"
                element={<MoviesForm></MoviesForm>}
              ></Route>
            </Route>
            <Route
              path="movies"
              element={<Movies user={this.state.user}></Movies>}
            ></Route>
            <Route path="customers" element={<Customers></Customers>}></Route>
            <Route path="rentals" element={<Rentals></Rentals>}></Route>
            <Route path="logout" element={<Logout></Logout>}></Route>
            <Route path="/" element={<Navigate to="movies"></Navigate>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
