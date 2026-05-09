import React from 'react'
import ProductSection from '../components/homepage/HomePage_ProductCard'
import BrowserByCategory from '../components/homepage/HomeCategory'
import HeroSlider from '../components/homepage/HomePage_slider'
import TrendySlide from '../components/homepage/TrendingSlide'

const Home = () => {
  return (
    <div>
         <HeroSlider />
        <BrowserByCategory /> 
        <TrendySlide />
      <ProductSection />    
    </div>
  )
}

export default Home
