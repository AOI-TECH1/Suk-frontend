import React from 'react'
import ProductSection from '../../components/public/homepage/HomePage_ProductCard'
import BrowserByCategory from '../../components/public/homepage/HomeCategory'
import HeroSlider from '../../components/public/homepage/HomePage_slider'
import TrendySlide from '../../components/public/homepage/TrendingSlide'

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
