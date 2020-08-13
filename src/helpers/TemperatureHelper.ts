import { Units } from '../models/Units';

const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

const kelvinToFahrenheit = (kelvin: number): number => {
  return kelvinToCelsius(kelvin) * 9 / 5 + 32;
};

export const getTemperature = (kelvin: number, unit: Units) => {
  const temp = unit === Units.Metric ? kelvinToCelsius(kelvin) : kelvinToFahrenheit(kelvin);
  return Math.round(temp);
};

export const getTemperatureSymbol = (unit: Units): string => {
  return unit === Units.Metric ? '\xB0C' : '\xB0F';
};
