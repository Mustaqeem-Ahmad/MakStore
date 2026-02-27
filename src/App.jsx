import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AllRoutes from "./utils/AllRoutes";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

          const response = await axios.get(url);

          if (response?.data?.address) {
            setLocation(response.data.address);
            setOpenDropdown(false);
          } else {
            setLocation(null);
          }
        } catch (error) {
          console.log("Location fetch failed:", error);
          setLocation(null);
        }
      },
      (error) => {
        console.log("User denied location permission:", error);
        setLocation(null);
      }
    );
  };

  // Auto detect location once
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
      <AllRoutes location={location} getLocation={getLocation} />
    </>
  );
};

export default App;