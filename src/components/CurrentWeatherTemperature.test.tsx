import React from 'react';
import { shallow } from 'enzyme';
import { CurrentWeatherTemperature } from './CurrentWeatherTemperature';
import { Units } from '../models/Units';
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

it('should display temperature in text', () => {
  const wrapper = shallow(<CurrentWeatherTemperature weatherDetails={data} unit={Units.Metric} />);
  const test = <div className='temperature'>11 <span className='degree-symbol'>°C</span></div>;

  const wrapper2 = shallow(<CurrentWeatherTemperature weatherDetails={data} unit={Units.Imperial} />);
  const test2 = <div className='temperature'>51 <span className='degree-symbol'>°F</span></div>;

  expect(wrapper.contains(test)).toEqual(true);
  expect(wrapper2.contains(test2)).toEqual(true);
});

it('should display weather image', () => {
  const wrapper = shallow(<CurrentWeatherTemperature weatherDetails={data} unit={Units.Metric} />);
  const test = <img src='https://openweathermap.org/img/wn/04d@2x.png' alt='broken clouds'></img>;

  expect(wrapper.contains(test)).toEqual(true);
});