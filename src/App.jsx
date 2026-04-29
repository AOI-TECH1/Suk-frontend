import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./pages/Footer";
import Slider from "./components/homepage/slider";

const App = () => {
  return (
    <Router>
      <div>
        
        {/* Your routes */}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="slider/" element={<h1>Home Page</h1>} />
        </Routes>
       
       <Slider/>
        <Footer />

      </div>
    </Router>
  );
};

export default App;