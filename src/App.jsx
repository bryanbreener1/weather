import { useEffect, useState } from 'react';
import './App.css'
import getApiKey from './utils/getApiKey'
import axios from 'axios';


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
          setTemp(res.data.main.temp)
        })
        .catch((err)=> console.log(err))
    }
  },[coords])

  console.log(weather);
  return (
    <article>
      <h1>Weather App</h1>
      <h2>{weather?.name}, {weather?.sys.country}</h2>
      <section>
        <img src={weather ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png` : ''} alt="va un icono" />
        <div className='wrapper'>
          <h3>"{weather?.weather[0].description}"</h3>
          <ul>
            <li><span>Wind Speed</span><span>{weather?.wind.speed}</span></li>
            <li><span>Clouds</span><span>{weather?.clouds.all}</span></li>
            <li><span>Pressure</span><span>{weather?.main.pressure}</span></li>
          </ul>
        </div>
      </section>
      <aside>{temp}</aside>
      <button>Change to °C</button>
    </article>
  )
}

export default App
