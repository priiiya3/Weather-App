import React from "react";

const MizzleEffect = () => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="100%" height="100%" fill="#4A90E2" />

      {/* Clouds */}
      <g fill="#FFF">
        <ellipse cx="400" cy="300" rx="180" ry="80" />
        <ellipse cx="550" cy="350" rx="140" ry="70" />
        <ellipse cx="250" cy="350" rx="120" ry="60" />
      </g>

      {/* Raindrops */}
      <g fill="#BFDFFF">
        {Array.from({ length: 8 }).map((_, index) => (
          <path
            key={index}
            d={`M${250 + index * 70},500 
               c0,-20 40,-20 40,0
               c0,20 -40,20 -40,0
               `}
            stroke="#BFDFFF"
            strokeWidth="2"
            fill="transparent"
          />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <path
            key={index}
            d={`M${275 + index * 70},600 
               c0,-20 40,-20 40,0
               c0,20 -40,20 -40,0
               `}
            stroke="#BFDFFF"
            strokeWidth="2"
            fill="transparent"
          />
        ))}
      </g>
    </svg>
  );
};

export default MizzleEffect;
