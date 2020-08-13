export interface TemperatureSummary {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherForecastDetails {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: FeelsLike | number;
  humidity: number;
  pop?: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: TemperatureSummary | number;
  uvi: number;
  visibility?: number;
  weather: WeatherInfo[];
  wind_deg: number;
  wind_speed: number;
}

export interface WeatherForecastResponse {
  current: WeatherForecastDetails;
  daily: WeatherForecastDetails[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export function isTemperatureSummary(tempSummary: TemperatureSummary | number): tempSummary is TemperatureSummary {
  return (<TemperatureSummary>tempSummary).day != null;
}