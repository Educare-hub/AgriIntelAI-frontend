// src/components/WeatherAnalytics.tsx
import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  rainfall: number;
}

export default function WeatherAnalytics() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace this URL with your real weather API if you have one
      const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-1.2921&longitude=36.8219&current_weather=true&hourly=humidity");
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();

      // Simulated mapping depending on API response
      setWeather({
        temperature: data.current_weather?.temperature ?? 16,
        humidity: data.hourly?.humidity ? data.hourly.humidity[0] : 70,
        windSpeed: data.current_weather?.windspeed ?? 5,
        windDirection: data.current_weather?.winddirection ?? 90,
        rainfall: data.hourly?.precipitation ? data.hourly.precipitation[0] : 0,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 1000 * 60 * 10); // update every 10 mins
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-4 bg-white rounded shadow">Loading weather...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded shadow">{error}</div>;

  return (
    <div className="dashboard-box p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">🌦 Weather Analytics</h2>
      <p>🌡 Temperature: {weather?.temperature} °C</p>
      <p>💧 Humidity: {weather?.humidity} %</p>
      <p>🌬 Wind Speed: {weather?.windSpeed} km/h</p>
      <p>🧭 Wind Direction: {weather?.windDirection}°</p>
      <p>☔ Rainfall: {weather?.rainfall} mm</p>
    </div>
  );
}
