import { getWeatherImageUrl } from './ImageHelper';
import { WeatherForecastDetails } from '../models/WeatherForecastResponse';

const data: WeatherForecastDetails = {
  dt: 1597277311,
  sunrise: 1597265220,
  sunset: 1597303823,
  temp: 283.7,
  feels_like: 281.88,
  pressure: 1015,
  humidity: 87,
  dew_point: 281.63,
  uvi: 3.3,
  clouds: 75,
  visibility: 10000,
  wind_speed: 2.1,
  wind_deg: 180,
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }
  ]
};

describe('ImageHelper', () => {
  test('should m/s to km/h', () => {
    const result = getWeatherImageUrl(data);
    expect(result).toEqual('https://openweathermap.org/img/wn/04d@2x.png');
  });
});