import './CityCard.scss';
import { cityType } from "../custom-prop-types.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAfrica, faEarthAmericas, faEarthAsia, faEarthEurope, faEarthOceania, faFlag, faLocationDot, faMapPin, faUsers } from "@fortawesome/free-solid-svg-icons";

/**
 * Flippable card, front side shows name of city and an icon, back side shows infos about city
 * @param {object} props city: a single city of cityType
 * @returns {JSX.Element} the card
 * @constructor
 */
const CityCard = (props) => {
  const { city } = props;

  const closeAllOpenCards = () => {
    const flippedCards = document.getElementsByClassName('card-flipped');
    Array.from(flippedCards).forEach((flippedCard) => {flippedCard.classList.remove('card-flipped');})
  }

  const toggleCard = (event) => {
    const card = event.target.closest('.card');

    // first, close open cards and resolve animations if card is opening
    if (!card.classList.contains('card-flipped')) {
      closeAllOpenCards();

      // if it is the first card, scroll completely to the left to see whole card
      if (!card.previousElementSibling) {
        const carousel = document.getElementById('cardCarousel');
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        // hide arrow after scrolling all the way to the left
        document.getElementById('cardCarouselLeftArrow').classList.add('hidden');
      }

      // if it is the last card, scroll completely to the right to see whole card
      if (!card.nextElementSibling) {
        /* the timeout is necessary because flipping the card increases its size and thus the size of the parent container.
         * To scroll completely to the right, the scrolling has to wait until the flip is completed (animation speed is set to 0.6s)
         */
        setTimeout(() => {
          const carousel = document.getElementById('cardCarousel');
          carousel.scrollBy({ left: 300, behavior: 'smooth' }); // scroll amount should not be less than flipped card width
          // hide arrow after scrolling all the way to the right
          document.getElementById('cardCarouselRightArrow').classList.add('hidden');
        }, 600);
      }
    }

    // then, toggle card flip
    card.classList.toggle('card-flipped');
  }

  // give each continent the corresponding icon
  const continentIcons = {
    'Africa': faEarthAfrica,
    'Asia': faEarthAsia,
    'Australia': faEarthOceania,
    'Europe': faEarthEurope,
    'North America': faEarthAmericas,
    'South America': faEarthAmericas,
  }

  // pair each info with the according icon and format the info if necessary
  const info = [{
    text: city.country,
    icon: faFlag
  }, {
    text: city.continent,
    icon: continentIcons[city.continent]
  }, {
    text: city.founded,
    icon: faMapPin
  }, {
    text: city.population.toLocaleString(),
    icon: faUsers
  }, {
    text: <ul>{city.landmarks.map((l, index) => <li key={city.name + '-landmark' + index}>{l}</li>)}</ul>,
    icon: faLocationDot
  }];

  return (
    <>
      <div className="card" data-testid="cityCard" onClick={toggleCard}>
        <div className="card-inner">

          <div className="card-front">
            <img src="/city_icon_plain_bw.png" height={40} alt="city icon" aria-label="city icon" />
            <h3>{city.name}</h3>
            {/* show native name only if not identical with English name */}
            {(city.name_native !== city.name) ? <span className="native-city-nme">{city.name_native}</span> : ''}
          </div>

          <div className="card-back">
            <div className="card-back-content">
              <h4>{city.name}</h4>
              {/*display city info in table*/}
              <table>
                <tbody>
                {info.map((cat, index) => (
                  <tr key={city.name + '-info' + index}>
                    <td><FontAwesomeIcon icon={cat.icon} /></td>
                    <td>{cat.text}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CityCard.propTypes = {
  city: cityType.isRequired,
}

export default CityCard;
