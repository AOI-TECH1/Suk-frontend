import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/images/About1.png'
import img2 from '../assets/images/vision.png'
import img3 from '../assets/images/value.png'

const About = () => {
  return (
    <div className=" mx-auto py-16">

      
      <div className="relative flex items-center justify-center py-6">

  
  <h2 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
    About Us
  </h2>

  
  <nav 
    aria-label="breadcrumb"
    className="absolute right-4 md:right-10"
  >
    <ol className="flex items-center space-x-2 text-sm text-gray-500">

      <li>
        <Link 
          to="/" 
          className="hover:text-blue-500"
        >
          Home
        </Link>
      </li>

      <li>/</li>

      <li className="text-black font-medium">
        About
      </li>

    </ol>
  </nav>

</div>


      <div className="mt-10 mx-auto w-[80%] py-6 space-y-6 flex flex-col md:flex-row md:space-x-10 md:space-y-0">
        <section className="w-full md:w-1/2">
            <img src={img1} alt="About Us" className="w-full h-[450px] object-cover  mb-6 rounded-lg shadow-md" />
        </section>
        <section className="w-full py-14 md:w-1/2 ">
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p className="text-gray-700">
                Suk is a dynamic e-commerce platform designed to offer a seamless shopping experience to customers while providing robust management tools for merchants. This website is a one-stop-shop for a wide range of products, from electronics and fashion to home goods and groceries, catering to diverse consumer needs.
            </p>
            <p className="text-gray-700 py-4">Suk is not just an e-commerce website; it is a comprehensive platform designed to meet the evolving needs of modern shoppers and businesses, making online shopping enjoyable, efficient, and secure.</p>
        </section>
      </div>

      <div className="w-full bg-amber-300 mt-10 py-10">
  <div className=" w-[80%] mx-auto flex flex-col md:flex-row md:space-x-10 md:space-y-0">

    {/* Text Section */}
    <section className="w-full md:w-1/2 py-14">
      <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
      <p className="text-gray-700 mb-4">
        To revolutionize the online shopping experience by seamlessly connecting consumers with a diverse range of products and empowering merchants with innovative tools, all while prioritizing customer satisfaction, security, and convenience.
      </p>
      <p className="text-gray-700">
        Suk focuses on catering to the unique preferences and needs of local markets. By offering multi-language and multi-currency support, along with region-specific promotions and products, Suk ensures a personalized shopping experience for customers around the world.
      </p>
    </section>

    {/* Image Section */}
    <section className="w-full md:w-1/2">
      <img 
        src={img2} 
        alt="Our Vision" 
        className="w-full h-[450px] object-cover rounded-lg shadow-md"
      />
    </section>

  </div>
</div>


      <div className="w-[80%] mx-auto mt-10 py-6 space-y-6 flex flex-col md:flex-row md:space-x-10 md:space-y-0">
        <section className="w-full md:w-1/2">
            <img src={img3} alt="About Us" className="w-full h-[450px] object-cover  mb-6 rounded-lg shadow-md" />
        </section>
        <section className="w-full py-14 md:w-1/2 ">
            <h3 className="text-2xl font-semibold mb-4">Our Value</h3>
            <p className="text-gray-700">
                Suk e-commerce platform is built on a foundation of core values that guide every aspect of its operations, ensuring that the platform remains customer-focused, innovative, and responsible. These values are integral to Suk's mission of revolutionizing the online shopping experience.
            </p>
            <p className="text-gray-700 py-4">Our values are the driving force behind our vision to revolutionize the online shopping experience. By adhering to these principles, we aims to create a trusted, innovative, and inclusive platform that benefits customers, merchants, and the wider community. These values ensure that Suk remains committed to its mission of providing a superior e-commerce experience while fostering sustainable growth and positive social impact.</p>
        </section>
      </div>

    </div>
  )
}

export default About
