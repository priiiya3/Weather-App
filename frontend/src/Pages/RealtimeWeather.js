import axios from "axios";
import React, { useEffect, useState } from "react";
import LocationInput from "./Assets/LocationInput";
import WeatherDisplay from "./Assets/WeatherDisplay";
import LoadingSpinner from "../Components/LoadingSpinner";
import Lottie from "react-lottie";
import './Styles/RealTimeWeather.css'; 

const RealtimeWeather = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [isNight, setIsNight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const WeatherKey = process.env.REACT_APP_WEATHER_KEY;

  const defaultOptionsCancel = {
    loop: false,
    autoplay: true,
    animationData: require("../Assets/animations/warning.json"),
  };

  const fetchWeatherData = async (url) => {
    try {
      setLoading(true);
      setLocation(null);
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching weather data:", error);
      setError("Server Busy!!! Error fetching weather data. Please try again later.");
    }
  };

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${WeatherKey}`;
      fetchWeatherData(url);
    }
  }, [location, WeatherKey]);

  useEffect(() => {
    const determineBackground = () => {
      if (weatherData && weatherData.data && weatherData.data.time) {
        const time = new Date(weatherData.data.time);
        const hour = time.getHours();
        setIsNight(hour < 6 || hour > 18);
      }
    };
    if (weatherData) {
      determineBackground();
    }
  }, [weatherData]);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    if (searchLocation.trim() !== "") {
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${searchLocation}&apikey=${WeatherKey}`;
      fetchWeatherData(url);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log("Error getting current location:", error);
            setError("Error getting current location.");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center transition-colors duration-500 overflow-y-hidden bg-gradient-to-b from-yellow-100 to-blue-300`}>
      <img width="68" height="68" src="https://img.icons8.com/emoji/48/sun-with-face.png" alt="sun-with-face"/>
      <h2 className="text-xl text-black">
        Welcome to Live Weather Update. Type Your City Name Below and get the Live Update NOW!
      </h2>
      <div className="w-full max-w-md px-4 app-container">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <section className="mb-8 search-group">
              <LocationInput
                locationQuery={searchLocation}
                setLocationQuery={setSearchLocation}
                setCurrentLocation={setLocation}
                onSearch={handleSearch}
              />
            </section>

            <section>
              {error ? (
                <div className="flex flex-col items-center p-4">
                  <div className="flex justify-center items-center">
                    <Lottie options={defaultOptionsCancel} height={150} width={300} />
                  </div>
                  <div className="text-center text-white text-2xl font-semibold mt-4">
                    {error}
                  </div>
                </div>
              ) : (
                weatherData && weatherData.location && (
                  <WeatherDisplay weatherData={weatherData} isNight={isNight} />
                )
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default RealtimeWeather;
