import React from 'react';
import styled from 'styled-components';
import { WeatherForecastDetails } from '../models/WeatherForecastResponse';
import { Units } from '../models/Units';
import { getTemperature, getTemperatureSymbol } from '../helpers/TemperatureHelper';
import { getWindSpeed, getWindSpeedUnit } from '../helpers/WindHelper';

export interface OtherWeatherDetailsProps {
  weatherDetails: WeatherForecastDetails;
  unit: Units;
}

const OtherWeatherDetailsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 720px) {
    display: block;
  }
`;

const DetailsDiv = styled.div`
  @media only screen and (max-width: 720px) {
    width: 50%;
    float: left;
  }
`;

export function OtherWeatherDetails({ weatherDetails, unit }: OtherWeatherDetailsProps) {
  const { feels_like, humidity, wind_speed, uvi } = weatherDetails;
  const temperatureSymbol = getTemperatureSymbol(unit);

  return <OtherWeatherDetailsDiv>
    <DetailsDiv>Feels like: <span>{getTemperature(feels_like as number, unit)} {temperatureSymbol}</span></DetailsDiv>
    <DetailsDiv>Humidity: <span>{humidity}%</span></DetailsDiv>
    <DetailsDiv>Wind: <span>{getWindSpeed(wind_speed, unit)} {getWindSpeedUnit(unit)}</span></DetailsDiv>
    <DetailsDiv>UV Index: <span>{Math.round(uvi)}</span></DetailsDiv>
  </OtherWeatherDetailsDiv>;
}
