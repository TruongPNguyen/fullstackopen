import React, { useState, useEffect } from 'react';
import weatherService from '../services/countriesWeather'

const CountryWeather = ({lat, lon}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
          .getWeather(lat, lon)
          .then(response => {
            setWeather(response)
          })
      }, [])
    
    if (!weather)  {
        return (
            <div> Loading... </div>
        )
    } 

    return (
        <div> 
            <p>Temperature : {weather.main.temp} F</p>
            <p>Wind : {weather.wind.speed} MPH</p>
            <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        </div>
    )
}

export default CountryWeather