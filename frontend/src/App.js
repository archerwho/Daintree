import "./App.css";
import Footer from "./components/layout/Footer/footer";
import Header from "./components/layout/Header/Header";
import Webfont from "webfontloader";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.js";

function App() {
  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ["Montserrat", "sans-serif"],
      },
    });
  });
  return (
    <Router>
      <Header />
      <Routes>
        <Route exaxt path="/" element={Home} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
