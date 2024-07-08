# Ottonova Coding Challenge Backend

## Description
A simple Node.js backend using the Express framework. It provides an API to retrieve city data from a JSON file.

## Table of Contents
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Usage

### Running the Server
To start the server, run:
```bash
npm start
```
The server will be available at **http://localhost:5000**.

## API Documentation

This API provides a single endpoint to retrieve an array of cities with the following information for each of the cities:
- name
- name in native language
- country
- continent
- latitude
- longitude
- population
- founded: *year of city foundation*
- landmarks: *a list of three popular sights in the city*


### Endpoints

#### GET /data/cities
- **Description**: Retrieve city data
- **URL**: `/data/cities`
- **Method**: `GET`
- **Responses**:
    - `200 OK`: Successful response with city data
    - `500 Internal Server Error`: An error occurred while fetching city data

## Dependencies

- **Express**: Node.js web framework
- **AJV**: for JSON schema validation
