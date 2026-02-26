import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'
import SingleProduct from '../pages/SingleProduct'
import CategoryProduct from '../pages/CategoryProduct'
import ProtectedRoute from '../components/ProtectedRoute'

const AllRoutes = ({location,getLocation}) => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/category/:category' element={<CategoryProduct/>} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<ProtectedRoute> <Cart location={location} getLocation={getLocation} /></ProtectedRoute>} />
    </Routes>
  )
}

export default AllRoutes