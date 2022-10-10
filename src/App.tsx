import { Typography } from "@mui/material";
import React from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Nav from "./components/layout/Nav";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
