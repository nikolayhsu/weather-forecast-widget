import React from 'react';
import styled from 'styled-components';
import { WeatherForecastDetails, TemperatureSummary } from '../models/WeatherForecastResponse';
import moment from 'moment';
import { getWeatherImageUrl } from '../helpers/ImageHelper';
import { Units } from '../models/Units';
import { getTemperature } from '../helpers/TemperatureHelper';

export interface DailyWeatherWidgetProps {
  weatherDetails: WeatherForecastDetails;
  unit: Units;
}

const getDayOfWeek = (timestamp: number): string => {
  const today = moment();
  const target = moment(timestamp, 'X');

  if (today.isSame(target, 'date')) {
    return 'Today';
  }

  return target.format('dddd');
};

const DailyWeatherWidgetDiv = styled.div`
  background-color: lightskyblue;
  max-width: 100px;
  text-align: center;
  padding: 15px 0;
  clear: both;

  @media only screen and (max-width: 720px) {
    display: flex;
    max-width: unset;
    justify-content: space-between;
    align-items: center;
  }
`;

const TemperatureInfoDiv = styled.div`
  font-weight: bold;
`;

const MinTemperatureSpan = styled.span`
  color: #777;
`;

const WeatherImage = styled.img`
  @media only screen and (max-width: 720px) {
    width: 50px;
    height: 50px;
  }
`;

const DayOfWeekDiv = styled.div`
  width: 80px;
  text-align: left;
`;

export function DailyWeatherWidget({ weatherDetails, unit }: DailyWeatherWidgetProps) {
  const { max, min } = weatherDetails.temp as TemperatureSummary;

  const imageUrl = getWeatherImageUrl(weatherDetails);
  const dayOfWeek = getDayOfWeek(weatherDetails.dt);
  const tempMax = getTemperature(max, unit);
  const tempMin = getTemperature(min, unit);

  return (
    <DailyWeatherWidgetDiv>
      <DayOfWeekDiv>{dayOfWeek}</DayOfWeekDiv>
      <WeatherImage src={imageUrl} alt={weatherDetails.weather[0].description}></WeatherImage>
      <TemperatureInfoDiv>
        {tempMax}&nbsp;&nbsp;<MinTemperatureSpan>{tempMin}</MinTemperatureSpan>
      </TemperatureInfoDiv>
    </DailyWeatherWidgetDiv>
  );
}
