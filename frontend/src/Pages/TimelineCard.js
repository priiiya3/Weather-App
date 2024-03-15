import React from 'react';

const TimelineCard = ({ timeline, weatherData }) => {
  const timelineData = weatherData[timeline] || [];
  if (timelineData.length === 0) return null;

  // Assuming the first entry for demonstration
  const currentData = timelineData[0].values;

  return (
    <div className="flex-1 p-4 bg-gray-100 rounded-md shadow">
      <h2 className="text-lg font-bold capitalize">{timeline} Forecast</h2>
      <p>Temperature: {currentData.temperature}°C</p>
      <p>Humidity: {currentData.humidity}%</p>
      <p>Wind Speed: {currentData.windSpeed} km/h</p>
    </div>
  );
};

export default TimelineCard;
