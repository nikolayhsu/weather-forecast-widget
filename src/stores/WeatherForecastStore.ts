import { WeatherForecastService } from '../services/WeatherForecastService';
import { observable, action } from 'mobx';
import { WeatherForecastResponse } from '../models/WeatherForecastResponse';
import { Units } from '../models/Units';

const SYDNEY_LAT = -33.85;
const SYDNEY_LON = 151.2;

export class WeatherForecastStore {
  private readonly service: WeatherForecastService = new WeatherForecastService();

  @observable data: WeatherForecastResponse;
  @observable unit: Units = Units.Metric;
  @observable lat: number;
  @observable lon: number;
  @observable cityName: string;

  @action
  init() {
    this.getCurrentLocation();
  }

  @action
  getCurrentLocation() {
    // Default to Sydney if current location is unavailable
    if (!(navigator && navigator.geolocation)) {
      this.lat = SYDNEY_LAT;
      this.lon = SYDNEY_LON;
      this.cityName = 'Sydney';
      this.load();
      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.lat = coords.latitude;
      this.lon = coords.longitude;
      this.cityName = 'Current location';
      this.load();
    }, () => {
      this.lat = SYDNEY_LAT;
      this.lon = SYDNEY_LON;
      this.cityName = 'Sydney';
      this.load();
    }, { timeout: 3000, enableHighAccuracy: false });
  }

  @action
  toggleUnit() {
    this.unit = this.unit === Units.Metric ? Units.Imperial : Units.Metric;
  }

  @action
  async load() {
    const response = await this.service.getWeatherForecast(this.lat, this.lon);
    this.data = response.data;
  }
}