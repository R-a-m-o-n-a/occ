import React, { useEffect, useRef, useState } from 'react';
import './Quiz.scss';
import { arrayOf, func } from "prop-types";
import { cityType } from "../custom-prop-types.js";
import Button from "../components/Buttons/Button.jsx";
import { faArrowRotateRight, faCaretRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { length } from '@turf/length';
import ResultsTable from "../components/ResultsTable.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";

/**
 * Quiz Mock for testing. Has mapbox-gl module removed.
 *
 * @param {object} props cities: array of cityType, goBack: function to close this component
 * @returns {JSX.Element} the quiz component
 * @constructor
 */
function Quiz(props) {

  const { cities: unshuffledCities, goBack } = props;

  const [cities, setCities] = useState(unshuffledCities);
  const [questionNo, setQuestionNo] = useState(0); // current round
  const [showAnswer, setShowAnswer] = useState(false); // for showing answer/result of current guess, displaying next button
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [userClickCoordinates, setUserClickCoordinates] = useState(); // last coordinated where the user clicked
  const [distances, setDistances] = useState([]); // array for the results of the user (how far away they clicked for each city)

  const quizMapContainer = useRef(null);

  // shuffle array once at the start
  useEffect(() => {
    setCities(shuffleArray(unshuffledCities));
  }, [unshuffledCities]);

  // initialize map on initial render
  useEffect(() => {
    if (!isQuizFinished) {

      // set click listener on map to trigger guess
      document.getElementById('quizMapContainer').addEventListener('click', () => {
        setUserClickCoordinates({ lat: 10, lng: 10 });
      });
    }
  }, [isQuizFinished]); // re-initialize map when user wants to play again

  /** shuffle array algorithm
   * source: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    // return new Array for state update
    return new Array(...array);
  }

  /** add new distance (guess result) to array */
  const addDistance = (d) => {
    const newDistance = parseFloat(d);
    setDistances(arr => [...arr, newDistance]);
  }

  // observe click coordinates change and handle what happens on map click
  useEffect(() => {
    if (userClickCoordinates) handleMapClick(userClickCoordinates);
  }, [userClickCoordinates]);

  /**
   * set markers on user click position and city position, draw a line in between, calculate distance, display it and add it to the distances array
   * @param clickCoords {{lat: number, lng: number}} coordinates where user clicked
   */
  function handleMapClick(clickCoords) {
    const currentCity = cities[questionNo];

    // create custom marker to display dot with css
    const el = document.createElement('div');
    el.className = 'user-marker';

    // create line between the markers
    const lineString = {
      'type': 'LineString',
      'coordinates': [
        [currentCity.longitude, currentCity.latitude],
        [clickCoords.lng, clickCoords.lat]
      ]
    };

    // calculate distance between the two markers
    const distance = length(lineString).toFixed(2);

    // add distance to distances array
    addDistance(distance);

    // display distance and "Next"-Button to the user
    setShowAnswer(true);
  }

  /** remove old markers and line from the map, hide result and "Next"-Button
   * check if rounds are finished and setIsQuizFinished, increment round */
  const nextQuestion = () => {
    setQuestionNo((prev) => {
      setShowAnswer(false);

      if (prev + 1 >= cities.length) {
        setIsQuizFinished(true);
        return 0;
      }

      return prev + 1;
    });
  }

  /** reset everything to start a new game */
  function restart() {
    setQuestionNo(0);
    setCities(shuffleArray(cities));
    setIsQuizFinished(false);
    setShowAnswer(false);
    window.scrollTo({ top: 0 });
  }

  const currentCity = cities[questionNo];

  return (
    <>
      <div className="header">
        {goBack ? (
          <button type="button" aria-label="go back" className="go-back" onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Back</span>
          </button>) : ''}
        <h1>City Quiz</h1>
      </div>

      {isQuizFinished ? (
        <>
          <h3>Your Results</h3>
          <div className="results-wrapper">
            <ResultsTable cityNames={cities.map(c => c.name)} distances={distances} />
            <Button secondary label="Try again" icon={faArrowRotateRight} onClick={restart} />
            <div className="info">Please note: If you want to try again and see if you can do better, you should write your average down somewhere because we don't save it.</div>

          </div>
        </>
      ) : (
        <>
          <div>
            <div className="quiz-question">
              <span className="question-no">{questionNo === 0 ? 'Ready?' : `Question ${questionNo + 1}/${cities.length}:`}</span>
              <span className="question">Where is <strong>{currentCity.name}</strong>?</span>
            </div>
          </div>

          <div className="map-wrapper">
            <div ref={quizMapContainer} id="quizMapContainer" />
            {showAnswer ? <div className="distance-box"><span>Distance </span><br />{distances[questionNo]} km</div> : ''}
            {showAnswer ? <Button secondary label={questionNo + 1 === cities.length ? 'Results' : 'Next'} icon={faCaretRight} iconRight onClick={nextQuestion} /> : ''}
          </div>

          {questionNo === 0 ? <div className="info">Click on the map to answer.</div> : ''}
        </>)}
    </>
  );
}

Quiz.propTypes = {
  /** array of cities */
  cities: arrayOf(cityType).isRequired,
  /** function to navigate back */
  goBack: func,
}

export default Quiz;
