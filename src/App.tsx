import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
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

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <main className="container">
        <Routes>
          <Route path="login" element={<LoginForm></LoginForm>}></Route>
          <Route
            path="register"
            element={<RegisterForm></RegisterForm>}
          ></Route>
          <Route path="movies/:id" element={<MoviesForm></MoviesForm>}></Route>
          <Route path="movies" element={<Movies></Movies>}></Route>
          <Route path="customers" element={<Customers></Customers>}></Route>
          <Route path="rentals" element={<Rentals></Rentals>}></Route>
          <Route path="/" element={<Navigate to="movies"></Navigate>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
