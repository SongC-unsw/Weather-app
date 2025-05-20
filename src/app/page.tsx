"use client";
import GetLocationBtn from "./components/getLocation";
import { useState } from "react";
export default function Home() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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
    </div>
  );
}
