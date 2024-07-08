export const cityDataMatcher = expect.arrayContaining([
  expect.objectContaining({
    name: expect.any(String),
    name_native: expect.any(String),
    country: expect.any(String),
    continent: expect.any(String),
    latitude: expect.any(Number),
    longitude: expect.any(Number),
    population: expect.any(Number),
    founded: expect.any(Number),
    landmarks: expect.any(Array),
  })
]);
