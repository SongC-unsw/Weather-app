"use client";
import GetLocationBtn from "./components/getLocation";
import { useState } from "react";
import CurrentWeather from "./components/currentWeather";

export default function Home() {
  const defaultCoordinates = {
    latitude: 35.6764,
    longitude: 139.65,
  };
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  }>(defaultCoordinates);
  const [error, setError] = useState<string | null>(null);

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
          setError(error.message);
        }
      );
    } else {
      setError("Cant get location");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <GetLocationBtn onHandleLocation={handleLocation} />
      <CurrentWeather location={coordinates} />
    </div>
  );
}
