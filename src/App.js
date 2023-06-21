import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./container/Home/Home";
import Layout from "./components/Layout/Layout";
import Movie from "./container/Movie/Movie";
import AddMovie from "./container/Movie/AddMovie";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Home" element={<Home />} />
            <Route path="/Movie" element={<Movie />} />
            <Route path="/Movie/AddMovie" element={<AddMovie />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
