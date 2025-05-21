"use client";
import GetLocationBtn from "./components/getLocation";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";
import CountryInput from "./components/countryInput";
import axios from "axios";
import ShowWeatherIcon from "./components/showWeatherIcon";
export default function Home() {
  const defaultCoordinates = {
    latitude: 35.6764,
    longitude: 139.65,
  };
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>(defaultCoordinates);

  const [weather, setWeather] = useState<string>("");
  const [weatherCode, setWeatherCode] = useState<string>("");
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const handleCheckWeather = async (location: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    ); //geocoding api
    setCoordinates({
      latitude: response.data[0].lat,
      longitude: response.data[0].lon,
    });
  };
  const onGetWeather = (weatherData: string, weatherCode: string) => {
    setWeather(weatherData);
    setWeatherCode(weatherCode);
  };

  const backgroundImage = weather
    ? `/weather-cover-image/${weather}.jpg`
    : "/weather-cover-image/default.jpg";

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-white/50 backdrop-blur-sm"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="flex flex-col gap-5 items-center justify-center rounded-xl shadow-lg bg-white/80 p-10 w-[700px]">
        <div className="flex gap-5 items-center justify-center">
          <CountryInput onHandleCheckWeather={handleCheckWeather} />
          <GetLocationBtn onHandleLocation={handleLocation} />
        </div>
        <ShowWeatherIcon weather={weather} weatherCode={weatherCode} />
        <CurrentWeather location={coordinates} onGetWeather={onGetWeather} />
      </div>
    </div>
  );
}
