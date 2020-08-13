import { Units } from '../models/Units';
import { getWindSpeed, getWindSpeedUnit } from './WindHelper';

describe('WindHelper', () => {
  test('should m/s to km/h', () => {
    const result = getWindSpeed(26, Units.Metric);
    expect(result).toEqual(94);
  });

  test('should convert kelvin to fahrenheit', () => {
    const result = getWindSpeed(26, Units.Imperial);
    expect(result).toEqual(58);
  });

  test('should return symbol of the unit', () => {
    const resultC = getWindSpeedUnit(Units.Metric);
    const resultF = getWindSpeedUnit(Units.Imperial);

    expect(resultC).toEqual('km/h');
    expect(resultF).toEqual('mph');
  });
});