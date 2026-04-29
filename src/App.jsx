import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/Al-ameenjsx';   // ← Import your component

<<<<<<< Updated upstream
import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
=======
const products = [
  {
    image: "",           // ← Put your image path/URL here later (from Figma or assets)
    discount: 35,
    title: "Ales Nesetril",
    price: 960,
    originalPrice: 1160,
  },
  {
    image: "",           // ← Put second image here
    discount: 40,
    title: "Ales Nesetril",
    price: 960,
    originalPrice: 1160,
  },
];
>>>>>>> Stashed changes

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />

<<<<<<< Updated upstream
      <Header />

    

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
=======
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Trending Products</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product, index) => (
                    <ProductCard 
                      key={index}
                      {...product}
                    />
                  ))}
                </div>
              </div>
            } 
          />
          {/* You can add more routes later */}
        </Routes>
>>>>>>> Stashed changes

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;