import { useEffect, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch'


function App() {
  
  const [coords, setCoords] = useState()

  
  useEffect(()=>{
    const success=(position)=>{
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
  
    }
    navigator.geolocation.getCurrentPosition(success)
  },[])
  
  console.log(coords);
  return (
    <div>App</div>
  )
}

export default App
