import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Movies from "./components/movies";

function App() {
  return (
    <div className="App">
      <main className="container">
        Vidly
        <Movies></Movies>
      </main>
    </div>
  );
}

export default App;
