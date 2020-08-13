import { getTemperature, getTemperatureSymbol } from './TemperatureHelper';
import { Units } from '../models/Units';

describe('TemperatureHelper', () => {
  test('should convert kelvin to celsius', () => {
    const result = getTemperature(279, Units.Metric);
    expect(result).toEqual(6);
  });

  test('should convert kelvin to fahrenheit', () => {
    const result = getTemperature(279, Units.Imperial);
    expect(result).toEqual(43);
  });

  test('should return symbol of the unit', () => {
    const resultC = getTemperatureSymbol(Units.Metric);
    const resultF = getTemperatureSymbol(Units.Imperial);

    expect(resultC).toEqual('\xB0C');
    expect(resultF).toEqual('\xB0F');
  });
});