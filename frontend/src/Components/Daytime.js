import React from 'react';

const Daytime = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 122.88 122.88"
        height="56"
        width="56"
      >
        <defs>
          <radialGradient id="sunGradient" cx="61.44" cy="61.44" r="61.44" fx="61.44" fy="61.44">
            <stop offset="0%" style={{stopColor: '#FFD700'}} />
            <stop offset="100%" style={{stopColor: '#FFA500'}} />
          </radialGradient>
        </defs>
        <circle cx="61.44" cy="61.44" r="35" fill="url(#sunGradient)"/>
        <g fill="#FFD700">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="60.44"
              y="10.44"
              width="2"
              height="20"
              rx="1"
              transform={`rotate(${i * 30} 61.44 61.44)`}
            />
          ))}
        </g>
      </svg>
  );
};

export default Daytime;
