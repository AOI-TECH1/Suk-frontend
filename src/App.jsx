<<<<<<< Updated upstream
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

=======
>>>>>>> Stashed changes
import React from 'react'
import Home from './pages/Home'
<<<<<<< Updated upstream
import Footer from './components/Footer'
import About from './pages/About'

const App = () => {
  return (
    <BrowserRouter>

      <Header />

    

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
=======

// import ProductCard from './components/Al-ameen'



const App = () => {
  return (
    <div>
      
       {/* <ProductCard /> */}
      
       
        
      <Home />
     
      
      </div>
  )
}

export default App
>>>>>>> Stashed changes
