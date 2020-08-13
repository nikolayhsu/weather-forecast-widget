import { WeatherForecastDetails } from '../models/WeatherForecastResponse';

export const getWeatherImageUrl = (weather: WeatherForecastDetails): string => {
  return `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
};
