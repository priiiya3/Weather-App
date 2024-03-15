import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDayThunderstorm } from 'react-icons/wi';

const WeatherForecast = () => {
  const [locationQuery, setLocationQuery] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_KEY = 'DGDehNf5l2ypfH8lstF5iPaFyN2bQQar';

  const fetchWeatherData = async () => {
    if (!locationQuery) {
      setError('Now Click on the Get Weather button to get the weather of your current location');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://api.tomorrow.io/v4/timelines`, {
        params: {
          location: locationQuery,
          apikey: API_KEY,
          fields: ['temperature', 'humidity', 'weatherCode'],
          units: 'metric',
          timesteps: ['1h'],
        },
      });

      const data = response.data.data.timelines[0].intervals[0].values;
      setWeatherData(data);
    } catch (err) {
      setError(`Failed to fetch weather data: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          setLocationQuery(coords);
          fetchWeatherData(coords);
        },
        () => {
          setError('Failed to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Placeholder function for determining the weather icon based on weather code
  const getWeatherIcon = (weatherCode) => {
    if (weatherCode < 300) {
      return <WiDayThunderstorm size={64} />;
    } else if (weatherCode < 600) {
      return <WiRain size={64} />;
    } else if (weatherCode < 700) {
      return <WiSnow size={64} />;
    } else if (weatherCode < 800) {
      return <WiCloudy size={64} />;
    } else {
      return <WiDaySunny size={64} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-500 overflow-y-hidden bg-gradient-to-b from-yellow-100 to-blue-300">
  <div className="p-6 rounded-lg shadow-lg text-center transition-colors duration-500 overflow-y-hidden bg-gradient-to-r from-blue-100 to-orange-300">
    <img className='sum-image' width="68" height="68" src="https://img.icons8.com/emoji/48/sun-with-face.png" alt="sun-with-face"/>
    <h2 className="text-xl text-black">
      Welcome to Live Weather Update. Type Your City Name Below and get the Live Update NOW!
    </h2>
    <input
      type="text"
      value={locationQuery}
      onChange={(e) => setLocationQuery(e.target.value)}
      placeholder="Enter city name"
      className="input border p-2 w-full rounded my-2"
    />
    <div className="flex justify-center gap-4">
      <button onClick={fetchWeatherData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Get Weather</button>
      <button onClick={handleUseCurrentLocation} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Use Current Location</button>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {weatherData.temperature && (
      <div className="mt-4">
        {getWeatherIcon(weatherData.weatherCode)}
        <h2 className="text-xl font-bold">{locationQuery}</h2>
        <p>Temperature: {weatherData.temperature}°C</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Weather Code: {weatherData.weatherCode}</p>
      </div>
    )}
    <button
      onClick={() => navigate(-1)} // Navigate back
      className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Back
    </button>
  </div>
</div>

  );
};

export default WeatherForecast;
