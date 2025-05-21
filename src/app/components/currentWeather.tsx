/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useState, useEffect } from "react";

type Props = {
  location: { latitude: number; longitude: number };
  onGetWeather: (weatherData: string, weatherCode: string) => void;
};

export default function CurrentWeather({ location, onGetWeather }: Props) {
  const [weatherData, setWeatherData] = useState<any>(null);

  // 定义获取天气数据的函数
  const fetchWeatherData = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
      )
      .then((res) => {
        setWeatherData(res.data);
        onGetWeather(res.data.weather[0].main, res.data.weather[0].icon);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data");
      });
  };

  useEffect(() => {
    // 立即获取一次数据
    fetchWeatherData();

    // 设置每10分钟轮询一次
    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, 60 * 1000);

    // 清理函数，组件卸载时清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, [location.latitude, location.longitude]);

  return (
    <div>
      {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
        <div>
          <p>Current Country: {weatherData.sys.country}</p>
          <p>Current City: {weatherData.name}</p>
          <p>
            Current Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C{" "}
          </p>
          <p>Current Weather: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}
