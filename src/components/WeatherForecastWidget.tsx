import React from 'react';
import { WeatherForecastStore } from '../stores/WeatherForecastStore';
import { observer } from 'mobx-react';
import moment from 'moment';
import 'moment-timezone';
import { DailyWeatherWidget } from './DailyWeatherWidget/DailyWeatherWidget';
import './WeatherForecastWidget.scss';
import { CurrentWeatherTemperature } from './CurrentWeatherTemperature/CurrentWeatherTemperature';
import { OtherWeatherDetails } from './OtherWeatherDetails/OtherWeatherDetails';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { computed } from 'mobx';
import { Typeahead } from './Typeahead/Typeahead';

export interface WeatherForecastWidgetProps {
  store: WeatherForecastStore;
}

@observer
export class WeatherForecastWidget extends React.Component<WeatherForecastWidgetProps> {
  @computed
  get localDateTime(): string {
    const { data } = this.props.store;
    
    if (!data) {
      return '';
    }

    return moment(data.current.dt, 'X').tz(data.timezone).format('dddd, DD MMMM YYYY HH:mm');
  }

  render() {
    const { data, unit } = this.props.store;

    if (!data) {
      return null;
    }

    return <div className='weather-forecast-widget'>
      <Typeahead store={this.props.store}></Typeahead>
      <h1>{this.props.store.cityName}</h1>
      <div>{this.localDateTime}</div>
      <div>{data.current.weather[0].main}</div>
      <div className='current-weather-details'>
        <CurrentWeatherTemperature weatherDetails={data.current} unit={unit}>
        </CurrentWeatherTemperature>
        <OtherWeatherDetails weatherDetails={data.current} unit={unit}>
        </OtherWeatherDetails>
      </div>
      <button className="btn btn-primary change-unit-button" onClick={() => this.props.store.toggleUnit()}>Metric/Imperial</button>
      <div className='daily-weather-container'>
        {
          data.daily.map((weather, index) => {
            if (index > 6) {
              return null;
            }

            return <DailyWeatherWidget key={index} weatherDetails={weather} unit={unit}></DailyWeatherWidget>;
          })
        }
      </div>
    </div>;
  }
}