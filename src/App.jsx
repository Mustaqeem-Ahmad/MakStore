import React, { use, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./utils/AllRoutes";
import axios from "axios";
import { useCart } from "./context/CartContext";

const App = () => {

const [location, setLocation] = useState()
const [openDropdown, setOpenDropdown] = useState(false)
const {cartItem, setCartItem} = useCart()

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords;
      // console.log(longitude, latitude);

      const url = `http://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url,{
           headers: {
      'User-Agent': 'MakByte (mustaqueemkalim@gmail.com)'
        }
        });

        const exactLocation = location.data.address;
        setLocation(exactLocation);
        setOpenDropdown(false)


      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  //load cart from localstorage on initial render

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
  }, [])

  // save cart to local storage whenever it change

  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])
  

  return (
    <>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <AllRoutes location={location} getLocation={getLocation} />
    </>
  );
};

export default App;

// npm i react-router-dom
// npm i lucide-react
// npm i react-icons
// npm install @clerk/clerk-react
// navbar ki line 82 me clerk k likha hai
// npm i axios
// npm install react-slick
// npm install slick-carousel
// lottie files use kiye jb filter price 0 hoto
// npm i lottie-react

//  AGAR HAME SHAK HAI K KOI CHEEZ WORK KAREGI K NHI USKE AAGE ? LAGADO {location.country} {location?.country}

// react toastify jb product add hoto pop up ata
//npm i react-scroll-to-top