import React from 'react';
import Daytime from './Daytime';
import NightTime from './NightTime'; 

const LoadingSpinner = () => {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 18;

  return (
    <div className={`min-h-[80vh] flex justify-center items-center ${isDayTime ? 'bg-white' : 'bg-[#0D1117]'}`}>
      <div className={`${isDayTime ? 'sun-animation' : 'moon-animation'}`}>
        {isDayTime ? <Daytime /> : <NightTime fill="#f8f8f2"/>}
      </div>
    </div>
  );
}

export default LoadingSpinner;
