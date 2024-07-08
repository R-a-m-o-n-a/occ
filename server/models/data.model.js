import Ajv from "ajv";

const ajv = new Ajv({ coerceTypes: true }); // coerceTypes true will parse strings to numbers for properties with type number

const citySchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    name_native: { type: "string" },
    country: { type: "string" },
    continent: { type: "string" },
    latitude: { type: "number" },
    longitude: { type: "number" },
    population: { type: "number" },
    founded: { type: "number" },
    landmarks: { type: "array", items: { type: "string" } },
  },
  required: ["name", "name_native", "country", "continent", "latitude", "longitude", "population", "founded", "landmarks"],
};

const cityJsonFileSchema = {
  type: "object",
  properties: {
    cities: { type: "array", items: citySchema },
  },
  required: ["cities"],
}

export const validateCityJSON = ajv.compile(cityJsonFileSchema);
