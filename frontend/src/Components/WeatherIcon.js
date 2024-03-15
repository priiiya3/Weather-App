import React from 'react'
import Cloud from './Cloud'
import MizzleEffect from './MizzleEffect'
import NightTime from './NightTime'
import Daytime from './Daytime'

const WeatherIcon = ({cloudCover, precipitationProbability, isNight}) => {
  return (
    cloudCover >= 90 ? (
      <Cloud />
    ) :
    precipitationProbability >= 1 ? (
      <MizzleEffect />
    ) : isNight ? (
      <NightTime fill={"#FFFFFF"} />
    ) : (
      <Daytime />
    )
  )
}

export default WeatherIcon