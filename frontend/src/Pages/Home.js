import React from "react";
import { Link } from "react-router-dom";
import ForecastIcon from "../Components/ForecastIcon";
import LiveWeatherIcon from "../Components/LiveWeatherIcon";

const Home = () => {
  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-r from-blue-500 to-cyan-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-5">
        <Link
          to={"/live-weather"}
          className="transform hover:scale-105 transition duration-500 ease-in-out relative flex flex-col text-gray-800 bg-white/30 backdrop-blur-lg shadow-lg rounded-xl w-96 hover:bg-white/40"
        > 
          <div className="p-6 text-center">
            <div className="mb-4"><LiveWeatherIcon /></div>
            <h5 className="mb-4 text-xl font-semibold leading-snug text-black">
              Real-Time Weather
              {/* <circle cx="50" cy="50" r="5" className="pulsating-circle" /> */}
            </h5>
            <p className="text-base font-light leading-relaxed text-blue">
            Unleash instant weather updates at your fingertips! Simply enter your city name and dive into live updates – it's that easy!
            </p>
          </div>
        </Link>

        <Link
          to={"/forecast"}
          className="transform hover:scale-105 transition duration-500 ease-in-out relative flex flex-col mt-6 sm:mt-0 text-gray-800 bg-white/30 backdrop-blur-lg shadow-lg rounded-xl w-96 hover:bg-white/40"
        >
          <div className="p-6 text-center">
            <div className="mb-4"><ForecastIcon /></div>
            <h5 className="mb-4 text-xl font-semibold leading-snug text-black">
              Weather Forecast
            </h5>
            <p className="text-base font-light leading-relaxed text-blue">
            Discover the future of weather forecasting! Access real-time insights, from minute-by-minute precision to comprehensive hourly and daily forecasts, all tailored for you.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
