import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components
import Login from "./Components/Login"; // Import Login page
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for Login and Home pages */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
