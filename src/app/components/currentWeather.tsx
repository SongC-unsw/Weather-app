"use client";
import axios from "axios";
import { useState, useEffect } from "react";

type Props = {
  location: { latitude: number; longitude: number };
};

export default function CurrentWeather({ location }: Props) {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
      )
      .then((res) => {
        setWeatherData(res.data);
        console.log(res.data);
      });
  }, [location.latitude, location.longitude]);

  return (
    <div>
      <h1>Current Weather</h1>
      {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
        <div>
          <p>Current Country: {weatherData.sys.country}</p>
          <p>Current City: {weatherData.name}</p>
          <p>Current Temperature: {weatherData.main.temp}</p>
          <p>Current Weather: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}
