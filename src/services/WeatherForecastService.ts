import { WeatherForecastResponse } from '../models/WeatherForecastResponse';
import axios, { AxiosResponse } from 'axios';

const apiKey = 'ae8dc1fbd551a48c9aa26e7779a1c198';

export class WeatherForecastService {
  getWeatherForecast(lat: number, lon: number): Promise<AxiosResponse<WeatherForecastResponse>> {
    return axios.get<WeatherForecastResponse>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`
    );
  }
}