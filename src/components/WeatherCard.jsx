import React, { useState } from 'react'
import './styles/weatherCard.css'
const WeatherCard = ({ weather, temp }) => {
    const [celsius, setCelsius] = useState(true)
    const handleTempUnit = () => {
        setCelsius(!celsius)
    }
    return (
        <article className='weather'>
            <header className='weather__header'>
                <h1 className='weather__title'>Weather App</h1>
                <h2 className='weather__subtitle'>{weather?.name}, {weather?.sys.country}</h2>
            </header>
            <section className='weather__body'>
                <div className='weather__img-container'>
                    <img src={weather ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png` : ''} alt="va un icono" />
                </div>
                <div className='weather__info'>
                    <h3 className='weather__info-title'>"{weather?.weather[0].description}"</h3>
                    <ul className='weather__list'>
                        <li className='weather__list-item'><span className='weather__list-lable'>Wind Speed</span><span className='weather__list-vaue'>{weather?.wind.speed} m/s</span></li>
                        <li className='weather__list-item'><span className='weather__list-lable'>Clouds</span><span className='weather__list-vaue'>{weather?.clouds.all} %</span></li>
                        <li className='weather__list-item'><span className='weather__list-lable'>Pressure</span><span className='weather__list-vaue'>{weather?.main.pressure} hPa</span></li>
                    </ul>
                </div>
            </section>
            <footer className='weather__footer'>
                <aside className='weather__temp'>{celsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</aside>
                <button className='weather__btn' onClick={handleTempUnit}>Change to {celsius ? '°F' : '°C'}</button>
            </footer>
            
        </article>
    )
}

export default WeatherCard