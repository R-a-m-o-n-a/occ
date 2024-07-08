/**
 * @module controllers/data
 * @description This module handles logic of data routes.
 */
import { validateCityJSON } from "../models/data.model.js";

/* importing JSON files with import statement is still considered experimental (up until the currently latest node version 22.3.0).
 * so instead of using import cityDataFile from '../data/cities.json' assert { type: 'json' };
 * for a production environment it might be safer to rely on using the fs module */
import { readFile } from 'fs/promises';

let parsedCityData = await parseCityData();

async function parseCityData() {
  let cityData = JSON.parse(await readFile('data/cities.json', "utf8"));

  const isValid = validateCityJSON(cityData);
  console.log('Is cities.json file valid?', isValid);
  if (!isValid) console.log(validateCityJSON.errors);
  return { isValid, cities: cityData.cities };
}

/**
 * Retrieve list of city data
 * @function getCityData
 * @summary delivers city data
 * @description This function retrieves city data from a JSON file and sends an array of cities with some information in the response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {void}
 * @response 200 - Successful response with city data
 * @response 500 - Internal server error
 */
export const getCityData = async (req, res) => {
  try {
    // if data read from JSON file does not contain an array called "cities", throw error
    const cities = parsedCityData.cities;
    if (!cities || !Array.isArray(cities) || !parsedCityData.isValid) {
      console.log('City data wrongly formatted:', parsedCityData);
      throw new Error('City data file does not contain the expected data.');
    }
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
