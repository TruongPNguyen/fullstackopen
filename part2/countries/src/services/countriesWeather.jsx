import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org'
const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getWeather}