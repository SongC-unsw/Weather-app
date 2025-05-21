"use client";

export default function CurrentTemp({ temp }: { temp: number }) {
  if (!temp) return null;

  const celcius = temp - 273.15;
  return <div>{celcius.toFixed(1)}°C</div>;
}
