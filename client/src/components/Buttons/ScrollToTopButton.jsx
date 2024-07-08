import './ScrollToTopButton.scss';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

// after how many pixels of vertical scrolling the button should appear
const SCROLL_LIMIT = 500;

/**
 * Round button that scrolls to top of screen,
 * appears in fixed position on bottom right of screen after 500px have been scrolled
 *
 * @returns {JSX.Element} round arrow up button
 * @constructor
 */
const ScrollToTopButton = () => {

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  /** hide button based on how far the page is scrolled (below SCROLL_LIMIT) */
  addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < SCROLL_LIMIT) {
      if (isVisible) setIsVisible(false);
    } else {
      if (!isVisible) setIsVisible(true);
    }
  });

  let cssClass = 'arrow-icon';
  if (!isVisible) cssClass += ' hidden';

  return (
    <button type="button" aria-label="Scroll to top" className={cssClass} onClick={handleClick}>
      <FontAwesomeIcon icon={faCircleArrowUp} />
    </button>
  );
}

export default ScrollToTopButton;
