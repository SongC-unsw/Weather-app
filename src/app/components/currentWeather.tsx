/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useEffect } from "react";

type Props = {
  location: { latitude: number; longitude: number };
  onGetWeather: (weatherData: any) => void;
};

export default function CurrentWeather({ location, onGetWeather }: Props) {
  // 定义获取天气数据的函数
  const fetchWeatherData = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
      )
      .then((res) => {
        onGetWeather(res.data);
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

  return null;
}
