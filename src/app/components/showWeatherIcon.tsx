export default function ShowWeatherIcon({
  weather,
  weatherCode,
}: {
  weather: string;
  weatherCode: string;
}) {
  return (
    <div className="w-[200px] h-[200px]">
      <img
        src={`/assets/${weatherCode}.svg`}
        alt={weather}
        className="w-full h-full"
      />
    </div>
  );
}
