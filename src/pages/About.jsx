import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">About MakStore</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-pink-600">MakStore</span>, your one-stop destination for quality products across clothing, home, beauty, and lifestyle essentials. We’re here to make shopping simple, enjoyable, and affordable for everyone.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At MakStore, our mission is to bring you everyday products that combine style, functionality, and value. We’re passionate about helping you find the perfect items for your home, wardrobe, and lifestyle — all delivered with care and reliability.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600">Why Choose MakStore?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Wide range of products from trusted brands</li>
            <li>Fast, secure, and reliable shipping</li>
            <li>Friendly customer support ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We envision a shopping experience that’s convenient, enjoyable, and accessible to everyone. At MakStore, we’re committed to offering products that enhance your daily life — with style, quality, and affordability.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-pink-600 mb-2">Join the MakStore Family</h3>
          <p className="text-gray-700 mb-4">
            Whether you're looking for trendy clothing, home essentials, or lifestyle products — MakStore has something for everyone.
          </p>
          <Link to={'/products'}>
            <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition duration-300">
              Start Shopping
            </button>
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default About