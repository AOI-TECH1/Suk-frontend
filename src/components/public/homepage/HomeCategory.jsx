<<<<<<< Updated upstream
import React from 'react'
import { FaHouseLaptop, FaGamepad } from "react-icons/fa6";
import { IoPhonePortraitOutline, IoCameraOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";
import { FaHeadphonesAlt } from "react-icons/fa";

const BrowserByCategory = () => {
  return (
    <div className="px-4 pb-4">
      <h1 className='text-center text-lg sm:text-xl font-bold py-7'>
        Browse By Category
      </h1>

      <section className='flex flex-wrap justify-center gap-4 pt-2'>

        <div className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-4 sm:p-6 rounded-2xl bg-amber-100 flex flex-col items-center justify-center'>
          <IoPhonePortraitOutline className='text-xl sm:text-2xl'/>
          <h4 className='py-2 sm:py-4 text-sm sm:text-base'>Phones</h4>
        </div>

        <div className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-4 sm:p-6 rounded-2xl bg-amber-100 flex flex-col items-center justify-center'>
          <FaHouseLaptop className='text-xl sm:text-2xl' />
          <h4 className='py-2 sm:py-4 text-sm sm:text-base'>Computers</h4>
        </div>

        <div className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-4 sm:p-6 rounded-2xl bg-amber-100 flex flex-col items-center justify-center'>
          <BsSmartwatch className='text-xl sm:text-2xl' />
          <h4 className='py-2 sm:py-4 text-sm sm:text-base'>Smartwatch</h4>
        </div>

        <div className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-4 sm:p-6 rounded-2xl bg-amber-100 flex flex-col items-center justify-center'>
          <IoCameraOutline className='text-xl sm:text-2xl' />
          <h4 className='py-2 sm:py-4 text-sm sm:text-base'>Camera</h4>
        </div>

        <div className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-4 sm:p-6 rounded-2xl bg-amber-100 flex flex-col items-center justify-center'>
          <FaHeadphonesAlt className='text-xl sm:text-2xl' />
          <h4 className='py-2 sm:py-4 text-sm sm:text-base'>Headphones</h4>
        </div>

        <div className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-4 sm:p-6 rounded-2xl bg-amber-100 flex flex-col items-center justify-center'>
          <FaGamepad className='text-xl sm:text-2xl' />
          <h4 className='py-2 sm:py-4 text-sm sm:text-base'>Game</h4>
        </div>

      </section>
    </div>
  )
}

export default BrowserByCategory
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHouseLaptop, FaGamepad } from "react-icons/fa6";
import { IoPhonePortraitOutline, IoCameraOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";
import { FaHeadphonesAlt } from "react-icons/fa";

const BrowserByCategory = () => {
  // 1. DATA ARRAY: Matches your backend category names and slugs exactly
  const categories = [
    { name: "Phones", slug: "smartphones", icon: <IoPhonePortraitOutline /> },
    { name: "Computers", slug: "laptops", icon: <FaHouseLaptop /> },
    { name: "Smartwatch", slug: "watches", icon: <BsSmartwatch /> },
    { name: "Camera", slug: "cameras", icon: <IoCameraOutline /> },
    { name: "Headphones", slug: "audio-headphones", icon: <FaHeadphonesAlt /> },
    { name: "Game", slug: "pc-gaming", icon: <FaGamepad /> },
  ];

  return (
    <div className="px-4 pb-10">
      {/* SECTION TITLE */}
      <h2 className="text-center text-xl sm:text-2xl font-black py-10 uppercase tracking-tighter text-zinc-900 italic">
        Browse By <span className="text-[#fbb03b]">Category</span>
      </h2>

      {/* CATEGORY GRID */}
      <section className="flex flex-wrap justify-center gap-4 pt-2 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link 
            to={`/category/${cat.slug}`} 
            key={cat.slug}
            className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[14%] p-5 sm:p-8 rounded-[24px] bg-[#fff9e6] border border-orange-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#fbb03b] hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1 group"
          >
            {/* ICON - Scales up and turns white on hover */}
            <div className="text-2xl sm:text-3xl text-zinc-800 group-hover:text-white transition-all duration-300 group-hover:scale-110">
              {cat.icon}
            </div>
            
            {/* TEXT - Turns white on hover */}
            <h4 className="py-3 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-tighter text-zinc-800 group-hover:text-white transition-colors">
              {cat.name}
            </h4>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default BrowserByCategory;
>>>>>>> Stashed changes
