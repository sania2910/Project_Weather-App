import React from 'react'
import TopButtons from './components/TopButtons'
import Input from './components/Input'
import TimeandLocation from './components/TimeandLocation'
import TemAndDetails from './components/TemAndDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [query,setQuery] = useState({q : "ahmedabad"})
  const [units, setUnits] = useState('metric')
  const [weather,setWeather] = useState(null)
  const getWeather =  async ()=> {
    const message = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${message.toUpperCase()}`);
    const data = await getFormattedWeatherData({...query,units }).then(data => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data)

    });
    console.log(data);
  };
  useEffect(() => {
getWeather();
  },[query,units]);
  
 

  return (
    <div className='mx-auto max-w-screen mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700

    '>
      <TopButtons setQuery={setQuery}/>
      <Input setQuery={setQuery} setUnits={setUnits}/>
      {weather && (
<>
<TimeandLocation weather={weather}/>
      <TemAndDetails weather={weather} units={units}/>
      <Forecast title='3 hour step forecast' data={weather.hourly}/>
      <Forecast title='daily forecast' data={weather.daily}/>
</>
      )}
      <ToastContainer autoClose={2500} theme="colored"/>
    </div>
  )
}

export default App
