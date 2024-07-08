import './Home.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardCarousel from "./CardCarousel.jsx";
import Button from "./Buttons/Button.jsx";
import Table from "./Table.jsx";
import ScrollToTopButton from "./Buttons/ScrollToTopButton.jsx";
import Map from "./Map.jsx";
import { faFileArrowDown, faMapLocationDot, faTableList } from "@fortawesome/free-solid-svg-icons";
import { SERVER_URL } from "../util/env-vars.js";
import Loading from "./Loading.jsx";
import Quiz from "./Quiz.jsx";
import ErrorPage from "./ErrorPage.jsx";

/**
 * Main page of the application.
 * Renders different pages.
 * Home page consists of three sections that show the data in different ways. They can be scrolled through normally or scrolled to by the use of buttons:
 * Welcome section, carousel with city cards, and buttons on top, then map, then table.
 * The other page shows a quiz. This component handles also the SPA "routing".
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {

  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  // fetch city data from server
  useEffect(() => {
    axios.get(SERVER_URL + 'data/cities/')
         .then(res => {
           const cityData = res.data;
           setCities(cityData);
         }).catch(err => {
      if (err.code === 'ERR_NETWORK') {
        setError(<><h3>Could not connect to the server.</h3><h3>Are you sure it is turned on?</h3></>);
      } else {
        setError(<h3>There was a problem while fetching the city data.</h3>);
      }
      console.log(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  /**
   * Scrolls specified HTML element into view
   * @param {String} pageName id of the page that should be scrolled into view
   */
  const scrollPageIntoView = (pageName) => {
    const page = document.getElementById(pageName);
    page.scrollIntoView({ behavior: 'smooth' });
  }

  const showTable = () => {
    scrollPageIntoView('tablePage');
  };

  const showMap = () => {
    scrollPageIntoView('mapPage');
  };

  /** switch page and scroll to top */
  const openQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0 });
  };
  const closeQuiz = () => {
    setShowQuiz(false);
    window.scrollTo({ top: 0 });
  };

  const exportData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ cities }, null, 2)); // indent lines by 2 spaces

  // Show ErrorPage if there is an Error
  if (error) {
    return <ErrorPage error={error} />
  }

  // Show Quiz Page if data is loaded and quiz page is opened
  if (!isLoading && showQuiz) {
    return (
      <div className="home">
        <div className="page">
          <Quiz cities={cities} goBack={closeQuiz} />
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="page">
        <div className="welcome-header">
          <h1>Hi!</h1>
          <h3>If you're here, you're probably looking for <br />some information about the following cities:</h3>
        </div>

        {isLoading ? <Loading /> :
          <>
            <CardCarousel cities={cities} />

            <div>
              <p className="info">Click on a city to show more details.</p>

              <h3>Alternatively, display the data of all cities in the way you prefer:</h3>

              <div className="button-group">
                <Button primary icon={faMapLocationDot} label="Show on Map" onClick={showMap} />
                <Button primary icon={faTableList} label="Show as Table" onClick={showTable} />
                <div className="separator-text">– or –</div>
                <a href={exportData} download="cities.json"><Button secondary icon={faFileArrowDown} label="Download JSON" /></a>
              </div>
            </div>
          </>}
      </div>

      {isLoading ? '' : (
        <>
          <div className="page" id="mapPage">
            <h1>Cities on a Map</h1>
            <Map cities={cities} />
          </div>
          <div className="page" id="tablePage">
            <h1>Cities in a Table</h1>
            <Table cities={cities} />
            <div className="go-to-quiz">
              <h4>Ready to test your knowledge?</h4>
              <Button primary label="Take the Quiz" onClick={openQuiz} />
            </div>
          </div>
        </>
      )}

      <ScrollToTopButton />
    </div>
  );
}

export default Home;
