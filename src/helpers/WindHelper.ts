import { Units } from '../models/Units';

const getKmPerHour = (value: number): number => {
  return Math.round(value * 3.6);
};

const getMilesPerHour = (value: number): number => {
  return Math.round(value * 2.23694);
};

export const getWindSpeed = (value: number, unit: Units): number => {
  return unit === Units.Metric ? getKmPerHour(value) : getMilesPerHour(value);
};

export const getWindSpeedUnit = (unit: Units): string => {
  return unit === Units.Metric ? 'km/h' : 'mph';
};
