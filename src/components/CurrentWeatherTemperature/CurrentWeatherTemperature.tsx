import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import { getWeatherImageUrl } from '../../helpers/ImageHelper';
import { WeatherForecastDetails } from '../../models/WeatherForecastResponse';
import './CurrentWeatherTemperature.scss';
import { Units } from '../../models/Units';
import { getTemperature, getTemperatureSymbol } from '../../helpers/TemperatureHelper';

export interface CurrentWeatherTemperatureProps {
  weatherDetails: WeatherForecastDetails;
  unit: Units;
}

@observer
export class CurrentWeatherTemperature extends React.Component<CurrentWeatherTemperatureProps> {
  @computed
  get imageUrl(): string {
    return getWeatherImageUrl(this.props.weatherDetails);
  }

  @computed
  get temperatureSymbol(): string {
    return getTemperatureSymbol(this.props.unit);
  }

  render() {
    const temp = this.props.weatherDetails.temp as number;

    return <div className='current-weather-temperature'>
      <img src={this.imageUrl} alt={this.props.weatherDetails.weather[0].description}></img>
      <div className='temperature'>{getTemperature(temp, this.props.unit)} <span className='degree-symbol'>{this.temperatureSymbol}</span></div>
    </div>;
  }
}