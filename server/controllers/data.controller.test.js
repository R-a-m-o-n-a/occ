import { jest } from '@jest/globals';
import { getCityData } from './data.controller.js';
import { cityDataMatcher } from "../util/expectMatchers.js";

describe('getCityData function', () => {
  test('should get city data', async () => {

    const mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    await getCityData({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(cityDataMatcher);
  });

  /* I wanted to test an unsuccessful call by mocking a wrongly formatted JSON file but since the file is loaded before the function call, I am not sure how.
   * Instead, I created a mock file (to contain just the array) and changed the path in the real file before running this function and it threw the expected error.
   * /
  test('should throw internal server error', async () => {

    const mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    await getCityData({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'City data file does not contain the expected data.' });
  }); */
});
