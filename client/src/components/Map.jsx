import React, { useEffect, useRef } from 'react';
import ReactDOMServer from "react-dom/server";
import './Map.scss';
import { arrayOf } from "prop-types";
import { cityType } from "../custom-prop-types.js";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN } from "../util/env-vars.js";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

/**
 * Map with markers for each city, click on marker opens popup that displays name and coordinates of the city
 *
 * @param {object} props cities: array of cityType
 * @returns {JSX.Element} the map
 * @constructor
 */
function Map(props) {

  const { cities } = props;

  const mapContainer = useRef(null);
  const map = useRef(null); // storing the map in ref will prevent the map from reloading on user interaction, see https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/#set-the-apps-default-state

  // initialize map on initial render
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [10.181667, 40.806389], // random initial center, chosen to display several markers
      zoom: 3,
      attributionControl: false, // remove default attribution in bottom right (overlap with scrollToTopButton)
    });
    // add the attribution in the top right corner instead
    map.current.addControl(new mapboxgl.AttributionControl(), 'top-right');
  }, []); /* added empty dependency array (different from mapboxgl documentation to not re-render map unnecessarily
                 * for info on no dependency array vs. empty dependency array see https://react.dev/reference/react/useEffect#examples-dependencies
                 * mapbox documentation here: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/#set-the-apps-default-state */

  /** after map initialization, for each city add a marker and a popup wih additional information to the map */
  useEffect(() => {
    if (map.current) {

      cities.forEach(city => {
        const popupContent = (
          <div>
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
        );

        const popup = new mapboxgl.Popup().setHTML(ReactDOMServer.renderToString(popupContent));

        new mapboxgl.Marker({ scale: 1.3 }).setLngLat([city.longitude, city.latitude])
                                           .setPopup(popup)
                                           .addTo(map.current);
      })
    }
  }, [map.current]);

  return (
    <div ref={mapContainer} id="mapContainer" />
  )
}

Map.propTypes = {
  /** array of cities */
  cities: arrayOf(cityType).isRequired,
}

export default Map;
