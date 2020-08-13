import React from 'react';
import { WeatherForecastDetails, TemperatureSummary } from '../../models/WeatherForecastResponse';
import moment from 'moment';
import './DailyWeatherWidget.scss';
import { computed } from 'mobx';
import { getWeatherImageUrl } from '../../helpers/ImageHelper';
import { Units } from '../../models/Units';
import { getTemperature } from '../../helpers/TemperatureHelper';

export interface DailyWeatherWidgetProps {
  weatherDetails: WeatherForecastDetails;
  unit: Units;
}

export class DailyWeatherWidget extends React.Component<DailyWeatherWidgetProps> {
  @computed
  get dayOfWeek(): string {
    const today = moment();
    const target = moment(this.props.weatherDetails.dt, 'X');

    if (today.isSame(target, 'date')) {
      return 'Today';
    }

    return target.format('dddd');
  }

  @computed
  get imageUrl(): string {
    return getWeatherImageUrl(this.props.weatherDetails);
  }

  render() {
    const { max, min } = this.props.weatherDetails.temp as TemperatureSummary;
    const { unit } = this.props;

    return (
      <div className='daily-weather-widget-container'>
        <div className='day-of-week'>{this.dayOfWeek}</div>
        <img src={this.imageUrl} alt={this.props.weatherDetails.weather[0].description}></img>
        <div>{getTemperature(max, unit)}&nbsp;&nbsp;<span className='min-temperature'>{getTemperature(min, unit)}</span></div>
      </div>
    );
  }
}