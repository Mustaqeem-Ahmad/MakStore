import React from 'react'
import banner from '../assets/banner1.jpg';

const MidBanner = () => {
  return (
    <div className='bg-gray-50 md:py-24'>
      <div
        className='relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px]'
        style={{ backgroundImage: `url(${banner})`, backgroundPosition:'center', backgroundAttachment: 'fixed' }}
      >
        <div className='absolute inset-0 bg-black/40 md:rounded-2xl flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4'>
              Stylish Products for Everyday Life
            </h1>
            <p className='text-lg md:text-xl mb-6'>
              Explore our curated collection of clothing, home essentials, and lifestyle products — delivered fast and with care.
            </p>
            <button className='bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MidBanner;