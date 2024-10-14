import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from "react";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

function WeatherDisplay(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
 
  useEffect(() => {
    const zip = props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      setWeatherData(json);

    });
  }, []);

  if (!weatherData) return <div>Loading</div>;
  else 
  {
    const weather = weatherData.weather[0];
    return (

      <div>
      <h1>
        {weather.main} in {weatherData.name}
        <img src={iconUrl} alt={weatherData.description} />
      </h1>
      <p>Current: {weatherData.main.temp}°</p>
      <p>High: {weatherData.main.temp_max}°</p>
      <p>Low: {weatherData.main.temp_min}°</p>
      <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
    </div>
    );
  }
}

function App() {
  const [activePlace, setActivePlace] = useState(0);
  return (
    <div className="App">
      {PLACES.map((place, index) => (
        <button
          key={index}
          onClick={() => {
            setActivePlace(index);
          }}
        >
            {place.name}
        </button>
      ))}
      <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
    </div>

  );
}

export default App;
