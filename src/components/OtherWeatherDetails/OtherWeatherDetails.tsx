import React from 'react';
import { WeatherForecastDetails } from '../../models/WeatherForecastResponse';
import { Units } from '../../models/Units';
import './OtherWeatherDetails.scss';
import { getTemperature, getTemperatureSymbol } from '../../helpers/TemperatureHelper';
import { computed } from 'mobx';
import { getWindSpeed, getWindSpeedUnit } from '../../helpers/WindHelper';

export interface OtherWeatherDetailsProps {
  weatherDetails: WeatherForecastDetails;
  unit: Units;
}

export class OtherWeatherDetails extends React.Component<OtherWeatherDetailsProps> {
  @computed
  get temperatureSymbol(): string {
    return getTemperatureSymbol(this.props.unit);
  }

  render() {
    const { feels_like, humidity, wind_speed, uvi } = this.props.weatherDetails;
    const { unit } = this.props;

    return <div className='other-weather-details'>
      <div>Feels like: <span>{getTemperature(feels_like as number, unit)} {this.temperatureSymbol}</span></div>
      <div>Humidity: <span>{humidity}%</span></div>
      <div>Wind: <span>{getWindSpeed(wind_speed, unit)} {getWindSpeedUnit(unit)}</span></div>
      <div>UV Index: <span>{Math.round(uvi)}</span></div>
    </div>;
  }
}