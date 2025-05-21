"use client";
import GetLocationBtn from "./components/getLocation";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";
import CountryInput from "./components/countryInput";
import axios from "axios";
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
  const onGetWeather = (weatherData: string) => {
    setWeather(weatherData);
  };

  const backgroundImage = weather
    ? `/weather-cover-image/${weather}.jpg`
    : "/weather-cover-image/default.jpg";

  return (
    <div
      className="flex flex-col gap-5 items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <GetLocationBtn onHandleLocation={handleLocation} />
      <CurrentWeather location={coordinates} onGetWeather={onGetWeather} />
      <CountryInput onHandleCheckWeather={handleCheckWeather} />
    </div>
  );
}
