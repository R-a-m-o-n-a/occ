import { arrayOf, number, shape, string } from 'prop-types';

/**
 * Custom propType for city object
 */
export const cityType = shape({
  name: string.isRequired,
  name_native: string.isRequired,
  country: string.isRequired,
  continent: string.isRequired,
  latitude: number.isRequired,
  longitude: number.isRequired,
  population: number.isRequired,
  founded: number.isRequired,
  landmarks: arrayOf(string),
});
