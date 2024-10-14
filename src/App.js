import "bootstrap/dist/css/bootstrap.css";
import logo from './logo.svg';
import './App.css';

import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";

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
  <div>
  <Container>
    <Row>
      <Col md={4} sm={4}>
        <h3>Select a city</h3>
        <Nav
          bsStyle="pills"
          stacked
          activeKey={activePlace}
          onSelect={index => {
            setActivePlace(index);
          }}
        >
          {PLACES.map((place, index) => (
            <NavItem key={index} eventKey={index}>{place.name}</NavItem>
          ))}
        </Nav>
      </Col>
      <Col md={8} sm={8}>
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </Col>
    </Row>
  </Container>
    </div>

  );
}

export default App;
