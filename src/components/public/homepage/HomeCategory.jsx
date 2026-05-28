import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { FaHouseLaptop, FaGamepad } from "react-icons/fa6";
import { IoPhonePortraitOutline, IoCameraOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";
import { FaHeadphonesAlt } from "react-icons/fa";

const BrowserByCategory = () => {
  // 2. Create a data array to make the code cleaner and easier to manage
  const categories = [
    { name: 'Phones', icon: IoPhonePortraitOutline, slug: 'phones' },
    { name: 'Computers', icon: FaHouseLaptop, slug: 'computers' },
    { name: 'Smartwatch', icon: BsSmartwatch, slug: 'smartwatch' },
    { name: 'Camera', icon: IoCameraOutline, slug: 'camera' },
    { name: 'Headphones', icon: FaHeadphonesAlt, slug: 'headphones' },
    { name: 'Game', icon: FaGamepad, slug: 'game' },
  ];

  return (
    <div className="px-4 pb-10 max-w-7xl mx-auto">
      <h1 className='text-center text-xl sm:text-2xl font-black uppercase  tracking-tighter py-10'>
        Browse By Category
      </h1>

      <section className='flex flex-wrap justify-center gap-4 pt-2'>
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            to={`/shop?category=${cat.slug}`} 
            className='w-[45%] sm:w-[30%] md:w-[22%] lg:w-[15%] p-6 rounded-2xl bg-amber-100/50 border border-transparent flex flex-col items-center justify-center transition-all duration-300 hover:bg-[#fbb03b] hover:text-white hover:scale-105 hover:shadow-lg group'
          >
            {/* The "group-hover" classes make the icon change when the box is hovered */}
            <cat.icon className='text-2xl sm:text-3xl transition-transform group-hover:rotate-12' />
            <h5 className='pt-4 text-xs sm:text-sm font-black uppercase tracking-widest'>
              {cat.name}
            </h5>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default BrowserByCategory;