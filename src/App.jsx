import { useEffect, useState } from 'react';
import './App.css'
import getApiKey from './utils/getApiKey'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';


function App() {
  
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  
  useEffect(()=>{
    const success=(position)=>{
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
  
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])

  useEffect(()=>{
    if(coords){
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${getApiKey()}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          setTemp({
            celsius: (res.data.main.temp -273.15).toFixed(1),
            farenheit: ((res.data.main.temp -273.15) * 9/5 +32).toFixed(1),
          })
        })
        .catch((err)=> console.log(err))
    }
  },[coords])

  return (
    <div className='app'>
      {weather
      ? <WeatherCard weather={weather} temp={temp}/>
      : <Loading/>

      }
    </div>
  )
}

export default App
