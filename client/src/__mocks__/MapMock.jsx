import React from 'react';
import './Map.scss';
import { arrayOf } from "prop-types";
import { cityType } from "../custom-prop-types.js";
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * Map Mock for testing: does not contain Mapbox GL map, only popups and their content
 *
 * @param {object} props cities: array of cityType
 * @returns {JSX.Element} the map
 * @constructor
 */
function Map(props) {

  const { cities } = props;

  const popups = cities.map(city => (
    <div key={city.name+'-popup'}>
      <h2>{city.name}</h2>
      <table>
        <tbody>
        <tr>
          <td>Latitude:</td>
          <td>{city.latitude}</td>
        </tr>
        <tr>
          <td>Longitude:</td>
          <td>{city.longitude}</td>
        </tr>
        </tbody>
      </table>
    </div>
  ));

  return (
    <div id="mapContainer">
      {popups}
    </div>
  )
}

Map.propTypes = {
  /** array of cities */
  cities: arrayOf(cityType).isRequired,
}

export default Map;
