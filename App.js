import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "./assets/logo.png";
import banner from "./assets/banner.png";
import { signInWithGoogle } from "./pages/firebase";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          // Handle geolocation error
          console.log(error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      // Handle the error or show an appropriate message
      console.log("Geolocation is not supported");
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <img src={logo} alt="Logo" className="logo" />
          </li>
        </ul>
        <div className="buttons">
          <button className="login-button" onClick={signInWithGoogle}>
            LOG IN
          </button>
          <button className="signup-button" onClick={signInWithGoogle}>
            SIGN IN
          </button>
        </div>
      </div>

      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h2>
              <span className="get">Get Awareness Through</span>
            </h2>
            <h1>
              <span className="title">Wellness.ai</span>
            </h1>
            <br />
            <button className="header-button" onClick={signInWithGoogle}>
              Get Started
            </button>
            <p className="tagline">
              "Embrace Your Mind, Empower Your Life:
              <br />
              Mental Health Matters"
            </p>
          </div>

          <div className="header-image">
            <img src={banner} alt="Header Image" />
          </div>
        </div>
      </div>

      {/* <div className="geolocation-info">
        {latitude && longitude ? (
          <p>
            Latitude: {latitude.toFixed(6)}, Longitude: {longitude.toFixed(6)}
          </p>
        ) : (
          <p>Fetching geolocation...</p>
        )}
      </div> */}
    </>
  );
}

export default App;
