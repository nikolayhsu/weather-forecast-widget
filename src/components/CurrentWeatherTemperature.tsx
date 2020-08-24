import React from 'react';
import styled from 'styled-components';
import { getWeatherImageUrl } from '../helpers/ImageHelper';
import { WeatherForecastDetails } from '../models/WeatherForecastResponse';
import { Units } from '../models/Units';
import { getTemperature, getTemperatureSymbol } from '../helpers/TemperatureHelper';

export interface CurrentWeatherTemperatureProps {
  weatherDetails: WeatherForecastDetails;
  unit: Units;
}

const CurrentWeatherTemperatureDiv = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 720px) {
    justify-content: flex-start;
  }
`;

const TemperatureDiv = styled.div`
  line-height: 100px;
  font-size: 42px;
`;

const DegreeSymbolSpan = styled.span`
  font-size: 24px;
`;

export function CurrentWeatherTemperature({ weatherDetails, unit }: CurrentWeatherTemperatureProps): JSX.Element {
  const imageUrl = getWeatherImageUrl(weatherDetails);
  const temp = weatherDetails.temp as number;
  const temperature = getTemperature(temp, unit);
  const temperatureSymbol = getTemperatureSymbol(unit);

  return <CurrentWeatherTemperatureDiv>
    <img src={imageUrl} alt={weatherDetails.weather[0].description}></img>
    <TemperatureDiv>{temperature} <DegreeSymbolSpan>{temperatureSymbol}</DegreeSymbolSpan></TemperatureDiv>
  </CurrentWeatherTemperatureDiv>;
}
