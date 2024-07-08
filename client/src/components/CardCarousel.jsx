import { cityType } from "../custom-prop-types.js";
import { arrayOf } from "prop-types";
import CityCard from "./CityCard.jsx";
import './CardCarousel.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

/**
 * Carousel of CityCards, with arrows on both sides to scroll through the carousel
 *
 * @param {object} props cities: array of cityType
 * @returns {JSX.Element} the Carousel
 * @constructor
 */
const CardCarousel = (props) => {
  const { cities } = props;

  /**
   * Toggle opacity of carousel arrows by adding css class 'hidden' to the dom element
   *
   * @param {String}  elementId id of the dom element to be toggled
   * @param {boolean} show      show element if true, hide element if false
   */
  const toggleArrow = (elementId, show) => {
    const arrow = document.getElementById(elementId);
    if (show) {
      arrow.classList.remove('hidden');
    } else {
      arrow.classList.add('hidden');
    }
  }

  /**
   * Scrolls carousel 250px in the specified direction and shows/hides carousel control arrows if end is reached
   * if close to either end of the carousel, scrolls all the way to the end
   *
   * @param {number} dir direction of scrolling: 1 to the right, -1 to the left
   */
  const scrollCarousel = (dir) => {
    const carousel = document.getElementById('cardCarousel');

    let scrollAmount = 250;
    // if scrolling almost towards the end, add enough scroll to actually reach the end
    if ((dir === -1 && carousel.scrollLeft < 400) || // scrolling to the left
      (dir === 1 && carousel.offsetWidth + carousel.scrollLeft > carousel.scrollWidth - 400)) { // scrolling to the right
      scrollAmount += 200;
    }
    // set direction after adding more absolute scroll
    scrollAmount *= dir;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // hide arrows based on whether end of carousel is reached after scroll
    setTimeout(() => {
      toggleArrowsBasedOnScrollPosition(carousel);
    }, 500);
  }

  /**
   * hide arrow if the according end of the carousel is reached, show otherwise
   * @param {HTMLDivElement} carousel the card carousel element
   */
  function toggleArrowsBasedOnScrollPosition(carousel) {
    toggleArrow('cardCarouselRightArrow', carousel.offsetWidth + carousel.scrollLeft < carousel.scrollWidth - 10);
    toggleArrow('cardCarouselLeftArrow', carousel.scrollLeft > 10);
  }

  /** hide arrows if width of all children is smaller than the visible container (all children are on screen), show if children exceed container.
   * Also toggles justifyContent css property of carousel to have city cards centered if all are visible and aligned left in the carousel if cards exceed window size */
  function toggleArrowsBasedOnWindowSize() {
    const carousel = document.getElementById('cardCarousel');

    const gap = 32;
    // sum up width of all cards
    const widthOfAllChildren = Array.from(carousel.children).reduce((accumulator, childElement) => accumulator + childElement.offsetWidth + gap,
      -gap, // initial value, because one less gap than cards (only in between, not before or after)
    );

    // show arrows if children exceed visible part of carousel, hide otherwise
    const cardsWiderThanCarousel = widthOfAllChildren > carousel.offsetWidth;
    toggleArrow('cardCarouselRightArrow', cardsWiderThanCarousel);
    toggleArrow('cardCarouselLeftArrow', cardsWiderThanCarousel);

    // toggle justifyContent of carousel to align items centrally on big screens and make them align left to scroll properly on smaller screens
    carousel.style.justifyContent = cardsWiderThanCarousel ? 'flex-start' : 'center';

    // hide arrows if, for example, zooming in and carousel is at the start
    toggleArrowsBasedOnScrollPosition(carousel);
  }

  // when city array changes, and after initial render, control (and correct) carousel appearance
  useEffect(() => {
    toggleArrowsBasedOnWindowSize();
  }, [cities]);

  // listen to window resize event and toggle arrow visibility and carousel display accordingly
  addEventListener("resize", (event) => {
    toggleArrowsBasedOnWindowSize();
  });

  return (
    <div className="card-carousel-wrapper">

      <div className="card-carousel" data-testid="cardCarousel" id="cardCarousel">
        {cities.map((city, index) => <CityCard key={'city' + index} city={city} />)}
      </div>

      <div className="carousel-control left hidden" id="cardCarouselLeftArrow" onClick={() => {scrollCarousel(-1)}}>
        <button type="button" aria-label="left carousel control">
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
      </div>

      <div className="carousel-control right hidden" id="cardCarouselRightArrow" onClick={() => {scrollCarousel(1)}}>
        <button type="button" aria-label="right carousel control">
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>

    </div>
  );
}

CardCarousel.propTypes = {
  /** array of cities */
  cities: arrayOf(cityType).isRequired,
}

export default CardCarousel;
