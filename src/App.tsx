import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:tvShowId" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
