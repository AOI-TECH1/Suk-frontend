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