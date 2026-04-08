import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './pages/About'

const App = () => {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<h1>Home Page</h1>} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
